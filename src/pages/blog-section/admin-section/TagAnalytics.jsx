import React, { useState, useEffect } from 'react';
import { FiTag, FiBarChart2, FiPieChart } from 'react-icons/fi';
import { useGetAllTagsQuery } from '../../../redux/blogSlice';
import { getTagColorClass, groupTagsByUsage } from './TagUtils';
import './TagStyles.css';

const TagAnalytics = () => {
  const { data: tagsData, isLoading, error } = useGetAllTagsQuery();
  const [tags, setTags] = useState([]);
  const [groupedTags, setGroupedTags] = useState({ highUsage: [], mediumUsage: [], lowUsage: [] });
  const [viewMode, setViewMode] = useState('distribution'); // 'distribution' or 'list'
  
  useEffect(() => {
    if (tagsData?.success && tagsData.data) {
      const processedTags = tagsData.data.map(tag => ({
        ...tag,
        blogCount: tag.blogCount || 0
      }));
      
      setTags(processedTags);
      setGroupedTags(groupTagsByUsage(processedTags));
    }
  }, [tagsData]);
  
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-100 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Tags Analysis</h3>
        <p className="text-red-500">Error loading tag data</p>
      </div>
    );
  }
  
  const totalTags = tags.length;
  const totalUsage = tags.reduce((sum, tag) => sum + tag.blogCount, 0);
  const maxCount = Math.max(...tags.map(tag => tag.blogCount), 1);
  
  const mostUsedTags = [...tags].sort((a, b) => b.blogCount - a.blogCount).slice(0, 5);
  const unusedTags = tags.filter(tag => tag.blogCount === 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Tags Analysis</h3>
        <div className="flex space-x-2">
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
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
          <h4 className="text-sm font-medium text-indigo-800 mb-1">Total Tags</h4>
          <p className="text-xl sm:text-2xl font-bold text-indigo-700">{totalTags}</p>
        </div>
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-1">Used in Posts</h4>
          <p className="text-xl sm:text-2xl font-bold text-green-700">{totalUsage}</p>
        </div>
        <div className="bg-amber-50 p-3 sm:p-4 rounded-lg">
          <h4 className="text-sm font-medium text-amber-800 mb-1">Unused Tags</h4>
          <p className="text-xl sm:text-2xl font-bold text-amber-700">{unusedTags.length}</p>
        </div>
      </div>
      
      {/* Tag distribution view */}
      {viewMode === 'distribution' && (
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Tag Distribution</h4>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
            <div className="tag-cloud">
              {tags.map(tag => {
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
              
              {tags.length === 0 && (
                <p className="text-gray-500 text-center py-4">No tags available</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Tag list view */}
      {viewMode === 'list' && (
        <div className="mb-4 sm:mb-6">
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
                      <span className="text-xs sm:text-sm font-medium">{tag.tagName}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {tag.blogCount} {tag.blogCount === 1 ? 'post' : 'posts'} ({percentage}%)
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2.5">
                    <div 
                      className={`h-1.5 sm:h-2.5 rounded-full ${colorClasses.bg}`} 
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
};

export default TagAnalytics;
