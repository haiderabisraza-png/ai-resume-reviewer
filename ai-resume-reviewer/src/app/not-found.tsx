import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center text-center px-6">
      <div>
        <div className="text-8xl font-display font-bold text-surface-800 mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-white mb-3">Page not found</h1>
        <p className="text-surface-400 mb-8 text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
