import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div className="text-red-500 p-3 bg-red-50 rounded-lg">
      Rendering error: {error.message}
    </div>
  );
}

const MathComponent = ({ content }) => (
  <div
    className="my-3 text-center"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const InlineMathComponent = ({ content }) => (
  <span
    className="mx-1"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const ResponseRenderer = ({ content }) => {
  const cleanContent = content
    .replace(/\\(\(|\[)/g, '$')
    .replace(/\\(\)|\])/g, '$')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => `\`\`\`${lang || ''}\n${code.trim()}\n\`\`\``);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-lg my-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4 border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold border-b">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-2 text-sm border-b">
                {children}
              </td>
            );
          },
          math({ children }) {
            return <MathComponent content={children} />;
          },
          inlineMath({ children }) {
            return <InlineMathComponent content={children} />;
          }
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </ErrorBoundary>
  );
};

export default ResponseRenderer;