"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extractTextFromPDF } from "@/lib/pdf";
import { analyzeResume, matchJobDescription } from "@/lib/openai";
import { ActionResult, ResumeWithReviews } from "@/types";
import { revalidatePath } from "next/cache";

export async function uploadAndAnalyzeResume(
  formData: FormData
): Promise<ActionResult<{ reviewId: string; resumeId: string }>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const file = formData.get("file") as File | null;
  const title = formData.get("title") as string;
  const jobDescription = formData.get("jobDescription") as string | null;

  if (!file) return { success: false, error: "No file provided" };
  if (file.type !== "application/pdf")
    return { success: false, error: "Only PDF files are allowed" };
  if (file.size > 10 * 1024 * 1024)
    return { success: false, error: "File size must be less than 10MB" };
  if (!title?.trim()) return { success: false, error: "Title is required" };

  const buffer = Buffer.from(await file.arrayBuffer());
  const extractedText = await extractTextFromPDF(buffer);

  if (!extractedText || extractedText.length < 50) {
    return {
      success: false,
      error: "Could not extract text from PDF. Please ensure it is not scanned.",
    };
  }

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: title.trim(),
      fileUrl: `/uploads/${file.name}`,
      extractedText,
    },
  });

  const analysis = await analyzeResume(extractedText);

  let jobMatch = null;
  if (jobDescription?.trim()) {
    jobMatch = await matchJobDescription(extractedText, jobDescription.trim());
  }

  const review = await prisma.review.create({
    data: {
      resumeId: resume.id,
      overallScore: analysis.overallScore,
      atsScore: analysis.atsScore,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      improvements: analysis.improvements,
      keywordMatches: analysis.keywordMatches,
      missingKeywords: analysis.missingKeywords,
      aiResponse: analysis as Record<string, unknown>,
      ...(jobDescription?.trim() && jobMatch
        ? {
            jobDescription: {
              create: {
                content: jobDescription.trim(),
                matchScore: jobMatch.matchScore,
              },
            },
          }
        : {}),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/reviews");

  return { success: true, data: { reviewId: review.id, resumeId: resume.id } };
}

export async function getUserResumes(): Promise<ResumeWithReviews[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.resume.findMany({
    where: { userId: session.user.id },
    include: {
      reviews: {
        include: { jobDescription: true },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  }) as Promise<ResumeWithReviews[]>;
}

export async function getResumeById(
  id: string
): Promise<ResumeWithReviews | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.resume.findFirst({
    where: { id, userId: session.user.id },
    include: {
      reviews: {
        include: { jobDescription: true },
        orderBy: { createdAt: "desc" },
      },
    },
  }) as Promise<ResumeWithReviews | null>;
}

export async function deleteResume(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.resume.deleteMany({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/reviews");

  return { success: true, data: undefined };
}

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const [resumes, reviews] = await Promise.all([
    prisma.resume.count({ where: { userId: session.user.id } }),
    prisma.review.findMany({
      where: { resume: { userId: session.user.id } },
      select: { overallScore: true, atsScore: true },
    }),
  ]);

  const recentResumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    include: {
      reviews: {
        include: { jobDescription: true },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const averageScore =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((s, r) => s + r.overallScore, 0) / reviews.length
        )
      : 0;

  const averageAtsScore =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((s, r) => s + r.atsScore, 0) / reviews.length
        )
      : 0;

  return {
    totalResumes: resumes,
    totalReviews: reviews.length,
    averageScore,
    averageAtsScore,
    recentResumes: recentResumes as ResumeWithReviews[],
  };
}
