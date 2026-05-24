export default function ReviewsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-36 bg-surface-200 rounded-lg" />
          <div className="h-4 w-24 bg-surface-100 rounded" />
        </div>
        <div className="h-9 w-28 bg-surface-200 rounded-xl" />
      </div>

      {[...Array(3)].map((_, i) => (
        <div key={i} className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-40 bg-surface-200 rounded" />
                <div className="h-3 w-24 bg-surface-100 rounded" />
              </div>
            </div>
            <div className="h-8 w-20 bg-surface-100 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="h-8 bg-surface-100 rounded-lg" />
            ))}
          </div>
          <div className="h-9 bg-surface-100 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
