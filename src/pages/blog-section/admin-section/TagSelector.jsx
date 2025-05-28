import React, { useState, useEffect, useRef } from 'react';
import { FiTag, FiX, FiPlus } from 'react-icons/fi';
import { useGetAllTagsQuery } from '../../../redux/blogSlice';
import { getTagColorClass, formatTagForDisplay } from './TagUtils';
import './TagStyles.css';

const TagSelector = ({ selectedTags = [], onChange, maxTags = 10, showSuggestions = true }) => {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  
  // Fetch all available tags
  const { data: tagsData, isLoading } = useGetAllTagsQuery();
  const [availableTags, setAvailableTags] = useState([]);
  
  useEffect(() => {
    if (tagsData?.success && tagsData.data) {
      setAvailableTags(tagsData.data);
    }
  }, [tagsData]);
  
  // Filter suggestions based on input and already selected tags
  useEffect(() => {
    if (inputValue.trim() === '') {
      // When input is empty, show popular tags that aren't already selected
      const popular = availableTags
        .sort((a, b) => b.blogCount - a.blogCount)
        .slice(0, 5)
        .filter(tag => !selectedTags.includes(tag.tagName));
      setFilteredSuggestions(popular);
    } else {
      // Filter tags that match input and aren't already selected
      const matches = availableTags
        .filter(tag => 
          tag.tagName.toLowerCase().includes(inputValue.toLowerCase()) && 
          !selectedTags.includes(tag.tagName)
        )
        .slice(0, 5);
      setFilteredSuggestions(matches);
    }
  }, [inputValue, availableTags, selectedTags]);
  
  // Handle clicks outside to close the suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Add a tag
  const addTag = (tagName) => {
    if (
      tagName.trim() !== '' && 
      !selectedTags.includes(tagName) && 
      selectedTags.length < maxTags
    ) {
      onChange([...selectedTags, tagName]);
      setInputValue('');
      inputRef.current?.focus();
    }
  };
  
  // Remove a tag
  const removeTag = (tagName) => {
    onChange(selectedTags.filter(tag => tag !== tagName));
  };
  
  // Handle enter key and form submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };
  
  return (
    <div ref={containerRef} className="relative">
      <div 
        className={`flex flex-wrap gap-1 sm:gap-2 p-2 border rounded-md transition-colors ${
          isActive ? 'border-[#f20574] ring-1 ring-[#f20574]' : 'border-gray-300'
        }`}
        onClick={() => {
          inputRef.current?.focus();
          setIsActive(true);
        }}
      >
        {selectedTags.map((tag, index) => {
          const colorClasses = getTagColorClass(tag);
          return (
            <div
              key={index}
              className={`inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium tag-badge ${colorClasses.bg} ${colorClasses.text}`}
            >
              <FiTag className="mr-1" size={12} />
              {formatTagForDisplay(tag)}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FiX size={14} />
              </button>
            </div>
          );
        })}
        
        <div className="flex-grow flex items-center min-w-[80px] sm:min-w-[100px]">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsActive(true)}
            onKeyDown={handleKeyDown}
            placeholder={selectedTags.length === 0 ? "Add tags..." : ""}
            className="flex-grow border-none focus:ring-0 focus:outline-none text-xs sm:text-sm py-1 px-1"
          />
        </div>
      </div>
      
      {/* Tag counter */}
      <div className="mt-1 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          {selectedTags.length > 0 
            ? `${selectedTags.length} ${selectedTags.length === 1 ? 'tag' : 'tags'} added`
            : 'No tags added yet'}
        </p>
        <p className="text-xs text-gray-500">{selectedTags.length}/{maxTags}</p>
      </div>
      
      {/* Tag suggestions */}
      {isActive && showSuggestions && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
          <p className="px-2 sm:px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100">
            {inputValue.trim() ? 'Matching tags' : 'Popular tags'}
          </p>
          
          {isLoading ? (
            <div className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500">Loading tags...</div>
          ) : filteredSuggestions.length > 0 ? (
            <div>
              {filteredSuggestions.map((tag, index) => {
                const colorClasses = getTagColorClass(tag.tagName);
                return (
                  <div
                    key={index}
                    onClick={() => addTag(tag.tagName)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <FiTag className={`mr-1 sm:mr-2 ${colorClasses.text}`} />
                      <span className="text-xs sm:text-sm">{formatTagForDisplay(tag.tagName)}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {tag.blogCount} {tag.blogCount === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-500">No matching tags</span>
              {inputValue.trim() && (
                <button
                  onClick={() => addTag(inputValue.trim())}
                  className="flex items-center text-xs text-[#f20574] hover:text-[#d30062]"
                >
                  <FiPlus className="mr-1" />
                  Create "{inputValue.trim()}"
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
