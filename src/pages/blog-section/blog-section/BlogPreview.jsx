import React from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  }).replace(/\//g, '.');
};

const BlogPreview = ({
  title,
  content,
  coverImagePreview,
  hashtags = [],
  createdAt,
  viewCount
}) => {
  const displayDate = createdAt ? formatDate(createdAt) : formatDate(new Date());
  const displayViewCount = viewCount !== undefined ? viewCount : 0;

  return (
    <div className="flex-grow px-6 py-4 overflow-y-auto relative">
      <div className="max-w-4xl mx-auto">
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
          <div className="mb-1 rounded-lg overflow-hidden">
            <img
              src={coverImagePreview}
              alt={`${title} - Blog Cover`}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="mb-8 text-gray-500 text-sm text-right">
          {displayViewCount} views
        </div>

        <div className="mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
