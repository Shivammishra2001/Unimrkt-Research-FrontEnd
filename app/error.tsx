'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message =
    process.env.NODE_ENV === 'development' ? error.message : 'Please try again in a moment.';

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-heading">Something went wrong</h1>
      <p className="text-base opacity-80">{message}</p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center rounded-btn bg-gradient-to-r from-gradient-from to-gradient-to px-8 py-4 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
