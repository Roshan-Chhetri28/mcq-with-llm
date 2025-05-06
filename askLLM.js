const { ChatOpenAI } = require('@langchain/openai');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');
const express = require('express');
const router = express.Router();
const LangChainTracer = require("@langchain/core/tracers/tracer_langchain")

require('dotenv').config();


process.env.LANGCHAIN_TRACING_V2 = "true";
process.env.LANGCHAIN_API_KEY = process.env.LANGCHAIN_API
router.post('/', async (req, res) => {
    console.log(req)
    try {
        const llm = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            model:"gpt-4o"
        });

        const systemMessage = new SystemMessage({
            content: 'You are a helpful assistant that explains MCQ options and provides clarification. Format your responses using Markdown for tables and other md render-able type else Use, LaTeX (for math), and other formatting features as appropriate so that the output is clear and renderable on the frontend, similar to how ChatGPT presents its responses.'
          });
          

        // Fix: Properly format the user message content
        const userMessage = new HumanMessage({
            content: `Question: ${req.body.question.question}\nOptions: ${JSON.stringify(req.body.question.options)}\nUser Query: ${req.body.query}`
        });

        const response = await llm.invoke([systemMessage, userMessage]);

        res.json({ answer: response.content });
    } catch (err) {
        console.error('Error in processing:', err);
        res.status(500).json({ error: 'Something went wrong with the AI response.' });
    }
});

module.exports = router;
