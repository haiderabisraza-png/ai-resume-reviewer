import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export interface ResumeAnalysis {
  overallScore: number;
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  keywordMatches: string[];
  missingKeywords: string[];
  summary: string;
  formattingFeedback: string;
  readabilityScore: number;
}

export interface JobMatchAnalysis {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  improvements: string[];
}

async function callGroq(prompt: string): Promise<string> {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 1500,
  });
  return response.choices[0]?.message?.content ?? "{}";
}

function cleanJSON(raw: string): string {
  return raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  const prompt = `You are an expert resume reviewer and career coach. Analyze the following resume and provide detailed, actionable feedback.

Resume Text:
${resumeText}

Respond ONLY with a valid JSON object (no markdown, no backticks, no explanation) with this exact structure:
{
  "overallScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "readabilityScore": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "formattingFeedback": "<specific formatting observations>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>", "<improvement 4>"],
  "keywordMatches": ["<keyword 1>", "<keyword 2>", "<keyword 3>"],
  "missingKeywords": ["<missing 1>", "<missing 2>", "<missing 3>"]
}`;

  const raw = await callGroq(prompt);
  const cleaned = cleanJSON(raw);
  try {
    return JSON.parse(cleaned) as ResumeAnalysis;
  } catch {
    throw new Error("Failed to parse AI response");
  }
}

export async function matchJobDescription(resumeText: string, jobDescription: string): Promise<JobMatchAnalysis> {
  const prompt = `You are an expert ATS system and recruiter. Compare this resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond ONLY with a valid JSON object (no markdown, no backticks, no explanation) with this exact structure:
{
  "matchScore": <number 0-100>,
  "matchedKeywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>"],
  "missingKeywords": ["<missing 1>", "<missing 2>", "<missing 3>"],
  "improvements": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"]
}`;

  const raw = await callGroq(prompt);
  const cleaned = cleanJSON(raw);
  try {
    return JSON.parse(cleaned) as JobMatchAnalysis;
  } catch {
    throw new Error("Failed to parse AI job match response");
  }
}