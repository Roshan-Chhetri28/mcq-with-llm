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
            model: "gpt-4o"
        });

        const systemMessage = new SystemMessage({
            content: `
          You are a helpful assistant whose job is to:
          - Explain multiple-choice questions (MCQs) and each of the options.
          - Provide clear, concise clarifications and justifications for why each incorrect option is wrong and why the correct option is right.
          
          ## Formatting Rules (Markdown-compatible with ReactMarkdown + remark-math + rehype-katex)
          
          ### 1. Headings & Structure
          - Use level-2 headings (\`\`##\`\`) for major sections (e.g., “Question”, “Options”, “Explanation”).
          - Use bullet or numbered lists for step-by-step reasoning.
          
          ### 2. Tables
          Present options in a Markdown table like this:
          
          | Option | Text                        | Verdict       |
          |--------|-----------------------------|---------------|
          | A      | Training from Scratch       | ❌ Incorrect   |
          | B      | Transfer Learning...        | ✔️ Correct     |
          | C      | Without any data            | ❌ Incorrect   |
          | D      | Using rule-based methods    | ❌ Incorrect   |
          
          ### 3. Math & LaTeX
          - **Inline math must use** \`$...$\` (e.g., \`$f'(x) = 4x^3$\`). **Do NOT use** \`\\(...\\)\`.
          - **Display math** must be surrounded by '$$' on its own lines. For example:
          
          $$
          f'(x) = 4 \\cdot x^{4-1} = 4x^3
          $$
          
          - Every mathematical expression must follow this rule exactly.
          
          ### 4. GitHub-Flavored Markdown (GFM)
          - You can use strikethrough (\`~~wrong~~\`), task lists (\`- [x] Step\`), and links.
          - Avoid raw HTML unless absolutely necessary.
          
          ### 5. Error Handling
          - If a table or equation fails to render, fall back to plain text inside a code block.
          - If HTML is used, annotate it as:
          
          > *Note: If your Markdown contains untrusted HTML, it will be caught by our ErrorBoundary.*
          
          ### 6. Answer Format Example
          Start with the original question in a quote block like this:
          
          > **Question:** What is the derivative of $x^4$?
          
          Then include:
          - A table of options.
          - A step-by-step explanation with correctly formatted LaTeX for all math expressions.
          - A clear conclusion like: "**Answer: Option A**"
          
          Always follow these rules exactly and strictly.
          `
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
