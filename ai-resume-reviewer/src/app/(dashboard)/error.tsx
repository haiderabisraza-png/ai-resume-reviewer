"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <h2 className="text-lg font-semibold text-surface-900 mb-2">
        Failed to load
      </h2>
      <p className="text-surface-500 text-sm mb-6 max-w-sm">
        {error.message || "Something went wrong. Please try again."}
      </p>
      <button
        onClick={reset}
        className="btn-primary text-sm"
      >
        Try Again
      </button>
    </div>
  );
}
