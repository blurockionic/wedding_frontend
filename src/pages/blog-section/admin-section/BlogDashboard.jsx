import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { FiPlus, FiTrash2, FiEdit, FiSearch, FiBarChart, FiUsers, FiSettings, FiHome, FiFolder, FiTag, FiCalendar, FiEye, FiClock, FiFilter, FiCheck, FiX } from 'react-icons/fi';

function BlogDashboard() {
  const navigate = useNavigate();
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
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.', date: '2023-10-01', category: 'Technology', status: 'published', views: 1250, author: 'rohitRanjanGIT' },
    { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.', date: '2023-10-05', category: 'Lifestyle', status: 'published', views: 850, author: 'rohitRanjanGIT' },
    { id: 3, title: 'Third Blog Post', content: 'This is the content of the third blog post.', date: '2023-10-10', category: 'Travel', status: 'draft', views: 0, author: 'rohitRanjanGIT' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('posts');
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Technology',
    status: 'draft'
  });

  // Categories with counts
  const categories = [
    { name: 'All', count: blogPosts.length },
    { name: 'Technology', count: blogPosts.filter(post => post.category === 'Technology').length },
    { name: 'Lifestyle', count: blogPosts.filter(post => post.category === 'Lifestyle').length },
    { name: 'Travel', count: blogPosts.filter(post => post.category === 'Travel').length },
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
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      category: post.category,
      status: post.status
    });
    setShowAddModal(true);
  };

  const handleDeleteConfirm = () => {
    setBlogPosts(blogPosts.filter(post => post.id !== deletingPostId));
    setShowDeleteModal(false);
    setDeletingPostId(null);
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
        author: currentUser
      }]);
    }
    setShowAddModal(false);
    setEditingPost(null);
    setNewPost({
      title: '',
      content: '',
      category: 'Technology',
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

  // Admin dashboard stats
  const totalPosts = blogPosts.length;
  const publishedPosts = blogPosts.filter(post => post.status === 'published').length;
  const draftPosts = blogPosts.filter(post => post.status === 'draft').length;
  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);

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
              <div
                onClick={() => setActiveTab('comments')}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer ${activeTab === 'comments' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <FiUsers className="mr-3 h-5 w-5" />
                Comments
              </div>
              <div
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer ${activeTab === 'analytics' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <FiBarChart className="mr-3 h-5 w-5" />
                Analytics
              </div>
              <div
                onClick={() => setActiveTab('settings')}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer ${activeTab === 'settings' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <FiSettings className="mr-3 h-5 w-5" />
                Settings
              </div>
            </nav>

          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 h-[90vh] ">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm uppercase text-gray-500 font-medium">Total Posts</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{totalPosts}</p>
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
                  <p className="text-3xl font-bold text-indigo-600 mt-2">{totalViews}</p>
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
                        <p className="text-sm text-gray-600">{post.category} • {post.status}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-800">Manage Posts</h2>

              {/* Filters and Sorting */}
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
                  </select>
                </div>
                <div className="flex items-center space-x-4">
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
                  {filteredPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">{post.title}</h4>
                        <p className="text-sm text-gray-600">{post.category} • {post.status}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-800">Manage Comments</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-600">No comments available.</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-800">Analytics</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-600">Analytics data will be displayed here.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-600">Settings options will be displayed here.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BlogDashboard;