const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}
// console.log(process.env.GEMINI_API_KEY);

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.7,
});

const prompt = PromptTemplate.fromTemplate(`
You are a medical assistant. 
Generate a short, patient-friendly explanation of this lab report. 
Keep it clear, simple, and concise (3–5 sentences maximum). 
Avoid phrases like "Okay", "your report says", or any filler words.
Do not include bullet points or headings. 
Focus only on what the results mean in everyday language.

Lab Report:
{report}

Explanation:
`);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

async function getExplanation(report) {
  try {
    const explanation = await chain.invoke({
      report: JSON.stringify(report, null, 2),
    });
    return explanation;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getExplanation };
