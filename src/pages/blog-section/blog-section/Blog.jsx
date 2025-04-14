import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaRegComment, FaRegHeart, FaHeart, FaShare, FaWhatsapp, FaInstagram, FaFacebook, FaLink, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useAddCommentMutation, useDeleteCommentMutation, useToggleLikeBlogMutation, useGetBlogByUrlTitleQuery } from "../../../redux/blogSlice";
import { useSelector } from "react-redux";
import Footer from '../../Footer';

const Blog = () => {
  const { urlTitle: blogUrlTitle } = useParams();
  const { data: blogData, isLoading, error, refetch } = useGetBlogByUrlTitleQuery(blogUrlTitle);
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [toggleLike] = useToggleLikeBlogMutation();
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const isSignedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setLikes(blogData?.data.likes || 0);
    setComments(blogData?.data.comments || []);
    console.log(comments);
  }, [blogData]);

  useEffect(() => {
    if (blogData && currentUser) {
      const userHasLiked = blogData.data.likes && 
        blogData.data.likedBy.map(user => user.userId).includes(currentUser.id);
      setLiked(userHasLiked);
    }
  }, [blogData, currentUser]);

  const handleLike = async () => {
    if (!isSignedIn) {
      alert('Please sign in to like this post');
      return;
    }

    try {
      await toggleLike(blogData.data.id);
      if (liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
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
        setIsCommentLoading(true);
        await addComment({
          blogId: blogData.data.id,
          content: {content: newComment}
        });
        await refetch();
        setNewComment('');
        setIsCommentLoading(false);
      } catch (err) {
        console.error('Failed to add comment:', err);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setIsCommentLoading(true);
      await deleteComment(commentId);
      await refetch();
      setIsCommentLoading(false);
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
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    }).replace(/\//g, '.');
  };

  if (isLoading) return <div className="text-center py-10">Loading blog...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading blog</div>;
  if (!blogData) return <div className="text-center py-10">Blog not found</div>;

  const { title, content, tags = [], createdAt, authorUrlTitle, coverImage, author } = blogData.data;

  return (
    <div>
      <div className="flex-grow px-6 py-4 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto">
          {/* View All Blogs Button - top left */}
          <div className="mb-6">
            <Link 
              to="/blogs" 
              className="flex items-center text-pink-500 hover:text-pink-600 font-medium"
            >
              <FaArrowLeft className="mr-2" />
              <span>View All Blogs</span>
            </Link>
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl font-bold mb-2">{title}</h1>

          {/* Date and Author */}
          <div className="flex items-center text-gray-500 mb-6">
            <span className="mr-2">{formatDate(createdAt)}</span>
            <span className="mr-2">|</span>
            {/* <span>by {author?.name || 'Admin'}</span> */}
            <span>by marraigevendors.com</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Hashtags - pinkish style */}
          {tags && tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/blogs?tag=${tag.tagName}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                  >
                    #{tag.tagName}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cover Image */}
          {coverImage && (
            <div className="mb-1 rounded-lg overflow-hidden">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* View Count */}
          <div className="mb-8 text-gray-500 text-sm text-right">
            {blogData.data.viewCount || 0} views
          </div>

          {/* Blog Content */}
          <div className="mb-8">
            <div 
              className="prose prose-lg max-w-none"
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
                <span>{likes || 0}</span>
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
                  <div className="flex flex-col">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-3 border rounded-t min-h-[100px] focus:outline-none focus:ring-2 focus:ring-pink-300 resize-y"
                      rows={4}
                    />
                    <div className="flex justify-end bg-gray-50 border-x border-b rounded-b px-3 py-2">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-md hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow flex items-center justify-center"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 border rounded-md p-4 mb-6 text-center">
                  <FaLock className="inline-block mr-2" />
                  <span>Please <Link to="/login" className="text-blue-500 font-medium hover:underline">sign in</Link> to comment on this post</span>
                </div>
              )}

              {/* Comment List */}
              <div className="space-y-4">
                {isCommentLoading && <p className="text-gray-500">Loading comments...</p>}
                {comments && comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.id} className="border-b pb-3">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            {comment.author?.profile_photo? (
                              <img src={comment.author.profile_photo} alt={comment.author?.user_name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                              <FaUser className="text-gray-400" size={14} />
                            )}
                          </div>
                          <p className="font-semibold">{comment.author?.user_name || 'Anonymous'}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-2">{formatDate(comment.createdAt)}</p>
                          {currentUser && (comment.authorId === currentUser.id) ? (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          ) : currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN') && 
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Admin Delete
                            </button>
                          }
                        </div>
                      </div>
                      <p className="pl-10">{comment.content}</p>
                    </div>
                  ))
                ) : (
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
              className="bg-white text-pink-500 hover:text-pink-600 rounded-full p-3 shadow-lg focus:outline-none transition-all duration-200 hover:shadow-xl"
            >
              <FaShare size={18} />
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;