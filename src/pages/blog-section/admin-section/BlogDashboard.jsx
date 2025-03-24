import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { FiPlus, FiTrash2, FiEdit, FiSearch, FiBarChart, FiUsers, FiSettings, FiHome, FiFolder, FiCalendar, FiEye, FiShare2, FiArchive, FiArrowUp } from 'react-icons/fi';
import { useGetViewCountQuery, useGetBlogCountQuery, useGetAllBlogsQuery, useDeleteBlogMutation } from '../../../redux/blogSlice';

function BlogDashboard() {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString());

  // Fetch blog and view counts using the hooks
  const { data: blogCountData, error: blogCountError, isLoading: blogCountLoading } = useGetBlogCountQuery();
  const { data: viewCountData, error: viewCountError, isLoading: viewCountLoading } = useGetViewCountQuery();
  const { data: allBlogsData, error: allBlogsError, isLoading: allBlogsLoading } = useGetAllBlogsQuery();
  const [deleteBlog, { isLoading: deleting, error: deleteError }] = useDeleteBlogMutation(); // Use deleteBlog mutation

  // Update the datetime every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      setCurrentDateTime(formattedDate);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sample blog post data
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    if (allBlogsData && allBlogsData.success) {
      setBlogPosts(allBlogsData.data.map(blog => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        status: 'published', // Assuming all fetched blogs are published
        date: new Date(blog.createdAt).toISOString().split('T')[0],
        views: blog.viewCount,
        author: 'admin' // Replace with actual user
      })));
    }
  }, [allBlogsData]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('dashboard'); // Set default tab to 'dashboard'
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    status: 'draft'
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7); // 8 blogs per page

  // Categories with counts
  const categories = [
    { count: blogPosts.length },
    { count: blogPosts.filter(post => post.status === 'published').length },
    { count: blogPosts.filter(post => post.status === 'draft').length },
  ];

  // Function to handle "Add Blog" button click
  const handleAddBlog = () => {
    navigate('/new-blog-post');
  };

  const handleDeleteClick = (id) => {
    setDeletingPostId(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (post) => {
    navigate(`/update-blog-post/${post.id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteBlog(deletingPostId);
      if (result.success) {
        // Remove the deleted post from the local state
        setBlogPosts(blogPosts.filter(post => post.id !== deletingPostId));
        setShowDeleteModal(false);
        setDeletingPostId(null);
      } else {
        alert('Error deleting blog post.');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Error deleting blog post.');
    }
  };

  const handleSavePost = () => {
    if (!newPost.title || !newPost.content) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingPost) {
      setBlogPosts(blogPosts.map(post =>
        post.id === editingPost.id
          ? { ...post, ...newPost, date: currentDateTime.split(' ')[0] }
          : post
      ));
    } else {
      const newId = Math.max(...blogPosts.map(post => post.id)) + 1;
      setBlogPosts([...blogPosts, {
        id: newId,
        ...newPost,
        date: currentDateTime.split(' ')[0],
        views: 0,
        author: 'admin' // Replace with actual user
      }]);
    }
    setShowAddModal(false);
    setEditingPost(null);
    setNewPost({
      title: '',
      content: '',
      status: 'draft'
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setBlogPosts(blogPosts.map(post =>
      post.id === id ? { ...post, status: newStatus } : post
    ));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleArchiveClick = (id, newStatus) => {
    setBlogPosts(blogPosts.map(post =>
      post.id === id ? { ...post, status: newStatus } : post
    ));
  };

  const handleShareClick = (post) => {
    const shareUrl = `${window.location.origin}/blogs/${post.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Blog URL copied to clipboard!');
  };

  const filteredPosts = blogPosts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
    .filter(post => statusFilter === 'All' || post.status === statusFilter.toLowerCase())
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'views') {
        return sortOrder === 'asc' ? a.views - b.views : b.views - a.views;
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  // Admin dashboard stats
  const totalPosts = blogCountData?.data?.blogCount || 0;
  const totalViews = viewCountData?.data?.totalViewCount || 0;
  const publishedPosts = blogPosts.filter(post => post.status === 'published').length;
  const draftPosts = blogPosts.filter(post => post.status === 'draft').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="px-4">
              <button
                onClick={handleAddBlog}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="mr-2" />
                New Post
              </button>
              <hr className="my-4" />
            </div>
            <nav className="mt-5 px-4 flex-1 space-y-1">
              <div
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <FiHome className="mr-3 h-5 w-5" />
                Dashboard
              </div>
              <div
                onClick={() => setActiveTab('posts')}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer ${activeTab === 'posts' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <FiFolder className="mr-3 h-5 w-5" />
                Posts
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 h-[90vh]">
        {activeTab === 'dashboard' && (
  <div className="space-y-8">
    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm uppercase text-gray-500 font-medium">Total Posts</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {blogCountLoading ? 'Loading...' : totalPosts}
        </p>
        <div className="flex items-center mt-4">
          <FiFolder className="text-indigo-500" />
          <span className="text-sm text-gray-600 ml-2">All blog posts</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm uppercase text-gray-500 font-medium">Published</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">{publishedPosts}</p>
        <div className="flex items-center mt-4">
          <FiCalendar className="text-green-500" />
          <span className="text-sm text-gray-600 ml-2">Live posts</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm uppercase text-gray-500 font-medium">Drafts</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">{draftPosts}</p>
        <div className="flex items-center mt-4">
          <FiEdit className="text-amber-500" />
          <span className="text-sm text-gray-600 ml-2">Unpublished posts</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm uppercase text-gray-500 font-medium">Total Views</h3>
        <p className="text-3xl font-bold text-indigo-600 mt-2">
          {viewCountLoading ? 'Loading...' : totalViews}
        </p>
        <div className="flex items-center mt-4">
          <FiEye className="text-indigo-500" />
          <span className="text-sm text-gray-600 ml-2">Total views across all posts</span>
        </div>
      </div>
    </div>

    {/* Recent Posts */}
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {blogPosts.slice(0, 5).map(post => (
          <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-lg font-medium text-gray-800">{post.title}</h4>
              <p className="text-sm text-gray-600">{post.status}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEditClick(post)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FiEdit className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteClick(post.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
              {/* Share Button */}
              <button
                onClick={() => handleShareClick(post)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FiShare2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

          {activeTab === 'posts' && (
            <div className="space-y-8">
              {/* <h2 className="text-2xl font-semibold text-gray-800">Manage Posts</h2> */}

              {/* Filters, Sorting, and Search Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    <FiCalendar className="mr-1" />
                    Sort by Date
                  </button>
                  <button
                    onClick={() => handleSort('views')}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    <FiEye className="mr-1" />
                    Sort by Views
                  </button>
                </div>
              </div>

              {/* Posts Table */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  {currentPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">{post.title}</h4>
                        <p className="text-sm text-gray-600">{post.status}</p>
                        <p className="text-sm text-gray-600">Views: {post.views} • Comments: {post.comments || 0}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEditClick(post)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(post.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleArchiveClick(post.id, post.status === 'archived' ? 'published' : 'archived')}
                          className={`text-yellow-600 hover:text-yellow-800 ${post.status === 'archived' ? 'text-green-600 hover:text-green-800' : ''}`}
                        >
                          {post.status === 'archived' ? <FiArrowUp className="h-5 w-5" /> : <FiArchive className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={() => handleShareClick(post)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiShare2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredPosts.length}
                paginate={paginate}
              />
            </div>
          )}
        </main>
      </div>
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDashboard;