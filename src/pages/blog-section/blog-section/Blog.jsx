import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaRegComment, FaRegHeart, FaHeart, FaShare, FaWhatsapp, FaInstagram, FaFacebook, FaLink, FaLock, FaUser, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 
{ useAddCommentMutation, 
  useDeleteCommentMutation, 
  useToggleLikeBlogMutation, 
  useGetBlogByUrlTitleQuery,
  useGetRelatedBlogsByIdQuery,
} from "../../../redux/blogSlice";
import { useSelector } from "react-redux";
import Footer from '../../Footer';
// Import Quill styles to ensure proper formatting
import 'react-quill/dist/quill.snow.css';

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
  const [carouselIndex, setCarouselIndex] = useState(0);

  const currentUser = useSelector((state) => state.auth.user);
  const isSignedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setLikes(blogData?.data.likes || 0);
    setComments(blogData?.data.comments || []);

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
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const moveCarousel = (direction) => {
    if (direction === 'next') {
      setCarouselIndex((prevIndex) => 
        prevIndex + 3 >= relatedPosts.length ? 0 : prevIndex + 3
      );
    } else {
      setCarouselIndex((prevIndex) => 
        prevIndex - 3 < 0 ? Math.max(0, relatedPosts.length - 3) : prevIndex - 3
      );
    }
  };

  // Only fetch related posts when a valid blog ID exists.
  const { data: relatedPosts = [], isLoading: relatedIsLoading, error: relatedError } = 
    useGetRelatedBlogsByIdQuery(blogData?.data?.id, { skip: !blogData?.data?.id });

  const visiblePosts = relatedPosts?.data?.slice(carouselIndex, carouselIndex + 3) || [];

  if (isLoading) return <div className="text-center py-10">Loading blog...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading blog</div>;
  if (!blogData) return <div className="text-center py-10">Blog not found</div>;

  const { title, content, tags = [], createdAt, coverImage } = blogData.data;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
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
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500 truncate max-w-xs">{title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              {/* Cover Image */}
              {coverImage && (
                <div className="mb-6">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-auto object-cover max-h-96"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Blog Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

                {/* Date and Author with Icons */}
                <div className="flex items-center text-gray-600 mb-6 text-sm">
                  <div className="flex items-center mr-4">
                    <FaUser className="mr-2 text-gray-500" />
                    <span>marraigevendors.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">|</span>
                    <span>{formatDate(createdAt)}</span>
                  </div>
                  <div className="ml-auto flex items-center" 
                  onClick={() => {
                    const likeCommentSection = document.querySelector('#back-to-blogs');
                    if (likeCommentSection) {
                      const offset = likeCommentSection.getBoundingClientRect().top - window.innerHeight + likeCommentSection.offsetHeight + 20;
                      window.scrollBy({ top: offset, behavior: 'smooth' });
                    }
                    }}>
                    <FaRegHeart className="mr-1 text-gray-500" />
                    <span className="mr-3">{likes || 0}</span>
                    <FaRegComment className="mr-1 text-gray-500" />
                    <span>{comments.length || 0}</span>
                  </div>
                </div>

                {/* Hashtags */}
                {tags && tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag.id}
                          to={`/blogs?tag=${tag.tagName}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          #{tag.tagName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Content */}
                <div className="mb-8 prose prose-slate max-w-none">
                  <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {/* Like and Comment Buttons */}
                <div className="border-t border-b py-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 ${isSignedIn ? "hover:text-red-500" : "text-gray-400"} focus:outline-none`}
                        title={isSignedIn ? "Like this post" : "Sign in to like this post"}
                      >
                        {isSignedIn ? (
                          liked ? <FaHeart className="text-red-500" size={20} /> : <FaRegHeart size={20} />
                        ) : (
                          <FaRegHeart size={20} />
                        )}
                        <span>{likes || 0} Likes</span>
                      </button>

                      <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 focus:outline-none"
                      >
                        <FaRegComment size={20} />
                        <span>{comments.length || 0} Comments</span>
                      </button>
                    </div>

                    {/* Share Button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-green-500 focus:outline-none"
                      >
                        <FaShare size={18} />
                        <span>Share</span>
                      </button>

                      {showShareOptions && (
                        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-3 z-10 w-40">
                          <button
                            onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`); }}
                            className="flex items-center space-x-2 hover:text-green-600 w-full text-left py-2"
                          >
                            <FaWhatsapp size={16} className="text-green-600" />
                            <span>WhatsApp</span>
                          </button>
                          <button
                            onClick={() => { alert('Share on Instagram'); }}
                            className="flex items-center space-x-2 hover:text-pink-600 w-full text-left py-2"
                          >
                            <FaInstagram size={16} className="text-pink-600" />
                            <span>Instagram</span>
                          </button>
                          <button
                            onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`); }}
                            className="flex items-center space-x-2 hover:text-blue-600 w-full text-left py-2"
                          >
                            <FaFacebook size={16} className="text-blue-600" />
                            <span>Facebook</span>
                          </button>
                          <button
                            onClick={copyLinkToClipboard}
                            className="flex items-center space-x-2 hover:text-purple-600 w-full text-left py-2"
                          >
                            <FaLink size={16} className="text-purple-600" />
                            <span>Copy Link</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments ({comments.length})</h3>

                    {/* Comment Form */}
                    {isSignedIn ? (
                      <form onSubmit={handleAddComment} className="mb-6">
                        <div className="flex flex-col">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Join the discussion..."
                            className="w-full p-3 border rounded min-h-[100px] focus:outline-none focus:ring-1 focus:ring-gray-400 resize-y"
                            rows={4}
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              type="submit"
                              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none transition-all duration-200"
                              disabled={isCommentLoading}
                            >
                              {isCommentLoading ? "Posting..." : "Post Comment"}
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-gray-50 border rounded p-4 mb-6 text-center">
                        <FaLock className="inline-block mr-2" />
                        <span>Please <Link to="/login" className="text-blue-600 font-medium hover:underline">sign in</Link> to comment on this post</span>
                      </div>
                    )}

                    {/* Comment List */}
                    <div className="space-y-4">
                      {isCommentLoading && !comments.length && <p className="text-gray-500">Loading comments...</p>}
                      {comments && comments.length > 0 ? (
                        comments.map(comment => (
                          <div key={comment.id} className="border-b pb-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                  {comment.author?.profile_photo ? (
                                    <img src={comment.author.profile_photo} alt={comment.author?.user_name} className="w-full h-full object-cover rounded-full" />
                                  ) : (
                                    <FaUser className="text-gray-400" size={16} />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">{comment.author?.user_name || 'Anonymous'}</p>
                                  <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                                </div>
                              </div>
                              {currentUser && (comment.authorId === currentUser.id || currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN') && (
                                <button
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-xs text-red-500 hover:text-red-700"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                            <p className="pl-12 text-gray-700">{comment.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No comments yet. {isSignedIn ? "Be the first to comment!" : "Sign in to be part of the discussion."}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* About Author */}
            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">About the Author</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <FaUser className="text-gray-400" size={18} />
                </div>
                <div>
                  <h4 className="font-medium">Marriage Vendors</h4>
                  <p className="text-sm text-gray-600">Wedding Planning Experts</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Marriage Vendors brings you the latest trends, tips, and insights about wedding planning and organization.
              </p>
            </div>

            {/* Popular Tags */}
            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/blogs?tag=wedding" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  #wedding
                </Link>
                <Link to="/blogs?tag=planning" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  #planning
                </Link>
                <Link to="/blogs?tag=venue" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  #venue
                </Link>
                <Link to="/blogs?tag=budget" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  #budget
                </Link>
                <Link to="/blogs?tag=dresses" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  #dresses
                </Link>
                <Link to="/blogs?tag=photography" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  #photography
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">Get the latest wedding tips and trends delivered to your inbox.</p>
              <form className="flex flex-col">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button 
                  type="submit" 
                  className="bg-gray-800 text-white rounded py-2 hover:bg-gray-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Related Posts Carousel */}
        <div className="mt-12 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Related Articles</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => moveCarousel('prev')}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
                aria-label="Previous posts"
              >
                <FaChevronLeft size={16} />
              </button>
              <button 
                onClick={() => moveCarousel('next')}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
                aria-label="Next posts"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visiblePosts.map(post => (
              <div key={post.id} className="bg-white shadow-sm rounded-lg overflow-hidden group">
                <Link to={`/blogs/${post.urlTitle}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.coverImage || 'https://placehold.co/600x300?text=CoverImage'} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x300';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2">
                      {formatDate(post.updatedAt)} • {`${Math.ceil(post.content.replace(/<[^>]*>|&nbsp;|\u00A0/g, ' ').replace(/\s{2,}/g, ' ').trim().replace(/\s+\S*$/, '') + '...'?.length / 500) || 3} min read`}
                    </div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Back to blogs button */}
        <div className="mt-8 text-center" id='back-to-blogs'>
          <Link 
            to="/blogs" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" />
            Back to all blogs
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;