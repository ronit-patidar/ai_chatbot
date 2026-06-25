const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(prompt){
  console.log("Prompt received:", prompt);
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents : prompt
  })
  return response.text;
}
module.exports = generateResponse;