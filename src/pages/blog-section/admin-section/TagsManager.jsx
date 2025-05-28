import React, { useState, useEffect } from 'react';
import { FiTag, FiEdit2, FiTrash2, FiPlus, FiCheck, FiX, FiAlertCircle, FiSearch, FiBarChart } from 'react-icons/fi';
import { useGetAllTagsQuery, useAddTagMutation, useUpdateTagMutation, useDeleteTagMutation } from '../../../redux/blogSlice';
import { toast } from 'react-toastify';
import './TagStyles.css';
import TagAnalytics from './TagAnalytics';
import { getTagColorClass } from './TagUtils';

function TagsManager() {  // States for tag management
  const [newTagName, setNewTagName] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editTagName, setEditTagName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingTagId, setDeletingTagId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tagStats, setTagStats] = useState([]);
  const [visibleTags, setVisibleTags] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'tagName', direction: 'asc' });
  const [activeTab, setActiveTab] = useState('manage'); // 'manage', 'analytics'

  // API hooks
  const { data: tagsData, isLoading: tagsLoading, refetch: refetchTags } = useGetAllTagsQuery();
  const [addTag, { isLoading: isAddingTagInProgress }] = useAddTagMutation();
  const [updateTag, { isLoading: isUpdatingTag }] = useUpdateTagMutation();
  const [deleteTag, { isLoading: isDeletingTag }] = useDeleteTagMutation();

  // Load and process tags data
  useEffect(() => {
    if (tagsData?.success && tagsData?.data) {
      const processedTags = tagsData.data.map(tag => ({
        ...tag,
        blogCount: tag.blogCount || 0
      }));
      
      setTagStats(processedTags);
      
      // Apply sorting and filtering
      let filteredTags = [...processedTags];
      
      // Apply search filter
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredTags = filteredTags.filter(tag => 
          tag.tagName.toLowerCase().includes(lowerSearchTerm)
        );
      }
      
      // Apply sorting
      filteredTags.sort((a, b) => {
        if (sortConfig.key === 'tagName') {
          return sortConfig.direction === 'asc' 
            ? a.tagName.localeCompare(b.tagName)
            : b.tagName.localeCompare(a.tagName);
        } else if (sortConfig.key === 'blogCount') {
          return sortConfig.direction === 'asc'
            ? a.blogCount - b.blogCount
            : b.blogCount - a.blogCount;
        }
        return 0;
      });
      
      setVisibleTags(filteredTags);
    }
  }, [tagsData, searchTerm, sortConfig]);

  // Sort function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Add new tag
  const handleAddTag = async () => {
    if (!newTagName.trim()) {
      toast.error('Tag name cannot be empty');
      return;
    }
    
    try {
      const response = await addTag({ tagName: newTagName.trim() }).unwrap();
      if (response.success) {
        toast.success('Tag added successfully');
        setNewTagName('');
        setIsAddingTag(false);
        refetchTags();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add tag');
    }
  };

  // Start editing a tag
  const handleEditStart = (tag) => {
    setEditingTagId(tag.id);
    setEditTagName(tag.tagName);
  };

  // Cancel tag editing
  const handleEditCancel = () => {
    setEditingTagId(null);
    setEditTagName('');
  };

  // Update tag
  const handleUpdateTag = async (id) => {
    if (!editTagName.trim()) {
      toast.error('Tag name cannot be empty');
      return;
    }
    
    try {
      const response = await updateTag({ 
        id, 
        body: { tagName: editTagName.trim() } 
      }).unwrap();
      
      if (response.success) {
        toast.success('Tag updated successfully');
        setEditingTagId(null);
        refetchTags();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update tag');
    }
  };

  // Prepare tag deletion
  const handleDeleteStart = (id) => {
    setDeletingTagId(id);
    setShowDeleteConfirm(true);
  };

  // Cancel tag deletion
  const handleDeleteCancel = () => {
    setDeletingTagId(null);
    setShowDeleteConfirm(false);
  };

  // Confirm and execute tag deletion
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteTag({ id: deletingTagId }).unwrap();
      if (response.success) {
        toast.success('Tag deleted successfully');
        setShowDeleteConfirm(false);
        setDeletingTagId(null);
        refetchTags();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete tag');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Tags Management</h2>
          
          {/* Tab Navigation */}
          <div className="mt-4 md:mt-0 flex">
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 font-medium rounded-l-md transition-colors ${
                activeTab === 'manage' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manage Tags
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 font-medium rounded-r-md transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tag Analytics
            </button>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {!isAddingTag ? (
              <button
                onClick={() => setIsAddingTag(true)}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                Add New Tag
              </button>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Tag name"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="border border-gray-300 rounded-l-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <button
                  onClick={handleAddTag}
                  disabled={isAddingTagInProgress}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-tr-md rounded-br-md"
                >
                  <FiCheck />
                </button>
                <button
                  onClick={() => setIsAddingTag(false)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md ml-1"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>
        </div>
          {/* Tag Stats & Visualization */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Tag Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-600 mb-2">Total Tags</h4>
              <div className="text-3xl font-bold text-indigo-600">
                {tagsLoading ? '...' : tagStats.length}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-600 mb-2">Most Used Tag</h4>
              {tagsLoading ? (
                <div>Loading...</div>
              ) : tagStats.length > 0 ? (
                <div>
                  <div className="text-xl font-semibold text-indigo-600">
                    {[...tagStats].sort((a, b) => b.blogCount - a.blogCount)[0]?.tagName || 'None'}
                  </div>
                  <span className="text-sm text-gray-500">
                    Used in {[...tagStats].sort((a, b) => b.blogCount - a.blogCount)[0]?.blogCount || 0} posts
                  </span>
                </div>
              ) : (
                <div className="text-gray-500">No tags available</div>
              )}
            </div>
          </div>
          
          {/* Tag Cloud Visualization */}
          {!tagsLoading && tagStats.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-600 mb-2">Tag Cloud</h4>
              <div className="tag-cloud">
                {tagStats.map(tag => {
                  // Calculate size based on usage (between 0.8 and 1.8)
                  const maxCount = Math.max(...tagStats.map(t => t.blogCount), 1);
                  const size = 0.8 + (tag.blogCount / maxCount) * 1;
                  
                  return (
                    <div 
                      key={tag.id}
                      className="tag-cloud-tag"
                      style={{ 
                        fontSize: `${size}rem`,
                        opacity: 0.5 + (tag.blogCount / maxCount) * 0.5
                      }}
                    >
                      <FiTag className="mr-1" />
                      {tag.tagName}
                      <span className="ml-1 text-xs text-indigo-600">({tag.blogCount})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Tags Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => requestSort('tagName')}
                  >
                    Tag Name
                    {sortConfig.key === 'tagName' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => requestSort('blogCount')}
                  >
                    Usage Count
                    {sortConfig.key === 'blogCount' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tagsLoading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                    <span className="ml-2">Loading tags...</span>
                  </td>
                </tr>
              ) : visibleTags.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No tags matching your search' : 'No tags available yet'}
                  </td>
                </tr>
              ) : (
                visibleTags.map(tag => (
                  <tr key={tag.id} className="hover:bg-gray-50">                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingTagId === tag.id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editTagName}
                            onChange={(e) => setEditTagName(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleUpdateTag(tag.id)}
                          />
                          <button
                            onClick={() => handleUpdateTag(tag.id)}
                            disabled={isUpdatingTag}
                            className="text-green-600 hover:text-green-800 p-1"
                          >
                            <FiCheck />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="text-red-600 hover:text-red-800 p-1 ml-1"
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <FiTag className="text-indigo-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900 tag-badge">{tag.tagName}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${tag.blogCount > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            {tag.blogCount}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {tag.blogCount === 1 ? 'post' : 'posts'}
                          </span>
                        </div>
                        
                        {/* Usage bar visualization */}
                        {tagStats.length > 0 && (
                          <div className="tag-usage-bar mt-1 w-32">
                            <div 
                              className="tag-usage-bar-fill" 
                              style={{ 
                                width: `${Math.max(5, (tag.blogCount / Math.max(...tagStats.map(t => t.blogCount), 1)) * 100)}%` 
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {editingTagId !== tag.id && (
                        <>
                          <button
                            onClick={() => handleEditStart(tag)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteStart(tag.id)}
                            className={`text-red-600 hover:text-red-900 p-1 ${tag.blogCount > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={tag.blogCount > 0}
                            title={tag.blogCount > 0 ? 'Cannot delete tag used in posts' : 'Delete tag'}
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Usage Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Tag Usage Guidelines</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tags help categorize blog posts and improve searchability</li>
                  <li>Use concise, descriptive tags</li>
                  <li>Tags used in blog posts cannot be deleted until removed from all posts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Tag</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this tag? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeletingTag}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                {isDeletingTag && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TagsManager;
