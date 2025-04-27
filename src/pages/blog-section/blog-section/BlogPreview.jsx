import React from 'react';
import { format } from 'date-fns';
import 'react-quill/dist/quill.snow.css';
// Import the styles for proper display of Quill content

const BlogPreview = ({ title, content, coverImagePreview, hashtags = [], createdAt = new Date(), viewCount = 0 }) => {
  const displayDate = createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : format(new Date(), 'MMMM dd, yyyy');

  return (
    <div className="bg-white shadow-md overflow-auto p-8 mx-auto max-w-4xl h-full">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>

        <div className="flex items-center text-gray-500 mb-6">
          <span className="mr-2">{displayDate}</span>
          <span className="mr-2">|</span>
          <span>by marraigevendors.com</span>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {hashtags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-[#f20574]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {coverImagePreview && (
          <div className="mb-8">
            <img
              src={coverImagePreview}
              alt="Blog cover"
              className="w-full h-auto max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none ql-editor">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Blog Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-gray-500">
        <div>
          <span>{viewCount} views</span>
        </div>
        <div>
          <span>Share this article:</span>
          {/* Placeholder for share buttons */}
          <div className="flex space-x-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
