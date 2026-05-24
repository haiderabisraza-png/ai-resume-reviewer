export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-5 space-y-3">
            <div className="w-8 h-8 bg-surface-200 rounded-lg" />
            <div className="h-7 w-16 bg-surface-200 rounded-lg" />
            <div className="h-3 w-24 bg-surface-100 rounded" />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart skeleton */}
        <div className="lg:col-span-2 card p-6">
          <div className="h-5 w-32 bg-surface-200 rounded mb-6" />
          <div className="h-48 bg-surface-100 rounded-xl" />
        </div>
        {/* Quick actions skeleton */}
        <div className="card p-6">
          <div className="h-5 w-28 bg-surface-200 rounded mb-4" />
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-16 bg-surface-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Recent resumes skeleton */}
      <div className="card p-6">
        <div className="h-5 w-36 bg-surface-200 rounded mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-surface-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
