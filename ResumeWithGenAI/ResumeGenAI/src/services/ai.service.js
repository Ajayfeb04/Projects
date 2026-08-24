const { GoogleGenAI } = require("@google/genai");
const html_to_pdf = require("html-pdf-node");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `
Generate a complete interview preparation report.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

Return ONLY valid JSON with exactly these fields:

{
  "title": "Job title based on the job description",
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "technical interview question",
      "intention": "why interviewer asks this",
      "answer": "strong answer candidate should give"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "behavioral interview question",
      "intention": "why interviewer asks this",
      "answer": "strong answer candidate should give"
    }
  ],
  "skillGaps": [
    {
      "skill": "missing or weak skill",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "main preparation focus",
      "tasks": ["task 1", "task 2", "task 3"]
    }
  ]
}

Rules:
- technicalQuestions must contain at least 5 questions.
- behavioralQuestions must contain at least 5 questions.
- skillGaps must contain at least 3 items.
- preparationPlan must contain at least 7 days.
- matchScore must be a number between 0 and 100.
- severity must be only "low", "medium", or "high".
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    return JSON.parse(response.text);
}

function generatePdfFromHtml(htmlContent) {
    const options = { format: "A4", printBackground: true };
    const file = { content: htmlContent };

    return html_to_pdf.generatePdf(file, options);
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate a clean, modern HTML resume tailored for this job description.
Candidate Resume: ${resume}
Candidate Self Description: ${selfDescription}
Target Job Description: ${jobDescription}

Return ONLY direct HTML code starting with <!DOCTYPE html> and ending with </html>. Use clean inline CSS styling suitable for A4 printable resume. Do not wrap in JSON.`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    let rawHtml = response.text.trim();
    if (rawHtml.startsWith("```html")) {
        rawHtml = rawHtml.replace(/^```html\n/, "").replace(/```$/, "");
    } else if (rawHtml.startsWith("```")) {
        rawHtml = rawHtml.replace(/^```\n/, "").replace(/```$/, "");
    }

    const pdfBuffer = await generatePdfFromHtml(rawHtml);
    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };