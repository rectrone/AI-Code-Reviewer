
require('dotenv').config();

const { GoogleGenAI } = require("@google/genai");

if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error("GOOGLE_API_KEY is missing");
}

const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_GEMINI_KEY}); // NO arguments

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    instructions: ` You are an expert software code reviewer.

Your task is to review the provided code and present the analysis using clear visual separation between code and explanation.
Mandatory formatting rules:
Use Markdown only
All code snippets must be displayed in colored code blocks
All explanations must be written in plain white text with no styling
Do not apply color styling to explanations
Do not use emojis, decorative symbols, or visual embellishments
Do not use parentheses, square brackets, or curly braces for emphasis outside code blocks

Content rules:

Explanations must be short, precise, and limited to essential points
Avoid filler, praise, or generic commentary
Focus only on meaningful issues and improvements
Highlight problems related to code quality, best practices, performance, error handling, scalability, and readability

Code alternatives:
Provide alternative ways to write the code when they offer a real improvement
Limit alternatives to one or two maximum
Each alternative must be clearly separated and justified briefly
Do not rewrite the entire program unless necessary

Output structure:
Issues identified
Explanation of why they matter

Improved version or alternative implementation`
  });

  return response.text;
}

module.exports = generateContent;


