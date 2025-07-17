import React from "react";

const BlogSkeleton = () => (
  <div className="bg-gray-50 min-h-screen">
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-1/4 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* Cover Image */}
            <div className="mb-6 w-full h-64 bg-gray-200 animate-pulse" />
            <div className="p-6">
              {/* Blog Title */}
              <div className="h-10 w-2/3 bg-gray-300 rounded mb-4 animate-pulse" />
              {/* Meta Info */}
              <div className="flex items-center text-gray-600 mb-6 text-sm space-x-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                <div className="ml-auto flex items-center space-x-2">
                  <div className="h-4 w-8 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-8 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                ))}
              </div>
              {/* Blog Content */}
              <div className="mb-8 space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
              {/* Like/Comment/Share Buttons */}
              <div className="border-t border-b py-4 mb-6 flex items-center space-x-6">
                <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
              </div>
              {/* Comments Section */}
              <div className="mb-8">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* About Author */}
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mr-4" />
              <div>
                <div className="h-4 w-24 bg-gray-100 rounded mb-2 animate-pulse" />
                <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          </div>
          {/* Popular Tags */}
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
          {/* Newsletter Signup */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded mb-4 animate-pulse" />
            <div className="flex flex-col space-y-2">
              <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      {/* Related Posts Carousel Skeleton */}
      <div className="mt-12 mb-8">
        <div className="h-8 w-1/4 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white shadow-sm rounded-lg overflow-hidden animate-pulse">
              <div className="h-48 w-full bg-gray-200" />
              <div className="p-4">
                <div className="h-4 w-1/2 bg-gray-100 rounded mb-2" />
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Back to blogs button skeleton */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded bg-white text-gray-700">
          <div className="h-5 w-5 bg-gray-200 rounded-full mr-2 animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

export default BlogSkeleton; 