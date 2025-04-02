import React from "react";
import ReactMarkdown from "react-markdown";

export default function CustomMarkdown({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="font-montserrat text-2xl font-bold text-red-600 mb-3 leading-tight" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="font-montserrat text-2xl capitalize font-semibold text-gray-800 mt-5 mb-2 leading-tight" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="font-montserrat text-xl capitalize font-medium text-gray-700 mt-3 mb-2 leading-snug" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="font-montserrat text-lg text-gray-600 leading-snug mt-2 mb-3" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="font-montserrat ml-6 text-gray-700 mt-2 mb-3 space-y-1 leading-snug" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="font-montserrat list-decimal ml-6 text-gray-700 mt-2 mb-3 space-y-1 leading-snug" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="font-montserrat  relative text-lg leading-snug flex items-start  gap-2">
            <span className="bg-green-500  mt-1.5  text-white font-semibold text-sm px-1 rounded-md">
              ✔
            </span>
            <span className="flex-1  " {...props} />
          </li>
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-montserrat font-semibold text-gray-900" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="font-montserrat border-l-4 border-gray-400 pl-4 italic text-gray-700 my-3 leading-snug" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
