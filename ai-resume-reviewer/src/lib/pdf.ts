export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text.trim();
}

export function validatePDFFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are allowed" };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: "File size must be less than 10MB" };
  }

  return { valid: true };
}
