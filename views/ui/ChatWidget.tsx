'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { CloseIcon } from './icons/CloseIcon';
import { SendArrowIcon } from './icons/SendArrowIcon';
import { ChatLeadForm, type ChatLead } from './chat/ChatLeadForm';
import { matchKeywordReply, resolveChatContent } from './chat/chatContent';
import type { ChatWidgetModel } from '@/models/domain';

interface Card {
  text: string;
  highlights?: string[];
  stats?: string[];
  link?: { label: string; href: string };
  /** Adds the "Request Proposal →" button that opens the callback form. */
  formButton?: boolean;
}

type MessageBody = { kind: 'user'; text: string } | { kind: 'bot'; card: Card } | { kind: 'form' } | { kind: 'summary'; lead: ChatLead };
type ChatMessage = { id: string; time: number | null } & MessageBody;

const PANEL_ID = 'chat-widget-panel';
/** Delay before a bot reply lands; the typing dots show meanwhile. */
const TYPING_MS = 700;

const formatTime = (t: number) => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(t);
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * Floating chat assistant. Not a live agent: answers come from Global → Chat Widget in Strapi (quick-action cards and
 * keyword replies, each falling back to the built-in copy in chat/chatContent.ts). The one network call is the inline
 * callback form, which posts to /contact-submit as a Contact Submission with source "Chat Widget".
 *
 * - Quick-action pills answer with a card (bullets, figure chips, a page link, a "Request Proposal →" button);
 *   a "lead form" pill opens the form straight away.
 * - Typed messages are matched against the keyword replies (first match wins); lead-intent words (quote, price, call…)
 *   open the form. No match → the acknowledgement plus a callback button.
 * - "Request a Callback" under the header opens the form at any time; only one unsent form exists at once.
 * - The panel stays mounted for its open/close transition and is `inert` while closed, so nothing inside is focusable.
 */
