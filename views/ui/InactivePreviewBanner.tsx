/** Draft-mode only: this entry's "Page visibility" switch is OFF, so visitors get a 404 — the content team sees the page anyway. */
export function InactivePreviewBanner() {
  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-[100] bg-[#8b1527] px-4 py-2 text-center font-sans text-[13px] font-medium text-white shadow-[0_-4px_16px_rgba(0,0,0,0.25)]"
    >
      Preview — this page is set to <strong>Inactive</strong>. Visitors currently see a 404.
    </div>
  );
}
