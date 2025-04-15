import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetBlogsQuery } from "../../../redux/blogSlice.js";
import Footer from "../../Footer";
import { GrFormNext, GrFormPrevious  } from "react-icons/gr";

const BlogList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const blogsPerPage = 10;
  
  // Get search params from URL if any
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const search = queryParams.get('search');
    
    if (page) setCurrentPage(parseInt(page));
    if (search) setSearchQuery(search);
  }, [location.search]);

  // Calculate skip value for backend pagination
  const skip = (currentPage - 1) * blogsPerPage;
  
  // Query with pagination parameters
  const { data, error, isLoading } = useGetBlogsQuery({
    s: skip,
    t: blogsPerPage,
    ...(searchQuery && { tag: searchQuery })
  });
  
  const [totalBlogs, setTotalBlogs] = useState(0);
  
  // Calculate total pages based on total blog count from backend
  useEffect(() => {
    if (data && data.success) {
      setTotalBlogs(data.totalCount || 0);
    }
  }, [data]);
  
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  
  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', pageNumber);
    navigate(`${location.pathname}?${queryParams.toString()}`);
    
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    if (searchQuery) {
      queryParams.set('search', searchQuery);
    } else {
      queryParams.delete('search');
    }
    queryParams.set('page', 1);
    navigate(`${location.pathname}?${queryParams.toString()}`);
    setCurrentPage(1);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Process blogs data after fetching
  const blogs = data?.data?.map(blog => ({
    id: blog.id,
    title: blog.title,
    urlTitle: blog.urlTitle,
    coverImage: blog.coverImage || 'https://via.placehold.co/600x300',
    date: blog.createdAt,
    hashtags: blog.tags,
    preview: blog.content.replace(/<[^>]*>|&nbsp;|\u00A0/g, ' ').substring(0, 150) + '...', // Add preview text
    readTime: `${Math.ceil((blog.content.length || 0) / 1000)} min read`,
    commentCount: blog._count?.comments || 0,
    likeCount: blog._count?.likedBy || 0,
    viewCount: blog.viewCount || 0,
  })) || [];
  
  // Get hero blog and other blogs
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const heroBlog = currentPage === 1 ? sortedBlogs[0] : null;
  const otherBlogs = currentPage === 1 ? sortedBlogs.slice(1) : sortedBlogs;

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error loading blogs: {error.message}</div>;
  }

  return (
    <div className="bg-gray-50">
      {/* Navigation and Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4 sm:mb-0">
            <Link to="/" className="hover:text-[#f20574]">Wedding</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-[#f20574]">Wedding ideas</Link>
          </nav>
          {/* <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Blogs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 block w-full sm:w-64"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <button type="submit" className="ml-2 bg-[#f20574] text-white px-5 py-2 rounded-lg hover:bg-[#d30062] transition-colors">
              Search
            </button>
          </form> */}
        </div>
      </div>

      {/* Main Heading */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Wedding ideas</h1>
        <p className="text-lg text-gray-600 mb-8">
          Planning a wedding is more complex than it used to be! We want to inspire you with great ideas for a perfect wedding day. Take a look around the site and see everything we offer.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Featured/Hero Blog Post */}
        {heroBlog && (
          <div className="mb-16 transform transition duration-500 hover:scale-[1.01]">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-90 z-10"></div>
              <img 
                src={heroBlog.coverImage} 
                alt={heroBlog.title} 
                className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-12">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-[#f20574] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="text-gray-200 text-sm">{formatDate(heroBlog.date)}</span>
                  <span className="text-gray-200 text-sm">• {heroBlog.readTime}</span>
                  <span className="text-gray-200 text-sm">• {heroBlog.viewCount} Views</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                  {heroBlog.title}
                </h2>

                <p className="text-gray-200 mb-6 line-clamp-2">
                  {heroBlog.preview.replace(/<[^>]*>/g, '')}
                </p>

                <Link 
                  to={`/blogs/${heroBlog.urlTitle}`}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-[#f20574] text-white font-medium text-lg transition-all hover:bg-[#d30062] hover:shadow-lg self-start"
                >
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Other Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherBlogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col h-full transform hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  {blog.readTime}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-500">{formatDate(blog.date)} </span>
                  <span className="text-sm text-gray-500">&nbsp;• {blog.viewCount} Views</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[#f20574] transition duration-300">
                  <Link to={`/blogs/${blog.urlTitle}`}>
                    {blog.title}
                  </Link>
                </h3>

                {/* Preview text added here */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.preview.replace(/<[^>]*>/g, '')}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.hashtags.map(tag => (
                      <span 
                        key={tag.id} 
                        className="text-xs bg-pink-50 text-[#f20574] px-3 py-1 rounded-full hover:bg-pink-100 transition duration-300"
                      >
                        #{tag.tagName}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/blogs/${blog.urlTitle}`}
                    className="text-[#f20574] font-medium inline-flex items-center hover:text-[#d30062] transition duration-300"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span className="sr-only">Previous</span>
                <GrFormPrevious />
              </button>
              
              {/* Page numbers - limit to 5 visible pages */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === pageNum
                      ? 'font-bold bg-[#f20574] text-pink-600 border-[#f20574]'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span className="sr-only">Next</span>
                <GrFormNext />
              </button>
            </nav>
            <div className="text-gray-500 ml-4 self-center text-sm">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
        
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No blogs found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                navigate('/blogs');
              }}
              className="mt-4 px-6 py-2 bg-[#f20574] text-white rounded-lg hover:bg-[#d30062]"
            >
              View All Blogs
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default BlogList;