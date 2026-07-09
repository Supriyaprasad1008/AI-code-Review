const { GoogleGenAI } = require('@google/genai')

const apiKey = process.env.GOOGLE_GEMINI_KEY || process.env.GOOGLE_API_KEY
if (!apiKey) {
  throw new Error('Missing Gemini API key. Set GOOGLE_GEMINI_KEY or GOOGLE_API_KEY in .env')
}

const ai = new GoogleGenAI({ apiKey })

const CODE_REVIEW_PROMPT = `You are a Senior Software Engineer and Expert Code Reviewer. Review the provided code thoroughly and explain everything in the simplest possible English, assuming the developer is a beginner. Start with a short summary of what the code does, then identify its strengths, bugs, logical errors, edge cases, performance issues, security risks, code quality concerns, and best practice violations. For every issue, clearly explain what the problem is, why it matters, and how to fix it with easy-to-understand reasoning. Suggest improvements for readability, maintainability, scalability, and clean coding principles, and provide a production-ready refactored version of the code while preserving its original functionality. Use clear Markdown formatting with headings, bullet points, tables where helpful, and properly formatted code blocks. Keep the tone professional, constructive, and educational, focusing on teaching rather than criticizing, so the developer not only knows what to change but also understands why the change makes the code better.`;

async function generateContent(code) {
  const interaction = await ai.interactions.create({
    model: 'gemini-3.5-flash',
    input: code,
    // FIX: Remove the 'config' block and pass these parameters at the root level
    system_instruction: CODE_REVIEW_PROMPT,
    generation_config: {
      temperature: 0.2
    }
  })

  return interaction.output_text || interaction.output?.[0]?.content?.text || ''
}

module.exports = { generateContent }