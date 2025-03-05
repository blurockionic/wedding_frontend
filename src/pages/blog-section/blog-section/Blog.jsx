import React from 'react';

const Blog = ({ title, content, coverImagePreview, hashtags }) => {
  return (
    <div className="flex-grow px-6 py-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        {/* Cover Image */}
        {coverImagePreview && (
          <img
            src={coverImagePreview}
            alt="Cover"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Blog Content */}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Hashtags</h3>
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
      </div>
    </div>
  );
};

export default Blog;