import React, { useState } from 'react';
import { FaRegComment, FaRegHeart, FaHeart, FaShare, FaWhatsapp, FaInstagram, FaFacebook, FaLink, FaLock } from 'react-icons/fa';

const Blog = ({ title, content, coverImagePreview, hashtags, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Check if user is signed in
  const isSignedIn = !!currentUser;

  const handleLike = () => {
    if (!isSignedIn) {
      alert('Please sign in to like this post');
      return;
    }
    
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert('Please sign in to comment');
      return;
    }
    
    if (newComment.trim()) {
      setComments([...comments, { 
        id: Date.now(), 
        text: newComment, 
        user: currentUser || 'Anonymous',
        timestamp: new Date().toISOString()
      }]);
      setNewComment('');
      setCommentCount(commentCount + 1);
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

  return (
    <div className="flex-grow px-6 py-4 overflow-y-auto relative">
      <div className="max-w-4xl mx-auto">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        {/* Cover Image */}
        {coverImagePreview && (
          <img
            src={coverImagePreview}
            alt="Cover"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Hashtags - Moved below cover image */}
        {hashtags.length > 0 && (
          <div className="mb-6">
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

        {/* Blog Content */}
        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: content }} />

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
                  {/* <FaLock size={10} className="ml-1" /> */}
                </div>
              )}
              <span>{likeCount || ''}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              <FaRegComment size={20} />
              <span>{commentCount || ''}</span>
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
              {comments.map(comment => (
                <div key={comment.id} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold">{comment.user}</p>
                    <p className="text-xs text-gray-500">{formatDate(comment.timestamp)}</p>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
              {comments.length === 0 && (
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