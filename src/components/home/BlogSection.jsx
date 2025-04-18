import React from "react";
import { useGetBlogsQuery } from "../../redux/blogSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogSection = () => {
  const { data, error, isLoading } = useGetBlogsQuery();

  console.log(data);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="mb-12 px-4 md:px-16 md:mt-40">
        <div className="md:px-16 text-start md:text-center">
          <h1 className="text-2xl md:text-4xl font-bold capitalize">Blogs</h1>
          <p className="text-lg mb-5">
            Discover heartwarming love stories, wedding planning tips, and the
            latest trends to make your special day unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 px-4 md:px-16 bg-slate-100 rounded-2xl py-4 md:py-16 mt-10">
          {data?.data.slice(0, 6).map((blog, index) => (
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
                    e.target.src = "https://via.placehold.co/600x300";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-all"></div>
              </div>

              <div className="flex items-center mb-3">
                <span className="text-sm text-gray-500">
                  {formatDate(blog?.createdAt)}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500 flex items-center">
                <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-3.5 w-3.5 mr-1 text-gray-500"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
</svg>


                  {blog.viewCount}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#f20574] transition duration-300">
                <Link to={`/blogs/${blog.urlTitle}`}>{blog.title}</Link>
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>

              <div className="mt-auto">
                <Link
                  to={`/blogs/${blog.urlTitle}`}
                  className="text-[#f20574] font-semibold inline-flex items-center group-hover:underline"
                >
                  Read Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogSection;
