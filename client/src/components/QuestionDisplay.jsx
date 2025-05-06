import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { processLaTeX } from '../utils/processLatex';

export default function QuestionDisplay({ questionData: { question, options, correct, explanation } }) {
  const [click, setClick] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleAnswer = (selectedKey) => {
    setClick(true);
    setAnswer(selectedKey);
  };

  // Process LaTeX
  const processedQuestion = processLaTeX(question);
  const processedExplanation = processLaTeX(explanation);

  return (
    <div className="m-3 space-y-4">
      <div className="text-lg text-gray-700 font-bold">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {processedQuestion}
        </ReactMarkdown>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(options).map(([key, value]) => (
          <div key={key} className="p-3 border rounded-lg bg-gray-50">
            <span className="font-semibold text-blue-600">{key}:</span>
            <span
              className={
                click
                  ? answer === correct
                    ? "ml-2 font-bold text-green-800"
                    : answer === key
                    ? "ml-2 font-bold text-red-800"
                    : "ml-2 font-bold text-gray-800"
                  : "ml-2 font-bold text-gray-800"
              }
              onClick={() => !click && handleAnswer(key)}
              style={{ cursor: click ? 'default' : 'pointer' }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {click && (
        <>
          <div className={answer === correct ? "p-3 rounded-lg bg-green-50" : "p-3 rounded-lg bg-red-50"}>
            <span className={answer === correct ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
              Correct Answer:
            </span>
            <span className="ml-2 text-green-800">{correct}</span>
          </div>

          <div className="p-3 rounded-lg bg-blue-50">
            <div className="font-semibold text-blue-700">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {`**Explanation:** ${processedExplanation}`}
              </ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
