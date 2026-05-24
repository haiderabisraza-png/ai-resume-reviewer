export interface ResumeWithReviews {
  id: string;
  title: string;
  fileUrl: string;
  extractedText: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  reviews: ReviewWithJob[];
}

export interface ReviewWithJob {
  id: string;
  resumeId: string;
  overallScore: number;
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  keywordMatches: string[];
  missingKeywords: string[];
  aiResponse: Record<string, unknown>;
  createdAt: Date;
  jobDescription: {
    id: string;
    content: string;
    matchScore: number;
  } | null;
}

export interface DashboardStats {
  totalResumes: number;
  totalReviews: number;
  averageScore: number;
  averageAtsScore: number;
  recentResumes: ResumeWithReviews[];
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
