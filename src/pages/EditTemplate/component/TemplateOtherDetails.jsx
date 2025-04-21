import React, { useState } from "react";

const TemplateOtherDetails = ({ onClose, onSave, templateData }) => {
  const [formData, setFormData] = useState({
    ...templateData,
    categoryByAmount: templateData.categoryByAmount || "FREE", // Default to FREE
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    setFormData({ ...formData, additionalTags: e.target.value.split(",") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-[#F22C8F]">Fill Template Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label className="block mb-2">
          <span className="text-gray-700">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-[#F22C8F] rounded p-2 w-full  focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100"
              placeholder="Enter Name"
              required
            />
          </label>

          {/* Description */}
          <label className="block mb-2">
          <span className="text-gray-700">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-[#F22C8F] rounded p-2 w-full focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100"
              placeholder="Describe your template...."
            />
          </label>

          {/* Free or Paid Selection */}
          <label className="block mb-2">
          <span className="text-gray-700">Pricing Type:</span>
            <select
              name="categoryByAmount"
              value={formData.categoryByAmount}
              onChange={handleChange}
              className="border border-[#F22C8F] rounded p-2 w-full focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100 text-gray-500"
            >
              <option value="FREE" className="bg-white hover:bg-white">Free</option>
              <option value="PAID" className="bg-white hover:bg-white">Paid</option>
            </select>
          </label>

          {/* Show Price Input Only If "Paid" is Selected */}
          {formData.categoryByAmount === "PAID" && (
            <label className="block mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) || 0.0 })
                  }
                className="border border-[#F22C8F] rounded p-2 w-full focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100"
              />
            </label>
          )}

          {/* Category by Mood */}
          <label className="block mb-2">
            <span className="text-gray-700">Category By Mood:</span>
            <select
              name="categoryByMood"
              value={formData.categoryByMood}
              onChange={handleChange}
              className="border border-[#F22C8F] rounded p-2 w-full focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100 text-gray-500"
            >
              <option value="WEDDING" className="bg-white hover:bg-white">Wedding</option>
              <option value="BIRTHDAY" className="bg-white hover:bg-white">Birthday</option>
              <option value="CORPORATE" className="bg-white hover:bg-white">Corporate</option>
              <option value="ANNIVERSARY" className="bg-white hover:bg-white">Anniversary</option>
              <option value="LOVE" className="bg-white hover:bg-white">Love</option>
              <option value="COUPLE" className="bg-white hover:bg-white">Couple</option>
              <option value="ROMANCE" className="bg-white hover:bg-white">Romance</option>
            </select>
          </label>

          {/* Category by Requirement */}
          <label className="block mb-2">
            <span className="text-gray-700">Category By Requirement:</span>
            <select
              name="categoryByRequirement"
              value={formData.categoryByRequirement}
              onChange={handleChange}
              className="border border-[#F22C8F] rounded p-2 w-full focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100 text-gray-500"
            >
              <option value="HOT" className="bg-white hover:bg-white">Hot</option>
              <option value="POPULAR" className="bg-white hover:bg-white">Popular</option>
              <option value="LATEST" className="bg-white hover:bg-white">Latest</option>

            </select>
          </label>

          {/* Status Selection */}
          <label className="block mb-2">
            <span className="text-gray-700">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-[#F22C8F] rounded p-2 w-full focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100 text-gray-500"
            >
              <option value="DRAFT" className="bg-white hover:bg-white">Draft</option>
              <option value="PUBLISHED" className="bg-white hover:bg-white">Published</option>
              <option value="ARCHIVED" className="bg-white hover:bg-white">Archived</option>
            </select>
          </label>

          {/* Additional Tags */}
          <label className="block mb-2">
            <span className="text-gray-700">Tags (comma-separated):</span>
            <input
              type="text"
              name="additionalTags"
              value={formData.additionalTags.join(",")}
              onChange={handleTagChange}
              className="border border-[#F22C8F] rounded p-2 w-full focus:ring-pink-400 focus:border-pink-400 custom-select hover:bg-pink-100"
            />
          </label>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-11 px-11 py-2 bg-purple-500 text-white rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[#F22C8F] text-white rounded">
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateOtherDetails;
