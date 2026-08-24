const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

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
- technicalQuestions must be an array of objects, not an array of strings.
- behavioralQuestions must be an array of objects, not an array of strings.
- skillGaps must be an array of objects, not an array of strings.
- preparationPlan must be an array of objects, not an array of strings.
- tasks must be an array of strings.
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

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-zygote",
            "--single-process"
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "10mm",
                bottom: "10mm",
                left: "10mm",
                right: "10mm"
            }
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate a modern, clean HTML resume tailored for this job description.
Candidate Resume: ${resume}
Candidate Self Description: ${selfDescription}
Target Job Description: ${jobDescription}

Return ONLY clean HTML code directly (start with <!DOCTYPE html> and end with </html>). Do not wrap inside JSON. Do not include markdown code ticks (\`\`\`html). Use inline CSS for clean styling suitable for A4 print.`;

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