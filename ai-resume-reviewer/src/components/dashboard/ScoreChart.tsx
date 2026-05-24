"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { type ResumeWithReviews } from "@/types";
import { truncate } from "@/lib/utils";

interface Props {
  resumes: ResumeWithReviews[];
}

export default function ScoreChart({ resumes }: Props) {
  const data = resumes
    .filter((r) => r.reviews.length > 0)
    .map((resume) => ({
      name: truncate(resume.title, 14),
      "Overall Score": resume.reviews[0].overallScore,
      "ATS Score": resume.reviews[0].atsScore,
    }))
    .reverse();

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            fontSize: 12,
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
        />
        <Bar
          dataKey="Overall Score"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="ATS Score"
          fill="#d946ef"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
