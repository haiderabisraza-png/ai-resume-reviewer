export const APP_NAME = "ResumeAI";
export const APP_DESCRIPTION =
  "AI-powered resume reviewer that helps you land your dream job";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
} as const;

export const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Upload Resume", href: "/upload" },
  { label: "My Reviews", href: "/reviews" },
] as const;
