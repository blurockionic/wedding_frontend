import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewBlogPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentDate] = useState(new Date());

  // Custom toolbar options for Quill editor
  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        // Add any custom handlers here if needed
      }
    }
  };
  
  const saveDraft = () => {
    setSaving(true);
    // Save draft to localStorage for demo purposes
    localStorage.setItem('blogDraft', JSON.stringify({ title, content, coverImage: coverImagePreview }));
    setTimeout(() => {
      setSaving(false);
      alert('Draft saved successfully!');
    }, 500);
  };

  const savePost = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Blog post saved successfully!');
      navigate('/blog_dashboard');
    }, 1000);
  };

  // Handle cover image upload
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove cover image
  const removeCoverImage = () => {
    setCoverImage('');
    setCoverImagePreview('');
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Load draft if exists
  useEffect(() => {
    const savedDraft = localStorage.getItem('blogDraft');
    if (savedDraft) {
      const { title: savedTitle, content: savedContent, coverImage: savedCoverImage } = JSON.parse(savedDraft);
      setTitle(savedTitle || '');
      setContent(savedContent || '');
      if (savedCoverImage) {
        setCoverImagePreview(savedCoverImage);
      }
    }
  }, []);

  // Format date for display
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* First level navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md hover:bg-gray-50"
            onClick={() => navigate('/blog_dashboard')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
        
        <div className="flex-grow mx-6">
          <input
            type="text"
            placeholder="Blog Title"
            className="w-full px-4 py-3 text-lg font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPreviewMode}
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              ${isPreviewMode ? 
                'text-blue-600 bg-blue-50 border border-blue-200' : 
                'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? 'Edit Post' : 'Preview'}
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            onClick={saveDraft} 
            disabled={saving || isPreviewMode}
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            onClick={savePost} 
            disabled={saving || !title || !content || isPreviewMode}
          >
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>
      
      {/* Cover image section */}
      {!isPreviewMode && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-700">Cover Image</h2>
            {coverImagePreview && (
              <button
                onClick={removeCoverImage}
                className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
              >
                Remove Image
              </button>
            )}
          </div>
          
          {!coverImagePreview ? (
            <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="coverImage" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a cover image</span>
                    <input 
                      id="coverImage" 
                      name="coverImage" 
                      type="file" 
                      accept="image/*" 
                      className="sr-only" 
                      onChange={handleCoverImageChange} 
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 relative h-64 rounded-lg overflow-hidden">
              <img
                src={coverImagePreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {!isPreviewMode ? (
        <>
          {/* Second level navbar - Quill Toolbar */}
          <div id="toolbar" className="px-6 py-2 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            {/* Text Formatting */}
            <span className="ql-formats">
              <select className="ql-header" defaultValue="">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="">Normal</option>
              </select>
              <select className="ql-font">
                <option selected>Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </span>
            
            {/* Text Style */}
            <span className="ql-formats">
              <button className="ql-bold"></button>
              <button className="ql-italic"></button>
              <button className="ql-underline"></button>
              <button className="ql-strike"></button>
            </span>
            
            {/* Text Color */}
            <span className="ql-formats">
              <select className="ql-color"></select>
              <select className="ql-background"></select>
            </span>
            
            {/* Lists */}
            <span className="ql-formats">
              <button className="ql-list" value="ordered"></button>
              <button className="ql-list" value="bullet"></button>
              <button className="ql-indent" value="-1"></button>
              <button className="ql-indent" value="+1"></button>
            </span>
            
            {/* Text Alignment */}
            <span className="ql-formats">
              <button className="ql-align" value=""></button>
              <button className="ql-align" value="center"></button>
              <button className="ql-align" value="right"></button>
              <button className="ql-align" value="justify"></button>
            </span>
            
            {/* Media */}
            <span className="ql-formats">
              <button className="ql-link"></button>
              <button className="ql-image"></button>
              <button className="ql-video"></button>
            </span>
            
            {/* Clear Formatting */}
            <span className="ql-formats">
              <button className="ql-clean"></button>
            </span>
          </div>
          
          {/* Quill Editor */}
          <div className="flex-grow p-6 overflow-auto bg-gray-50">
            <div className="bg-white h-full rounded-lg shadow-sm border border-gray-200">
              <div className="h-full">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Write your blog here..."
                  className="h-full overflow-y-auto"
                  style={{ border: "none" }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Preview Mode */
        <div className="flex-grow overflow-auto bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            {/* Cover Image Preview */}
            {coverImagePreview && (
              <div className="w-full h-80 relative">
                <img 
                  src={coverImagePreview} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Article Content */}
            <article className="p-8">
              <header className="mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title || 'Untitled Blog Post'}</h1>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-4">By {/* User's name - using the provided login */}
                    <span className="font-medium text-gray-900">rohitRanjanGIT</span>
                  </span>
                  <span>{formattedDate}</span>
                </div>
              </header>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Add custom Tailwind styles for better prose rendering */}
              <style jsx global>{`
                .prose {
                  max-width: 65ch;
                  color: #374151;
                }
                .prose h1, .prose h2, .prose h3, .prose h4 {
                  color: #111827;
                  font-weight: 600;
                  margin-top: 2em;
                  margin-bottom: 1em;
                }
                .prose h1 { font-size: 2.25em; }
                .prose h2 { font-size: 1.5em; }
                .prose h3 { font-size: 1.25em; }
                .prose p, .prose ul, .prose ol { margin-top: 1.25em; margin-bottom: 1.25em; }
                .prose a { color: #2563eb; text-decoration: underline; }
                .prose strong { font-weight: 600; color: #111827; }
                .prose img { margin: 2em 0; border-radius: 0.375rem; }
                .prose blockquote {
                  font-style: italic;
                  color: #6b7280;
                  border-left: 4px solid #e5e7eb;
                  padding-left: 1rem;
                }
              `}</style>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBlogPost;