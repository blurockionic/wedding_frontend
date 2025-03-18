import React from "react";
import ReactMarkdown from "react-markdown";

export default function CustomMArkdown({content}) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold text-red-600 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="text-2xl capitalize font-semibold text-gray-800 mt-6 mb-3"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="text-xl  capitalize font-medium text-gray-700 mt-4 mb-2"
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p
            className="text-lg text-gray-600 leading-relaxed mt-2 mb-4"
            {...props}
          />
        ),
        ul: ({ node, ...props }) => (
          <ul
            className="list-disc ml-6 text-gray-700 mt-2 mb-4 space-y-2"
            {...props}
          />
        ),
        ol: ({ node, ...props }) => (
          <ol
            className="list-decimal ml-6 text-gray-700 mt-2 mb-4 space-y-2"
            {...props}
          />
        ),
        li: ({ node, ...props }) => (
          <li className="text-lg leading-snug" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-semibold text-gray-900" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-400 pl-4 italic text-gray-700 my-4"
            {...props}
          />
        ),
      }}
    >
     {content}
    </ReactMarkdown>
  );
}
