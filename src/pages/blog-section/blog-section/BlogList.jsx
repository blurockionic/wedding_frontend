import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBlogsQuery } from "../../../redux/blogSlice.js";

const BlogList = () => {
  const { data, error, isLoading } = useGetBlogsQuery();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (data && data.success) {
      console.log(data);
      const transformedBlogs = data.data.map(blog => ({
        id: blog.id,
        title: blog.title,
        urlTitle: blog.urlTitle,
        coverImage: blog.coverImage || 'https://via.placehold.co/600x300',
        date: blog.createdAt,
        hashtags: blog.tags,
        // readTime: `${Math.ceil(blog.content.length / 500)} min read`
      }));
      setBlogs(transformedBlogs);
    }
  }, [data]);

  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  const heroBlog = sortedBlogs[0];
  const otherBlogs = sortedBlogs.slice(1);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error loading blogs: {error.message}</div>;
  }

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
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
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                  {heroBlog.title}
                </h2>

                <Link 
                  to={`/blogs/${heroBlog.urlTitle}`} // Dynamic link to the blog post
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
          {otherBlogs.map(blog => (
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
                  <span className="text-sm text-gray-500">{formatDate(blog.date)}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[#f20574] transition duration-300">
                  <Link to={`/blogs/${blog.urlTitle}`}> {/* Dynamic link to the blog post */}
                    {blog.title}
                  </Link>
                </h3>

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
                    to={`/blogs/${blog.urlTitle}`} // Dynamic link to the blog post
                    className="text-[#f20574] font-medium inline-flex items-center hover:text-[#d30062] transition duration-300"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
