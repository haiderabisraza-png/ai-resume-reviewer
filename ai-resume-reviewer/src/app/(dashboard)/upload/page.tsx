import UploadForm from "@/components/forms/UploadForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Upload Resume" };

export default function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="page-title mb-1">Upload Your Resume</h1>
        <p className="text-surface-500 text-sm">
          Upload a PDF resume and get instant AI-powered analysis in under 30 seconds.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}
