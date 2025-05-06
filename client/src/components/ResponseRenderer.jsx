import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
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

const ResponseRenderer = ({ content }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ReactMarkdown
      // Let GFM (tables, strikethrough, task lists) through:
      remarkPlugins={[remarkGfm, remarkMath]}
      // Allow raw HTML (needed for KaTeX and any ChatGPT HTML snippets):
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      // Do not escape HTML—you trust ChatGPT’s output here.
      skipHtml={false}
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
        // Math is handled automatically by rehype-katex,
        // so you don’t need custom wrappers unless you want extra styling.
      }}
    >
      {content}
    </ReactMarkdown>
  </ErrorBoundary>
);

export default ResponseRenderer;
