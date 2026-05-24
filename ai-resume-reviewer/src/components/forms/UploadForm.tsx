"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadResumeSchema, type UploadResumeInput } from "@/lib/validations/resume";
import { uploadAndAnalyzeResume } from "@/actions/resume.actions";
import { formatFileSize } from "@/lib/utils";
import { toast } from "sonner";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<UploadResumeInput>({
    resolver: zodResolver(uploadResumeSchema),
  });

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File must be less than 10MB");
      return;
    }
    setFile(f);
  };

  const onSubmit = async (data: UploadResumeInput) => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }
    setLoading(true);
    setProgress("Extracting text from PDF...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    if (data.jobDescription) formData.append("jobDescription", data.jobDescription);

    setTimeout(() => setProgress("Analyzing with AI..."), 1500);

    const result = await uploadAndAnalyzeResume(formData);

    if (result.success) {
      toast.success("Analysis complete!");
      router.push(`/analysis/${result.data.reviewId}`);
    } else {
      toast.error(result.error);
      setLoading(false);
      setProgress("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          dragging
            ? "border-brand-500 bg-brand-50"
            : file
            ? "border-emerald-400 bg-emerald-50"
            : "border-surface-300 hover:border-brand-400 hover:bg-surface-50"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const dropped = e.dataTransfer.files[0];
          if (dropped) handleFile(dropped);
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-semibold text-surface-900 text-sm">{file.name}</p>
            <p className="text-xs text-surface-500">{formatFileSize(file.size)}</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="text-xs text-red-500 hover:text-red-600 font-medium mt-1"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-surface-700 text-sm">
                Drop your PDF here, or <span className="text-brand-600">browse</span>
              </p>
              <p className="text-xs text-surface-400 mt-1">PDF only · Max 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="label">Resume Title</label>
        <input
          {...register("title")}
          placeholder="e.g. Software Engineer Resume 2024"
          className="input"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Job Description */}
      <div>
        <label className="label">
          Job Description{" "}
          <span className="text-surface-400 font-normal">(optional)</span>
        </label>
        <textarea
          {...register("jobDescription")}
          rows={5}
          placeholder="Paste the job description to get a match score and tailored suggestions..."
          className="input resize-none"
        />
        <p className="mt-1 text-xs text-surface-400">
          Adding a job description enables keyword matching and a tailored match percentage.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !file}
        className="btn-primary w-full py-3 text-sm"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {progress || "Analyzing..."}
          </span>
        ) : (
          "🚀 Analyze Resume with AI"
        )}
      </button>
    </form>
  );
}
