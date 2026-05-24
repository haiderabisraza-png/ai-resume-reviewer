import { getUserResumes } from "@/actions/resume.actions";
import { formatDate, getScoreColor, getScoreLabel, getScoreBg } from "@/lib/utils";
import Link from "next/link";
import DeleteResumeButton from "@/components/dashboard/DeleteResumeButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Reviews" };

export default async function ReviewsPage() {
  const resumes = await getUserResumes();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title mb-1">My Reviews</h1>
          <p className="text-sm text-surface-500">{resumes.length} resume{resumes.length !== 1 ? "s" : ""} analyzed</p>
        </div>
        <Link href="/upload" className="btn-primary text-sm">
          + New Review
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="card p-16 text-center">
          <span className="text-5xl block mb-4">📭</span>
          <p className="text-surface-600 font-medium mb-2">No reviews yet</p>
          <p className="text-surface-400 text-sm mb-6">Upload your first resume to get AI-powered feedback</p>
          <Link href="/upload" className="btn-primary">
            Upload Resume
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => {
            const latestReview = resume.reviews[0];
            return (
              <div key={resume.id} className="card p-5 hover:shadow-card-hover transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-surface-900 truncate">{resume.title}</h3>
                      <p className="text-xs text-surface-400">{formatDate(resume.createdAt)} · {resume.reviews.length} review{resume.reviews.length !== 1 ? "s" : ""}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {latestReview && (
                      <div className="text-right hidden sm:block">
                        <div className={`text-lg font-display font-bold ${getScoreColor(latestReview.overallScore)}`}>
                          {latestReview.overallScore}%
                        </div>
                        <div className="text-xs text-surface-400">{getScoreLabel(latestReview.overallScore)}</div>
                      </div>
                    )}
                    <DeleteResumeButton id={resume.id} />
                  </div>
                </div>

                {latestReview && (
                  <div className="mt-4">
                    {/* Score bars */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "Overall", score: latestReview.overallScore },
                        { label: "ATS", score: latestReview.atsScore },
                      ].map(({ label, score }) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-surface-500">{label}</span>
                            <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
                          </div>
                          <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${getScoreBg(score)}`} style={{ width: `${score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Keywords preview */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {latestReview.keywordMatches.slice(0, 4).map((kw) => (
                        <span key={kw} className="badge badge-success">{kw}</span>
                      ))}
                      {latestReview.keywordMatches.length > 4 && (
                        <span className="badge bg-surface-100 text-surface-500">+{latestReview.keywordMatches.length - 4}</span>
                      )}
                    </div>

                    <Link
                      href={`/analysis/${latestReview.id}`}
                      className="btn-primary text-xs w-full justify-center"
                    >
                      View Full Analysis →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