export function ChatWidget({ content }: { /** Global → Chat Widget (each empty field keeps the built-in copy). */ content?: ChatWidgetModel } = {}) {
  const copy = resolveChatContent(content);
  const initialMessages = useCallback(
    (time: number | null): ChatMessage[] => [{ id: 'greeting', time, kind: 'bot', card: { text: copy.greeting } }],
    [copy.greeting],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => initialMessages(null));
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);
  const timers = useRef<number[]>([]);
  const wasOpen = useRef(false);

  const activeFormId = messages.find((m) => m.kind === 'form')?.id ?? null;

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // Closed panel: inert (no focus, no screen-reader access). Open: focus the message box; closing returns focus to the
  // trigger. The greeting gets its timestamp on first open (never during SSR, which would mismatch on hydration).
  useEffect(() => {
    const panel = panelRef.current as (HTMLDivElement & { inert: boolean }) | null;
    if (panel) panel.inert = !isOpen;
    if (isOpen) {
      setMessages((prev) => (prev[0]?.id === 'greeting' && prev[0].time === null ? [{ ...prev[0], time: Date.now() }, ...prev.slice(1)] : prev));
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
    } else if (wasOpen.current) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    // Outside click closes; the trigger is excluded so its own toggle governs re-clicks.
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setIsOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen]);

  // Keep the newest bubble in view.
  useEffect(() => {
    const stream = streamRef.current;
    if (!isOpen || !stream) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stream.scrollTo({ top: stream.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, typing, isOpen]);

  function newId() {
    nextIdRef.current += 1;
    return `msg-${nextIdRef.current}`;
  }

  function push(...msgs: MessageBody[]) {
    const now = Date.now();
    setMessages((prev) => [...prev, ...msgs.map((m): ChatMessage => ({ id: newId(), time: now, ...m }))]);
  }

  /** Bot reply after the typing indicator; `withForm` then opens the callback form (unless one is already open). */
  function reply(card: Card, withForm = false) {
    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      push({ kind: 'bot', card });
      if (withForm) openForm(false);
    }, TYPING_MS);
    timers.current.push(t);
  }

  function openForm(fromButton = true) {
    setMessages((prev) => {
      const existing = prev.find((m) => m.kind === 'form');
      if (existing) {
        // One unsent form at a time: bring the open one back into view instead of adding another.
        window.setTimeout(() => document.getElementById(existing.id)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 30);
        return prev;
      }
      return [...prev, { id: newId(), time: Date.now(), kind: 'form' }];
    });
    if (fromButton) setIsOpen(true);
  }

  function handleQuickAction(action: (typeof copy.quickActions)[number]) {
    push({ kind: 'user', text: action.label });
    if (action.action === 'lead_form') {
      reply({ text: action.reply }, true);
      return;
    }
    reply({ text: action.reply, highlights: action.highlights, stats: action.stats, link: action.link, formButton: action.showFormButton });
  }

  function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    push({ kind: 'user', text });
    setInput('');
    const match = matchKeywordReply(text, copy.keywordReplies);
    if (match) reply({ text: match.reply, highlights: match.highlights, link: match.link, formButton: !match.opensForm }, match.opensForm);
    else reply({ text: copy.acknowledgement, formButton: true });
  }

  function handleSubmitted(formId: string, lead: ChatLead) {
    const first = lead.name.split(/\s+/)[0] || lead.name;
    const contact = `${lead.phone} / ${lead.email}`;
    setMessages((prev) => prev.map((m) => (m.id === formId ? { id: m.id, time: Date.now(), kind: 'summary', lead } : m)));
    reply({ text: copy.formSuccess.replace(/\{name\}/g, first).replace(/\{contact\}/g, contact) });
  }

  function restart() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setTyping(false);
    setInput('');
    setMessages(initialMessages(Date.now()));
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <div
        ref={panelRef}
        id={PANEL_ID}
        role="dialog"
        aria-modal="false"
        aria-label={copy.title}
        aria-hidden={!isOpen}
        className={`fixed bottom-24 right-3 z-40 flex max-h-[min(560px,calc(100dvh-120px))] w-[380px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-card-border bg-white shadow-2xl transition-all duration-300 ease-out motion-reduce:transition-none sm:right-6 ${
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        {/* Header: title + status, restart, close. */}
        <div className="flex shrink-0 items-center gap-1 bg-gradient-to-r from-gradient-from to-gradient-to py-2.5 pl-4 pr-1.5 text-white">
          <div className="min-w-0 flex-1">
            <p className="truncate font-sans text-[15px] font-semibold">{copy.title}</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-sans text-xs text-white/85">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
              {copy.status}
            </p>
          </div>
          <button
            type="button"
            onClick={restart}
            aria-label="Restart chat"
            title="Restart chat"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Sub-header: the callback form, one click away at all times. */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-card-border bg-[#fdf6f7] px-4 py-1.5">
          <p className="font-sans text-[12px] text-[#6b6969]">Prefer a call back?</p>
          <button
            type="button"
            onClick={() => openForm()}
            className="flex min-h-[36px] items-center gap-1.5 rounded-full border border-brand-600 bg-white px-3 font-sans text-[12px] font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
            {copy.formButtonLabel}
          </button>
        </div>

        {/* Message stream. */}
        <div ref={streamRef} role="log" aria-live="polite" aria-label="Chat messages" className="flex min-h-[180px] flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-[#fbfbfb] px-3.5 py-4">
          {messages.map((m) => (
            <div key={m.id} id={m.id} className={`flex flex-col ${m.kind === 'user' ? 'items-end' : 'items-start'}`}>
              {m.kind === 'user' && (
                <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-brand-600 px-3.5 py-2 font-sans text-[13px] leading-relaxed text-white">{m.text}</p>
              )}
              {m.kind === 'bot' && <BotCard card={m.card} proposalLabel={copy.proposalButtonLabel} onForm={() => openForm()} onNavigate={() => setIsOpen(false)} />}
              {m.kind === 'form' && (
                <ChatLeadForm intro={copy.formIntro} serviceOptions={copy.serviceOptions} autoFocus={isOpen && m.id === activeFormId} onSubmitted={(lead) => handleSubmitted(m.id, lead)} />
              )}
              {m.kind === 'summary' && <SummaryCard lead={m.lead} />}
              {m.time !== null && <span className="mt-1 px-1 font-sans text-[10px] text-[#9a9898]">{formatTime(m.time)}</span>}
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-sm border border-[#e4e2e2] bg-white px-3.5 py-3" aria-label="Assistant is typing" role="status">
              {[0, 150, 300].map((delay) => (
                <span key={delay} className="size-1.5 animate-bounce rounded-full bg-[#9a9898] motion-reduce:animate-none" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          )}
        </div>

        {/* Quick actions: always available as a scrollable row above the input. */}
        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-card-border bg-white px-3 pb-1 pt-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {copy.quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleQuickAction(action)}
              className="min-h-[36px] shrink-0 whitespace-nowrap rounded-full border border-brand-600/70 px-3 font-sans text-[12px] font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
            >
              {action.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex shrink-0 items-center gap-2 bg-white p-3 pt-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={copy.placeholder}
            aria-label="Type your message"
            maxLength={500}
            className="h-11 min-w-0 flex-1 rounded-full border border-[#e4e2e2] bg-[#fbfbfb] px-4 font-sans text-base text-[#464646] sm:text-[13px] placeholder:text-[#868484] focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            <SendArrowIcon className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Trigger — Figma 1794:16995: a 60px tab flush against the right edge, ~74% of the way down the first screen. */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open chat"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        onClick={() => setIsOpen(true)}
        // Hidden while the panel is open (it would sit on the pills / send button; the panel has its own close button).
        className={`fixed right-0 top-[74%] z-40 flex size-[60px] items-center justify-center rounded-l-[10px] bg-[#ba2c2a] text-white shadow-lg transition-transform hover:-translate-x-1 ${isOpen ? 'invisible' : ''}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma-home/chat-messages.svg" alt="" aria-hidden="true" className="size-6" />
      </button>
    </>
  );
}

