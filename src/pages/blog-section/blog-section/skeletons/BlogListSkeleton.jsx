import React from "react";

const BlogListSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
    {/* Featured/Hero Blog Skeleton */}
    <div className="max-w-7xl mx-auto pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl group animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-90 z-10"></div>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200" />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-10 lg:p-14">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
              <span className="bg-gradient-to-r from-[#f20574] to-pink-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-wider shadow-lg w-24 h-6 bg-gray-300 animate-pulse"></span>
              <span className="text-gray-200 text-xs sm:text-sm bg-black bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-20 h-6 bg-gray-300 animate-pulse"></span>
              <span className="text-gray-200 text-xs sm:text-sm bg-black bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-20 h-6 bg-gray-300 animate-pulse"></span>
              <span className="text-gray-200 text-xs sm:text-sm bg-black bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-20 h-6 bg-gray-300 animate-pulse"></span>
            </div>
            <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-gray-300 rounded mb-2 sm:mb-3 md:mb-4 lg:mb-6 w-3/4 animate-pulse"></div>
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 mb-4 sm:mb-6 md:mb-8 animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
    {/* Blog Grid Skeletons */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="h-1 w-10 bg-[#f20574] mr-3"></div>
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="group flex flex-col h-full cursor-pointer animate-pulse">
              <div className="relative overflow-hidden rounded-xl h-52 mb-4 bg-gray-200" />
              <div className="flex items-center mb-3 space-x-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-3" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-4" />
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 w-16 bg-pink-100 rounded-full" />
                <div className="h-6 w-16 bg-pink-100 rounded-full" />
              </div>
              <div className="h-5 w-24 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default BlogListSkeleton; 