import { ChatIcon } from './icons/ChatIcon';

/** Persistent circular chat affordance, mounted once in app/layout.tsx —
 * site-wide widget, not part of any block. No backend chat integration is
 * specified anywhere in the blueprint, so this is a decorative affordance
 * rather than a wired-up widget. */
export function FloatingChatButton() {
  return (
    <button
      type="button"
      aria-label="Open chat"
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-105"
    >
      <ChatIcon className="size-6" aria-hidden="true" />
    </button>
  );
}
