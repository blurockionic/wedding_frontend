import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetBlogsQuery, useGetBlogsByTagQuery } from "../../../redux/blogSlice.js";
import { motion } from 'framer-motion';
import { IoEyeOutline } from "react-icons/io5";
import Footer from '../../Footer.jsx';

const BlogList = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const blogTagName = query.get('tag');
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(10); // Number of blogs per page

  console.log("Blog Tag Name:", blogTagName);
  const { data, error, isLoading, refetch } = blogTagName ? useGetBlogsByTagQuery( blogTagName ) : useGetBlogsQuery({s:(currentPage - 1)*8, t:blogsPerPage});
  console.log("Blogs Data:", data);
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Refetch blogs on page change (pagination)
  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    if (data && data.success) {
      
      const transformedBlogs = data.data.map(blog => ({
        id: blog.id,
        title: blog.title,
        urlTitle: blog.urlTitle,
        coverImage: blog.coverImage || 'https://placehold.co/600x300?text=CoverImage',
        date: blog.createdAt,
        hashtags: blog.tags,
        viewCount: blog.viewCount,
        excerpt: blog.excerpt || blog.content
        .replace(/<[^>]*>|&nbsp;|\u00A0/g, ' ') // Remove all HTML tags and non-breaking spaces
        .replace(/\s{2,}/g, ' ')                // Replace multiple spaces with single space
        .trim()                                 // Trim leading/trailing spaces
        .substring(0, 150)                      // Take first 150 characters
        .replace(/\s+\S*$/, '') + '...',        // Cleanly cut at last word boundary

        readTime: `${Math.ceil(blog.content
          .replace(/<[^>]*>|&nbsp;|\u00A0/g, ' ') // Remove all HTML tags and non-breaking spaces
          .replace(/\s{2,}/g, ' ')                // Replace multiple spaces with single space
          .trim()                                 // Trim leading/trailing spaces                      // Take first 150 characters
          .replace(/\s+\S*$/, '') + '...'?.length / 500) || 3} min read`,
        content: blog.content
      }));
      setBlogs(transformedBlogs);
    }
  }, [data]);

  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter(blog =>
        blog.hashtags.some(tag => tag.tagName === activeCategory)
      );

  const sortedBlogs = filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Get current blogs for pagination
  const currentBlogs = sortedBlogs.slice();

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Extract unique categories from blog tags
  const allCategories = ['All', ...new Set(blogs.flatMap(blog =>
    blog.hashtags.map(tag => tag.tagName)
  ))].slice(0, 6); // Limit to 6 categories for UI

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-[#f20574] rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">Error loading blogs: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#f20574] hover:bg-[#d30062] text-white rounded-lg font-medium transition-all transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-pink-50 min-h-screen">
      {/* Header with Curved Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f20574] to-purple-600 transform -skew-y-3 origin-top-left h-[120%] -z-10"></div>
        <div className="max-w-7xl mx-auto pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            { blogTagName ? 
            <div className="mb-6">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-0 md:space-x-0">
                  <li className="inline-flex items-center">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <Link to="/blogs" className="text-gray-600 hover:text-gray-900">
                        Blogs
                      </Link>
                    </div>
                  </li>
                  { blogTagName ? <li>
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <Link to={`/blogs?tag=${blogTagName}`} className="text-gray-600 hover:text-gray-900">
                        {blogTagName}
                      </Link>
                    </div>
                  </li> : <></>}
                </ol>
              </nav>
            </div> : <></> }
            { !blogTagName ? <>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-red-500 leading-tight tracking-tight mb-6">
            <span className="text-yellow-500">Marriage </span>Insights & <span className="text-yellow-500">Inspiration</span>
            </h1>
            <p className="text-2xl text-pink-600 max-w-4xl mx-auto">
            Planning a wedding is more complex than it used to be! We want to inspire you with great ideas for a perfect wedding day. Take a look around the site and see everything we offer.
            </p></> : <></>}
            { blogTagName ? <h2 className="text-left text-3xl font-bold text-gray-800 mb-4">Blogs tagged with <span className="text-[#f20574]">{blogTagName}</span></h2> : <></>}
          </motion.div>
        </div>

        {/* Wave SVG Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path fill="#ffffff" fillOpacity="1" d="M0,128L80,112C160,96,320,64,480,64C640,64,800,96,960,106.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Category Navigation */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 mb-12">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2 justify-center">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1); // Reset to first page when category changes
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all text-sm whitespace-nowrap transform hover:-translate-y-1 ${
                activeCategory === category
                  ? 'bg-[#f20574] text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow hover:shadow-md'
              }`}
            >
              {category === 'All' ? 'All Posts' : category}
            </button>
          ))}
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured/Hero Blog Post - Only show on first page */}
        {currentPage === 1 && currentBlogs[0] && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="mb-8 sm:mb-12 md:mb-16 lg:mb-20"
  >
    <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl group">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-90 z-10"></div>
      <img
        src={currentBlogs[0].coverImage}
        alt={currentBlogs[0].title}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transition duration-700 group-hover:scale-105"
        onError={(e) => {
          e.target.src = 'https://via.placehold.co/600x300';
        }}
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-10 lg:p-14">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
          <span className="bg-gradient-to-r from-[#f20574] to-pink-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-wider shadow-lg">
            Featured
          </span>
          <span className="text-gray-200 text-xs sm:text-sm bg-black bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            {formatDate(currentBlogs[0].date)}
          </span>
          <span className="text-gray-200 text-xs sm:text-sm bg-black bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {currentBlogs[0].readTime}
          </span>
          <span className="text-gray-200 text-xs sm:text-sm bg-black bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center">
            < IoEyeOutline className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {currentBlogs[0].viewCount || 0} views
          </span>

        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight drop-shadow-lg">
          {currentBlogs[0].title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mb-4 sm:mb-6 md:mb-8 line-clamp-2 sm:line-clamp-3">
          {currentBlogs[0].excerpt}
        </p>

        <Link
          to={`/blogs/${currentBlogs[0].urlTitle}`}
          className="group inline-flex items-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full bg-white text-[#f20574] font-bold text-sm sm:text-base md:text-lg transition-all hover:bg-[#f20574] hover:text-white hover:shadow-xl transform hover:-translate-y-1 self-start"
        >
          Read Full Article
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  </motion.div>
)}

        {/* Blog Grid - Show all current blogs (excluding hero if on first page) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="h-1 w-10 bg-[#f20574] mr-3"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                {currentPage === 1 ? 'Latest Articles' : 'More Articles'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {currentBlogs.slice(currentPage === 1 ? 1 : 0).map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full"
              >
                <div className="relative overflow-hidden rounded-xl h-52 mb-4 group-hover:shadow-xl transition-all">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placehold.co/600x300';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-all"></div>
                </div>

                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-500">{formatDate(blog.date)}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {blog.readTime}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <IoEyeOutline className="h-3.5 w-3.5 mr-1" />
                    {blog.viewCount || 0} views
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#f20574] transition duration-300">
                  <Link to={`/blogs/${blog.urlTitle}`}>
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.hashtags.slice(0, 2).map(tag => (
                      <Link to={`/blogs?tag=${tag.tagName}`}>
                        <span
                          key={tag.id}
                          className="text-xs bg-pink-50 text-[#f20574] px-3 py-1 rounded-full hover:bg-pink-100 transition duration-300"
                        >
                          #{tag.tagName}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to={`/blogs/${blog.urlTitle}`}
                    className="text-[#f20574] font-semibold inline-flex items-center group-hover:underline"
                  >
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-12">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.ceil(data.totalCount / blogsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === index + 1 
                    ? 'bg-[#f20574] text-white border-[#f20574]' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(data.totalCount / blogsPerPage)))}
              disabled={currentPage === Math.ceil(data.totalCount / blogsPerPage)}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === Math.ceil(data.totalCount / blogsPerPage) 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-20 mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-[#f20574] shadow-xl">
            <div className="absolute right-0 bottom-0 opacity-20">
              <svg width="400" height="280" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" d="M42.7,-73.4C55.9,-67.7,67.7,-58.2,76.8,-45.6C86,-33,92.5,-16.5,92.1,-0.2C91.7,16,84.3,32.1,73.7,44.4C63.1,56.8,49.2,65.5,35,71.3C20.8,77.2,6.3,80.1,-9.8,80C-25.9,79.9,-51.7,76.8,-65.2,64.2C-78.7,51.7,-80,29.9,-79.2,9.6C-78.5,-10.7,-75.8,-30.4,-66.6,-45.9C-57.3,-61.3,-41.6,-72.4,-25.8,-76.6C-10,-80.7,5.8,-77.8,19.9,-73.8C34,-69.8,66.8,-78.4,65.4,-75.9C64.1,-73.4,29.6,-79,42.7,-73.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Stay Inspired</h3>
                <p className="text-pink-100 max-w-md">
                  Get the latest articles, resources, and insights delivered straight to your inbox.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-6 py-3 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 w-full md:w-64"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-[#f20574] font-semibold rounded-full hover:bg-pink-50 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Hiding Scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
      <Footer/>
    </div>
  );
};

export default BlogList;