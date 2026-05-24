"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center text-center px-6">
      <div>
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-display font-bold text-white mb-3">
          Something went wrong
        </h2>
        <p className="text-surface-400 mb-8 text-sm max-w-sm mx-auto">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="inline-flex px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
