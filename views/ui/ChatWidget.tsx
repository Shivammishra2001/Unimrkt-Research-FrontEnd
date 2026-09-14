'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SendArrowIcon } from './icons/SendArrowIcon';

interface ChatMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
}

const QUICK_ACTIONS = [
  {
    id: 'quote',
    label: 'Request a Quote',
    reply: "Happy to help — could you share a bit about the market or industry you'd like research on? Type it below and our team will follow up with a tailored quote.",
  },
  {
    id: 'analyst',
    label: 'Speak with an Analyst',
    reply: 'Sure thing! Leave your question below and one of our research analysts will reach out to you directly.',
  },
  {
    id: 'general',
    label: 'General Enquiry',
    reply: "Of course — go ahead and type your question below, and we'll get back to you shortly.",
  },
] as const;

const GREETING_TEXT = "👋 Hi there! I'm the Unimrkt Research assistant. How can we help with your market research needs today?";
const ACK_TEXT = "Thanks — we've received your message and a research consultant will be in touch shortly.";
const PANEL_ID = 'chat-widget-panel';

/**
 * Self-contained floating chat widget. No third-party chat tool
 * (HubSpot/Tidio/Intercom/WhatsApp, etc.) or backend chat/lead endpoint
 * is configured anywhere in this codebase (checked .env/.env.local/
 * .env.example and package.json — none found), so this follows the same
 * "presentational, honest about no backend" convention already
 * established by EnquiryForm.tsx/QuickEnquiryCard.tsx: every reply here
 * is a scripted client-side acknowledgment, not a live agent or a
 * network call. Swap `handleSend`/`handleQuickAction`'s bot replies for
 * a real endpoint once one exists (Strapi email plugin, a `lead`/
 * `enquiry` content type, or an actual chat backend).
 *
 * The floating trigger button is the exact `aria-label="Open chat"` /
 * `bg-brand-600` circular button this site always had (previously
 * decorative, in FloatingChatButton.tsx) — now wired up as the panel's
 * own open/close toggle, its icon swapping between the chat bubble and
 * an X to reflect state.
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'greeting', from: 'bot', text: GREETING_TEXT }]);
  const [input, setInput] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);

  // Esc closes, same as MobileNav's drawer convention but keyboard-driven
  // instead of a backdrop click (this widget has no backdrop).
  useEffect(() => {
    if (!isOpen) return undefined;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Outside click closes — the trigger button is excluded so its own
  // onClick toggle (not this listener) is what governs re-clicking it.
  useEffect(() => {
    if (!isOpen) return undefined;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setIsOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isOpen]);

  // Autoscroll to the newest message.
  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  function pushMessage(msg: Omit<ChatMessage, 'id'>) {
    nextIdRef.current += 1;
    setMessages((prev) => [...prev, { ...msg, id: `msg-${nextIdRef.current}` }]);
  }

  function handleQuickAction(action: (typeof QUICK_ACTIONS)[number]) {
    setShowQuickActions(false);
    pushMessage({ from: 'user', text: action.label });
    window.setTimeout(() => pushMessage({ from: 'bot', text: action.reply }), 400);
  }

  function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setShowQuickActions(false);
    pushMessage({ from: 'user', text: trimmed });
    setInput('');
    window.setTimeout(() => pushMessage({ from: 'bot', text: ACK_TEXT }), 500);
  }

  return (
    <>
      {/* Panel — kept mounted (not conditionally rendered) so the
          open/close transition can play, same "mounted but
          transformed" technique as MobileNav's drawer; translated
          off-screen, transparent, and non-interactive while closed. */}
      <div
        ref={panelRef}
        id={PANEL_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Unimrkt Research"
        aria-hidden={!isOpen}
        className={`fixed bottom-24 right-6 z-40 flex max-h-[min(32rem,70vh)] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-card-border bg-white shadow-2xl transition-all duration-300 ease-out sm:w-96 ${
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 bg-gradient-to-r from-gradient-from to-gradient-to px-5 py-4 text-white">
          <div>
            <p className="font-sans text-base font-semibold">Chat with Unimrkt</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-sans text-xs text-white/80">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Online
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#fbfbfb] px-4 py-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <p
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 font-sans text-sm leading-relaxed ${
                  m.from === 'user'
                    ? 'rounded-br-sm bg-brand-600 text-white'
                    : 'rounded-bl-sm border border-[#e4e2e2] bg-white text-[#464646]'
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}

          {showQuickActions && (
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleQuickAction(action)}
                  className="rounded-full border border-brand-600 px-3 py-1.5 font-sans text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex shrink-0 items-center gap-2 border-t border-card-border bg-white p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            aria-label="Type your message"
            className="h-11 flex-1 rounded-full border border-[#e4e2e2] bg-[#fbfbfb] px-4 font-sans text-sm text-[#464646] placeholder:text-[#868484] focus:outline-none focus:ring-2 focus:ring-brand-600"
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

      {/* Trigger — unchanged position/size/shape from the original
          decorative button; now toggles the panel and swaps its icon. */}
      <button
        ref={triggerRef}
        type="button"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? <CloseIcon className="size-6" aria-hidden="true" /> : <ChatIcon className="size-6" aria-hidden="true" />}
      </button>
    </>
  );
}
