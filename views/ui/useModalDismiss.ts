import { useEffect } from 'react';

/**
 * Shared Escape-key + body-scroll-lock behavior for every modal on the
 * site (work-with-us's JobDetailsModal/JobApplicationModal, our-team's
 * TeamProfileModal) — same convention already established by
 * views/gallery/GalleryView.tsx's GalleryLightbox (Escape via a
 * document keydown listener, scroll lock via `document.body.style.overflow`
 * restored on close). `isOpen` gates both effects so nothing runs while
 * the modal is closed. Promoted here from views/work-with-us/ once a
 * second feature needed the exact same behavior.
 */
export function useModalDismiss(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return undefined;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
}
