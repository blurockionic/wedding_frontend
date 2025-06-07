import React, { useState, useEffect } from 'react';
import { FiTag, FiEdit2, FiTrash2, FiPlus, FiCheck, FiX, FiAlertCircle, FiSearch, FiBarChart2, FiPieChart } from 'react-icons/fi';
import { useGetAllTagsQuery, useAddTagMutation, useUpdateTagMutation, useDeleteTagMutation } from '../../../redux/blogSlice';
import { toast } from 'react-toastify';
import './TagStyles.css';
import { getTagColorClass } from './TagUtils';

function EnhancedTagsManager() {
  // States for tag management
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
  const [viewMode, setViewMode] = useState('distribution'); // 'distribution' or 'list'

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

  // Calculate tag statistics
  const totalTags = tagStats.length;
  const totalUsage = tagStats.reduce((sum, tag) => sum + tag.blogCount, 0);
  const maxCount = Math.max(...tagStats.map(tag => tag.blogCount), 1);
  const mostUsedTags = [...tagStats].sort((a, b) => b.blogCount - a.blogCount).slice(0, 5);
  const unusedTags = tagStats.filter(tag => tag.blogCount === 0);

  // Group tags by usage
  const groupTagsByUsage = (tags) => {
    return {
      highUsage: tags.filter(tag => tag.blogCount >= 5),
      mediumUsage: tags.filter(tag => tag.blogCount >= 2 && tag.blogCount < 5),
      lowUsage: tags.filter(tag => tag.blogCount < 2)
    };
  };
  
  const groupedTags = groupTagsByUsage(tagStats);

  const renderAnalyticsTab = () => (
    <div className="space-y-6">      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-indigo-800 mb-1">Total Tags</h4>
          <p className="text-2xl font-bold text-indigo-700">{totalTags}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-1">Used in Posts</h4>
          <p className="text-2xl font-bold text-green-700">{totalUsage}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-amber-800 mb-1">Unused Tags</h4>
          <p className="text-2xl font-bold text-amber-700">{unusedTags.length}</p>
        </div>
      </div>
      
      {/* View mode switchers */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setViewMode('distribution')}
          className={`p-2 rounded-md ${viewMode === 'distribution' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
          title="Distribution view"
        >
          <FiPieChart size={16} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
          title="List view"
        >
          <FiBarChart2 size={16} />
        </button>
      </div>
      
      {/* Tag distribution view */}
      {viewMode === 'distribution' && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Tag Distribution</h4>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
            <div className="tag-cloud">
              {tagStats.map(tag => {
                const colorClasses = getTagColorClass(tag.tagName);
                return (
                  <div 
                    key={tag.id}
                    className={`tag-cloud-tag ${colorClasses.bg} ${colorClasses.text} ${colorClasses.border}`}
                    style={{ 
                      fontSize: `${0.8 + (tag.blogCount / maxCount) * 0.8}rem`,
                      opacity: 0.6 + (tag.blogCount / maxCount) * 0.4,
                      padding: `${0.35 + (tag.blogCount / maxCount) * 0.3}rem ${0.7 + (tag.blogCount / maxCount) * 0.3}rem`,
                    }}
                  >
                    <FiTag className="mr-1" />
                    {tag.tagName}
                    <span className="ml-1 text-xs">({tag.blogCount})</span>
                  </div>
                );
              })}
              
              {tagStats.length === 0 && (
                <p className="text-gray-500 text-center py-4">No tags available</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Tag list view */}
      {viewMode === 'list' && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Most Used Tags</h4>
          <div className="space-y-2">
            {mostUsedTags.map(tag => {
              const percentage = Math.round((tag.blogCount / totalUsage) * 100) || 0;
              const colorClasses = getTagColorClass(tag.tagName);
              
              return (
                <div key={tag.id} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <FiTag className={`mr-1 ${colorClasses.text}`} />
                      <span className="text-sm font-medium">{tag.tagName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {tag.blogCount} posts ({percentage}%)
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${colorClasses.bg}`} 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                </div>
              );
            })}
            
            {mostUsedTags.length === 0 && (
              <p className="text-gray-500 text-center py-4">No tags with posts</p>
            )}
          </div>
        </div>
      )}
        {/* Tag categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="border border-gray-200 rounded-lg p-2 sm:p-3">
          <h5 className="text-sm font-medium text-green-800 mb-2 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            High Usage (5+ posts)
          </h5>
          <div className="flex flex-wrap gap-1">
            {groupedTags.highUsage.map(tag => {
              const colorClasses = getTagColorClass(tag.tagName);
              return (
                <span 
                  key={tag.id} 
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${colorClasses.bg} ${colorClasses.text} tag-badge`}
                >
                  {tag.tagName} ({tag.blogCount})
                </span>
              );
            })}
            {groupedTags.highUsage.length === 0 && (
              <p className="text-xs text-gray-500">No tags in this category</p>
            )}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-2 sm:p-3">
          <h5 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
            <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Medium Usage (2-4 posts)
          </h5>
          <div className="flex flex-wrap gap-1">
            {groupedTags.mediumUsage.map(tag => {
              const colorClasses = getTagColorClass(tag.tagName);
              return (
                <span 
                  key={tag.id} 
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${colorClasses.bg} ${colorClasses.text} tag-badge`}
                >
                  {tag.tagName} ({tag.blogCount})
                </span>
              );
            })}
            {groupedTags.mediumUsage.length === 0 && (
              <p className="text-xs text-gray-500">No tags in this category</p>
            )}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-2 sm:p-3">
          <h5 className="text-sm font-medium text-red-800 mb-2 flex items-center">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Low/No Usage (0-1 posts)
          </h5>
          <div className="flex flex-wrap gap-1">
            {groupedTags.lowUsage.map(tag => {
              const colorClasses = getTagColorClass(tag.tagName);
              return (
                <span 
                  key={tag.id} 
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${colorClasses.bg} ${colorClasses.text} tag-badge`}
                >
                  {tag.tagName} ({tag.blogCount})
                </span>
              );
            })}
            {groupedTags.lowUsage.length === 0 && (
              <p className="text-xs text-gray-500">No tags in this category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderManageTab = () => (
    <div className="space-y-6">      {/* Search and Add Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#f20574] focus:border-[#f20574]"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {!isAddingTag ? (
          <button
            onClick={() => setIsAddingTag(true)}
            className="flex items-center justify-center bg-[#f20574] text-white px-4 py-2 rounded-md hover:bg-[#d30062] transition-colors"
          >
            <FiPlus className="mr-2" />
            Add New Tag
          </button>
        ) : (
          <div className="flex items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="Tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="border border-gray-300 rounded-l-md px-4 py-2 focus:ring-[#f20574] focus:border-[#f20574] w-full"
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
      
      {/* Tag Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-600 mb-1 sm:mb-2">Total Tags</h4>
          <div className="text-2xl sm:text-3xl font-bold text-[#f20574]">
            {tagsLoading ? '...' : totalTags}
          </div>
        </div>
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-600 mb-1 sm:mb-2">Most Used Tag</h4>
          {tagsLoading ? (
            <div>Loading...</div>
          ) : tagStats.length > 0 ? (
            <div>
              <div className="text-xl font-semibold text-[#f20574]">
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
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-600 mb-1 sm:mb-2">Unused Tags</h4>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600">{unusedTags.length}</div>
          <div className="text-sm text-gray-500">
            {unusedTags.length > 0 ? 'Consider cleaning up unused tags' : 'All tags are in use'}
          </div>
        </div>
      </div>
          {/* Tags Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tagsLoading ? (
                <tr>
                  <td colSpan="3" className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#f20574]"></div>
                    <span className="ml-2">Loading tags...</span>
                  </td>
                </tr>
            ) : visibleTags.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-3 sm:px-6 py-3 sm:py-4 text-center text-gray-500">
                    {searchTerm ? 'No tags matching your search' : 'No tags available yet'}
                  </td>
                </tr>
            ) : (
              visibleTags.map(tag => (
                <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    {editingTagId === tag.id ? (
                      <div className="flex flex-wrap sm:flex-nowrap items-center">
                        <input
                          type="text"
                          value={editTagName}
                          onChange={(e) => setEditTagName(e.target.value)}
                          className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 mr-2 focus:ring-[#f20574] focus:border-[#f20574] w-full sm:w-auto"
                          onKeyPress={(e) => e.key === 'Enter' && handleUpdateTag(tag.id)}
                        />
                        <div className="flex mt-2 sm:mt-0">
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
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FiTag className="text-[#f20574] mr-2" />
                        <span className="text-sm font-medium text-gray-900 tag-badge">{tag.tagName}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                          ${tag.blogCount > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          {tag.blogCount}
                        </span>
                        <span className="ml-2 text-xs sm:text-sm text-gray-500">
                          {tag.blogCount === 1 ? 'post' : 'posts'}
                        </span>
                      </div>
                      
                      {/* Usage bar visualization */}
                      {tagStats.length > 0 && (
                        <div className="tag-usage-bar mt-1 w-16 sm:w-32">
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
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {editingTagId !== tag.id && (
                      <>
                        <button
                          onClick={() => handleEditStart(tag)}
                          className="text-[#f20574] hover:text-[#d30062] p-1"
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
      <div className="mt-4 sm:mt-6 bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Tag Usage Guidelines</h3>
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-700">
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
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-0">Tags Management</h2>
          
          {/* Tab Navigation */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-3 sm:px-4 py-2 font-medium rounded-l-md transition-colors ${
                activeTab === 'manage' 
                  ? 'bg-[#f20574] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manage Tags
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 sm:px-4 py-2 font-medium rounded-r-md transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-[#f20574] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tag Analytics
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'manage' ? renderManageTab() : renderAnalyticsTab()}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Tag</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Are you sure you want to delete this tag? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeletingTag}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center text-sm sm:text-base"
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

export default EnhancedTagsManager;
