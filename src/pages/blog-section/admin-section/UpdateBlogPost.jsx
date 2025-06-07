import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogPreview from '../blog-section/BlogPreview';
import { useUpdateBlogMutation, useGetBlogByUrlTitleQuery, useGetAllTagsQuery } from '../../../redux/blogSlice';
import { FiTag, FiSearch, FiPlus } from 'react-icons/fi';
import TagSelector from './TagSelector';

const UpdateBlogPost = () => {
  const navigate = useNavigate();
  const { urlTitle } = useParams(); // Get the blog URL title from the URL params
  const [updateBlog] = useUpdateBlogMutation();
  const { data: blog, isLoading, isError } = useGetBlogByUrlTitleQuery(urlTitle); // Fetch blog data
  
  // State variables for form fields
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [tags, setTags] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [viewCount, setViewCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Setup react-hook-form with default values
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      id: '',
    },
  });

  const title = watch('title');

  // Pre-fill the form when blog data is loaded
  useEffect(() => {
    if (blog) {
      // Assume blog.data contains the necessary fields
      setValue('title', blog.data.title || '');
      setValue('id', blog.data.id || '');
      setContent(blog.data.content || ''); // Set content
      setTags(blog.data.tags ? blog.data.tags.map(tag => tag.tagName) : []); // Set tags
      setCoverImagePreview(blog.data.coverImage || '');
      setCreatedAt(blog.data.createdAt || '');
      setViewCount(blog.data.viewCount || 0);
    }
  }, [blog, setValue]);

  // Custom toolbar options for Quill editor
  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        // Add any custom handlers here if needed
      }
    }
  };

  // Save or update the blog post
  const saveDraft = async (formData) => {
    setSaving(true);

    const updatePayload = new FormData();
    updatePayload.append('title', formData.title);
    updatePayload.append('content', content);
    updatePayload.append('tags', JSON.stringify(tags));
    
    if (coverImage) {
      updatePayload.append('coverImage', coverImage);
    }

    try {
      await updateBlog({ id: blog.data.id, blogData: updatePayload }).unwrap();
      alert('Blog post updated successfully!');
      navigate('/blog_dashboard'); // Navigate back to the dashboard
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Error updating blog post.');
    } finally {
      setSaving(false);
    }
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

  // Display loading or error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blog post.</div>;

  return (
    <form onSubmit={handleSubmit(saveDraft)}>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* First level navbar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#f20574] transition-colors rounded-md hover:bg-gray-50"
              onClick={() => navigate('/blog_dashboard')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
          
          <div className="flex-grow mx-8">
            <input
              type="text"
              placeholder="Blog Title"
              className="w-full px-5 py-3 text-xl font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f20574] focus:border-[#f20574] outline-none transition-all bg-white"
              {...register('title', { required: true })}
              disabled={isPreviewMode}
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f20574]
                ${isPreviewMode ? 'text-[#f20574] bg-pink-50 border border-pink-200' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}
              onClick={togglePreviewMode}
            >
              {isPreviewMode ? 'Edit Post' : 'Preview'}
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-[#f20574] bg-white border border-[#f20574] rounded-md hover:bg-pink-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f20574] disabled:opacity-50"
              type="submit"
              disabled={saving || isPreviewMode}
            >
              {saving ? 'Saving...' : 'Update'}
            </button>
          </div>
        </div>

        <div className="flex flex-grow overflow-hidden">
          {/* Left sidebar - only visible in edit mode */}
          {!isPreviewMode && (
            <div className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Blog Properties</h3>

                {/* Tags section */}
                <div className="mb-6">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <TagSelector 
                    selectedTags={tags}
                    onChange={setTags}
                    maxTags={10}
                    showSuggestions={true}
                  />
                  <p className="mt-1 text-xs text-gray-500">Maximum 10 tags per post.</p>
                </div>

                {/* Cover image upload section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image
                  </label>

                  {!coverImagePreview ? (
                    <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-4 py-4">
                      <div className="space-y-2 text-center">
                        <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-xs text-gray-600">
                          <label htmlFor="coverImage" className="relative cursor-pointer bg-white rounded-md font-medium text-[#f20574] hover:text-[#d30062] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#f20574]">
                            <span>Upload image</span>
                            <input
                              id="coverImage"
                              name="coverImage"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleCoverImageChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 relative rounded-md overflow-hidden">
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeCoverImage}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 focus:outline-none"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className={`flex-grow flex flex-col overflow-hidden ${isPreviewMode ? 'bg-gray-50' : ''}`}>
            {!isPreviewMode ? (
              <>
                {/* Quill Toolbar */}
                <div id="toolbar" className="px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                  <span className="ql-formats">
                    <select className="ql-header" defaultValue="">
                      <option value="1">Heading 1</option>
                      <option value="2">Heading 2</option>
                      <option value="3">Heading 3</option>
                      <option value="">Normal</option>
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-blockquote" />
                    <button className="ql-code-block" />
                    <button className="ql-link" />
                    <button className="ql-image" />
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                    <button className="ql-script" value="sub" />
                    <button className="ql-script" value="super" />
                    <button className="ql-indent" value="-1" />
                    <button className="ql-indent" value="+1" />
                    <button className="ql-direction" value="rtl" />
                    <select className="ql-align" />
                    <select className="ql-color" />
                    <select className="ql-background" />
                    <select className="ql-font" />
                    <select className="ql-size" />
                  </span>
                </div>

                {/* Quill Editor */}
                <div className="px-6 py-4 overflow-y-auto border-none" style={{ width: '990px' }}>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    theme="snow"
                    placeholder="Write your blog content here..."
                    className="h-full"
                  />
                </div>
              </>
            ) : (
              /* Preview Mode */
              <BlogPreview
                title={title}
                content={content}
                coverImagePreview={coverImagePreview}
                hashtags={tags}
                createdAt={createdAt}
                viewCount={viewCount}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateBlogPost;
