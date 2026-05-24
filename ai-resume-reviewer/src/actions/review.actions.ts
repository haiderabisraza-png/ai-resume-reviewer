"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ActionResult, ReviewWithJob } from "@/types";

export async function getReviewById(
  id: string
): Promise<ReviewWithJob | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.review.findFirst({
    where: {
      id,
      resume: { userId: session.user.id },
    },
    include: { jobDescription: true },
  }) as Promise<ReviewWithJob | null>;
}

export async function deleteReview(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.review.deleteMany({
    where: {
      id,
      resume: { userId: session.user.id },
    },
  });

  return { success: true, data: undefined };
}