function BotCard({ card, proposalLabel, onForm, onNavigate }: { card: Card; proposalLabel: string; onForm: () => void; onNavigate: () => void }) {
  const rich = Boolean(card.highlights?.length || card.stats?.length || card.link || card.formButton);
  return (
    <div className={`rounded-2xl rounded-bl-sm border border-[#e4e2e2] bg-white px-3.5 py-2.5 font-sans text-[13px] leading-relaxed text-[#464646] ${rich ? 'w-[92%]' : 'max-w-[88%]'}`}>
      <p className="whitespace-pre-wrap">{card.text}</p>
      {card.stats && card.stats.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Key figures">
          {card.stats.map((s) => (
            <li key={s} className="rounded-md bg-[#fdf0f2] px-2 py-1 text-[11px] font-semibold text-brand-600">
              {s}
            </li>
          ))}
        </ul>
      )}
      {card.highlights && card.highlights.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1.5">
          {card.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-[12.5px] leading-snug">
              <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      {(card.link || card.formButton) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#f0eeee] pt-2.5">
          {card.link &&
            (isExternal(card.link.href) ? (
              <a href={card.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center text-[12px] font-semibold text-brand-600 underline-offset-2 hover:underline">
                {card.link.label} ↗
              </a>
            ) : (
              <Link href={card.link.href} onClick={onNavigate} className="inline-flex min-h-[32px] items-center text-[12px] font-semibold text-brand-600 underline-offset-2 hover:underline">
                {card.link.label} ↗
              </Link>
            ))}
          {card.formButton && (
            <button
              type="button"
              onClick={onForm}
              className="ml-auto inline-flex min-h-[32px] items-center rounded-full bg-brand-600 px-3 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {proposalLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SummaryCard({ lead }: { lead: ChatLead }) {
  const rows: Array<[string, string]> = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Company', lead.company],
    ['Research area', lead.service],
    ['Brief', lead.message],
  ].filter((r): r is [string, string] => Boolean(r[1]));
  return (
    <div className="w-[92%] rounded-2xl rounded-bl-sm border border-emerald-200 bg-emerald-50/60 px-3.5 py-3 font-sans">
      <p className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.04em] text-emerald-700">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        Callback request sent
      </p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-[#6b6969]">{k}</dt>
            <dd className="break-words text-[#2b2b2b]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
