import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-heading">Page not found</h1>
      <p className="text-base opacity-80">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="text-brand-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      >
        Back to home
      </Link>
    </div>
  );
}
