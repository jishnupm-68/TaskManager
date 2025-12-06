const express = require('express');
const aiTodoParserRouter = express.Router();
const { GoogleGenAI } = require('@google/genai');
const isLoggedIn = require('../../middleware/auth');


aiTodoParserRouter.post("/todoParser",isLoggedIn ,async (req, res) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { text } = req.body;
    const currentDate = new Date();
    if (text.length <= 0) return;
    const prompt = `
                You are a task parser. Convert the following text into a JSON object with keys: 
                "title", "priority", "status", "dueDate".

                Rules:
                - Always respond in valid JSON only.
                - "priority" should be one of (Low, Medium, High).
                - "status" should be one of (Todo, In Progress, Completed).
                - "dueDate" must be in YYYY-MM-DD HH-MM format. If no date mentioned, return null.
                - Extract only meaningful title without extra words.
                - Current Date is: "${currentDate}", due date must be based on this date.
                - Respond ONLY with a valid JSON object.
                - DO NOT use code blocks, DO NOT wrap JSON in \`\`\`, DO NOT return markdown.

                Text: "${text}"
                `;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    res.status(200).json({
      status: true,
      message: "Text parsed successfully",
      data: JSON.parse(response.text),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports= aiTodoParserRouter
