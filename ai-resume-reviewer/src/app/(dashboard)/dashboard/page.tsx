import Link from "next/link";
import { getDashboardStats } from "@/actions/resume.actions";
import { formatDate, getScoreColor, getScoreLabel } from "@/lib/utils";
import ScoreChart from "@/components/dashboard/ScoreChart";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  if (!stats) {
    return (
      <div className="text-center py-20 text-surface-500">
        Unable to load dashboard.
      </div>
    );
  }

  const { totalResumes, totalReviews, averageScore, averageAtsScore, recentResumes } = stats;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Resumes Uploaded", value: totalResumes, icon: "📄", color: "brand" },
          { label: "Total Reviews", value: totalReviews, icon: "📊", color: "accent" },
          { label: "Avg. Overall Score", value: `${averageScore}%`, icon: "⭐", color: "emerald" },
          { label: "Avg. ATS Score", value: `${averageAtsScore}%`, icon: "🎯", color: "blue" },
        ].map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-display font-bold text-surface-900 mb-0.5">
              {stat.value}
            </div>
            <div className="text-xs text-surface-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-surface-900">Score Overview</h2>
          </div>
          {recentResumes.length > 0 ? (
            <ScoreChart resumes={recentResumes} />
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-surface-400">
              <span className="text-4xl mb-3">📄</span>
              <p className="text-sm">No data yet — upload your first resume!</p>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/upload" className="flex items-center gap-3 p-3 rounded-xl bg-brand-50 hover:bg-brand-100 transition-colors group">
              <span className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white group-hover:bg-brand-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-semibold text-surface-900">Upload Resume</div>
                <div className="text-xs text-surface-500">Get instant AI feedback</div>
              </div>
            </Link>

            <Link href="/reviews" className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors group">
              <span className="w-9 h-9 rounded-lg bg-surface-200 flex items-center justify-center group-hover:bg-surface-300 transition-colors">
                <svg className="w-4 h-4 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-semibold text-surface-900">View All Reviews</div>
                <div className="text-xs text-surface-500">{totalReviews} reviews saved</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent resumes */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-surface-900">Recent Resumes</h2>
          <Link href="/reviews" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            View all →
          </Link>
        </div>

        {recentResumes.length === 0 ? (
          <div className="text-center py-12 text-surface-400">
            <span className="text-4xl mb-3 block">📭</span>
            <p className="text-sm mb-4">No resumes yet. Start by uploading one!</p>
            <Link href="/upload" className="btn-primary text-xs">
              Upload Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentResumes.map((resume) => {
              const latestReview = resume.reviews[0];
              return (
                <div key={resume.id} className="flex items-center justify-between p-4 rounded-xl border border-surface-100 hover:border-surface-200 hover:bg-surface-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">{resume.title}</p>
                      <p className="text-xs text-surface-400">{formatDate(resume.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {latestReview && (
                      <span className={`text-sm font-bold ${getScoreColor(latestReview.overallScore)}`}>
                        {latestReview.overallScore}%
                        <span className="text-xs font-normal text-surface-400 ml-1">
                          {getScoreLabel(latestReview.overallScore)}
                        </span>
                      </span>
                    )}
                    {latestReview && (
                      <Link
                        href={`/analysis/${latestReview.id}`}
                        className="text-xs text-brand-600 hover:text-brand-700 font-medium px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                      >
                        View →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
