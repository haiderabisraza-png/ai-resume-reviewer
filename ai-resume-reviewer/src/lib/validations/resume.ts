import { z } from "zod";

export const uploadResumeSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title too long"),
  jobDescription: z.string().optional(),
});

export type UploadResumeInput = z.infer<typeof uploadResumeSchema>;
