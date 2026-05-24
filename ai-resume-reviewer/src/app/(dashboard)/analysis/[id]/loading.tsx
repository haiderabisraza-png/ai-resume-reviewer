export default function AnalysisLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse pb-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-surface-200 rounded" />
        <div className="h-8 w-64 bg-surface-200 rounded-lg" />
        <div className="h-4 w-40 bg-surface-100 rounded" />
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-5 text-center space-y-2">
            <div className="h-8 w-16 bg-surface-200 rounded-lg mx-auto" />
            <div className="h-3 w-24 bg-surface-100 rounded mx-auto" />
            <div className="h-1.5 bg-surface-100 rounded-full" />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card p-6 space-y-3">
        <div className="h-5 w-28 bg-surface-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-surface-100 rounded w-full" />
          <div className="h-4 bg-surface-100 rounded w-5/6" />
          <div className="h-4 bg-surface-100 rounded w-4/6" />
        </div>
      </div>

      {/* Two column */}
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="card p-6 space-y-3">
            <div className="h-5 w-28 bg-surface-200 rounded" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-10 bg-surface-100 rounded-lg" />
            ))}
          </div>
        ))}
      </div>

      {/* Improvements */}
      <div className="card p-6 space-y-3">
        <div className="h-5 w-44 bg-surface-200 rounded" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-surface-200 flex-shrink-0" />
            <div className="h-4 bg-surface-100 rounded flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
