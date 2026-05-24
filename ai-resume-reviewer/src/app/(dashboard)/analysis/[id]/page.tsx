import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { getScoreColor, getScoreBg, getScoreLabel, formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume Analysis" };

export default async function AnalysisPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const review = await prisma.review.findFirst({
    where: {
      id: params.id,
      resume: { userId: session.user.id },
    },
    include: {
      resume: true,
      jobDescription: true,
    },
  });

  if (!review) notFound();

  const ai = review.aiResponse as Record<string, unknown>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/reviews" className="text-sm text-surface-500 hover:text-surface-700 flex items-center gap-1 mb-2">
            ← Back to Reviews
          </Link>
          <h1 className="page-title">{review.resume.title}</h1>
          <p className="text-sm text-surface-400 mt-1">Analyzed on {formatDate(review.createdAt)}</p>
        </div>
        <Link href="/upload" className="btn-primary text-sm">
          New Analysis
        </Link>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ScoreCard label="Overall Score" score={review.overallScore} />
        <ScoreCard label="ATS Score" score={review.atsScore} />
        {(ai.readabilityScore as number) && (
          <ScoreCard label="Readability" score={ai.readabilityScore as number} />
        )}
        {review.jobDescription && (
          <ScoreCard label="Job Match" score={review.jobDescription.matchScore} />
        )}
      </div>

      {/* Summary */}
      {ai.summary && (
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
            <span>💡</span> AI Summary
          </h2>
          <p className="text-surface-600 text-sm leading-relaxed">{ai.summary as string}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <ListCard
          title="✅ Strengths"
          items={review.strengths}
          itemClass="text-emerald-700 bg-emerald-50 border border-emerald-100"
        />

        {/* Weaknesses */}
        <ListCard
          title="⚠️ Weaknesses"
          items={review.weaknesses}
          itemClass="text-red-700 bg-red-50 border border-red-100"
        />
      </div>

      {/* Improvements */}
      <div className="card p-6">
        <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
          <span>🚀</span> Actionable Improvements
        </h2>
        <ol className="space-y-3">
          {review.improvements.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                {i + 1}
              </span>
              <span className="text-sm text-surface-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Keywords found */}
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
            <span>🔑</span> Keywords Found
          </h2>
          <div className="flex flex-wrap gap-2">
            {review.keywordMatches.map((kw) => (
              <span key={kw} className="badge badge-success">{kw}</span>
            ))}
          </div>
        </div>

        {/* Missing keywords */}
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
            <span>❌</span> Missing Keywords
          </h2>
          <div className="flex flex-wrap gap-2">
            {review.missingKeywords.map((kw) => (
              <span key={kw} className="badge badge-danger">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Job match details */}
      {review.jobDescription && (
        <div className="card p-6 border-brand-200 bg-brand-50/30">
          <h2 className="font-semibold text-surface-900 mb-1 flex items-center gap-2">
            <span>📋</span> Job Description Match
          </h2>
          <p className="text-xs text-surface-500 mb-4">
            Match score: <span className={`font-bold ${getScoreColor(review.jobDescription.matchScore)}`}>
              {review.jobDescription.matchScore}%
            </span>
          </p>
          <p className="text-xs text-surface-600 leading-relaxed line-clamp-4">
            {review.jobDescription.content}
          </p>
        </div>
      )}

      {/* Formatting feedback */}
      {ai.formattingFeedback && (
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
            <span>📐</span> Formatting Feedback
          </h2>
          <p className="text-sm text-surface-600 leading-relaxed">{ai.formattingFeedback as string}</p>
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  return (
    <div className="card p-5 text-center">
      <div className={`text-3xl font-display font-bold mb-1 ${getScoreColor(score)}`}>
        {score}%
      </div>
      <div className="text-xs text-surface-500 font-medium mb-2">{label}</div>
      <div className="w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${getScoreBg(score)} transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className={`text-xs font-medium mt-1 ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </div>
    </div>
  );
}

function ListCard({
  title,
  items,
  itemClass,
}: {
  title: string;
  items: string[];
  itemClass: string;
}) {
  return (
    <div className="card p-6">
      <h2 className="font-semibold text-surface-900 mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className={`text-xs rounded-lg px-3 py-2 leading-relaxed ${itemClass}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
