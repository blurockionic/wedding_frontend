import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaRegComment, FaRegHeart, FaHeart, FaShare, FaWhatsapp, FaInstagram, FaFacebook, FaLink, FaLock } from 'react-icons/fa';
import { useAddCommentMutation, useDeleteCommentMutation, useToggleLikeBlogMutation, useGetBlogByUrlTitleQuery } from "../../../redux/blogSlice";

const Blog = ({ currentUser }) => {
  // Get the blog ID from URL parameters
  const { urlTitle: blogUrlTitle } = useParams();

  // Fetch blog data using RTK Query
  const { data: blogData, isLoading, error } = useGetBlogByUrlTitleQuery(blogUrlTitle);

  // RTK Query mutations
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [toggleLike] = useToggleLikeBlogMutation();

  // Local state
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [liked, setLiked] = useState(false);

  // Check if user is signed in
  const isSignedIn = !!currentUser;

  // Update liked state when blog data changes
  useEffect(() => {
    if (blogData && currentUser) {
      // Logic to check if user has liked the blog
      const userHasLiked = blogData.data.likes && 
        Array.isArray(blogData.data.likes) && 
        blogData.data.likes.includes(currentUser.urlTitle);
      setLiked(userHasLiked);
    }
  }, [blogData, currentUser]);

  const handleLike = async () => {
    if (!isSignedIn) {
      alert('Please sign in to like this post');
      return;
    }

    try {
      await toggleLike({ blogUrlTitle, userUrlTitle: currentUser.urlTitle });
      setLiked(!liked);
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert('Please sign in to comment');
      return;
    }

    if (newComment.trim()) {
      try {
        await addComment({
          blogUrlTitle,
          userUrlTitle: currentUser.urlTitle,
          content: newComment
        });
        setNewComment('');
      } catch (err) {
        console.error('Failed to add comment:', err);
      }
    }
  };

  const handleDeleteComment = async (commentUrlTitle) => {
    try {
      await deleteComment({ commentUrlTitle, blogUrlTitle });
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShowShareOptions(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading blog...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading blog</div>;
  if (!blogData) return <div className="text-center py-10">Blog not found</div>;

  const { title, content, tags, comments = [], likes = 0, createdAt, authorUrlTitle } = blogData.data;

  return (
    <div className="flex-grow px-6 py-4 overflow-y-auto relative">
      <div className="max-w-4xl mx-auto">
        {/* View All Blogs Button - SIMPLE PINK STYLING ON LEFT */}
        <div className="mb-6 text-left">
          <Link to="/blogs" className="inline-block px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200">
            View All Blogs
          </Link>
        </div>

        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        {/* Creation Date */}
        <div className="text-gray-500 mb-4">
          Published on {formatDate(createdAt)}
        </div>

        {/* Hashtags */}
        {tags && tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/blogs?tag=${tag}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-[#f20574] hover:underline"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog Content - Render HTML content with tailwindcss prose */}
        <div className="mb-8">
          {/* The prose class applies typography styles to rendered HTML content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-pink-500 prose-blockquote:bg-pink-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-img:rounded-md prose-img:mx-auto prose-pre:bg-gray-800 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Like and Comment Section */}
        <div className="border-t border-b py-4 mb-6">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isSignedIn ? "text-gray-700 hover:text-pink-500" : "text-gray-400"} focus:outline-none`}
              title={isSignedIn ? "Like this post" : "Sign in to like this post"}
            >
              {isSignedIn ? (
                liked ? <FaHeart className="text-pink-500" size={20} /> : <FaRegHeart size={20} />
              ) : (
                <div className="flex items-center">
                  <FaRegHeart size={20} />
                </div>
              )}
              <span>{typeof likes === 'number' ? likes : (Array.isArray(likes) ? likes.length : 0)}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              <FaRegComment size={20} />
              <span>{comments.length || ''}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            {/* Comment Form */}
            {isSignedIn ? (
              <form onSubmit={handleAddComment} className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
                  >
                    Post
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-gray-50 border rounded-md p-4 mb-6 text-center">
                <FaLock className="inline-block mr-2" />
                <span>Please <a href="/login" className="text-blue-500 font-medium hover:underline">sign in</a> to comment on this post</span>
              </div>
            )}

            {/* Comment List */}
            <div className="space-y-4">
              {comments && comments.map(comment => (
                <div key={comment.urlTitle} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold">{comment.author?.name || 'Anonymous'}</p>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-500 mr-2">{formatDate(comment.createdAt)}</p>
                      {currentUser && comment.authorUrlTitle === currentUser.urlTitle && (
                        <button
                          onClick={() => handleDeleteComment(comment.urlTitle)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
              {(!comments || comments.length === 0) && (
                <p className="text-gray-500">No comments yet. {isSignedIn ? "Be the first to comment!" : "Sign in to comment."}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Share Button */}
      <div className="fixed bottom-8 right-8">
        <div className="relative">
          {showShareOptions && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 flex flex-col gap-3">
              <button
                onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`); }}
                className="flex items-center space-x-2 hover:text-green-600"
              >
                <FaWhatsapp size={20} className="text-green-600" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => { alert('Share on Instagram'); }}
                className="flex items-center space-x-2 hover:text-pink-600"
              >
                <FaInstagram size={20} className="text-pink-600" />
                <span>Instagram</span>
              </button>
              <button
                onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`); }}
                className="flex items-center space-x-2 hover:text-blue-600"
              >
                <FaFacebook size={20} className="text-blue-600" />
                <span>Facebook</span>
              </button>
              <button
                onClick={copyLinkToClipboard}
                className="flex items-center space-x-2 hover:text-purple-600"
              >
                <FaLink size={20} className="text-purple-600" />
                <span>Copy Link</span>
              </button>
            </div>
          )}
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg focus:outline-none"
          >
            <FaShare size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;