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
        <h2 className="text-xl font-bold mb-4">Fill Template Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>

          {/* Description */}
          <label className="block mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </label>

          {/* Free or Paid Selection */}
          <label className="block mb-2">
            Pricing Type:
            <select
              name="categoryByAmount"
              value={formData.categoryByAmount}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
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
                className="border p-2 w-full"
              />
            </label>
          )}

          {/* Category by Mood */}
          <label className="block mb-2">
            Category By Mood:
            <select
              name="categoryByMood"
              value={formData.categoryByMood}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="WEDDING">Wedding</option>
              <option value="BIRTHDAY">Birthday</option>
              <option value="CORPORATE">Corporate</option>
              <option value="ANNIVERSARY">Anniversary</option>
              <option value="LOVE">Love</option>
              <option value="COUPLE">Couple</option>
              <option value="ROMANCE">Romance</option>
            </select>
          </label>

          {/* Category by Requirement */}
          <label className="block mb-2">
            Category By Requirement:
            <select
              name="categoryByRequirement"
              value={formData.categoryByRequirement}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="HOT">Hot</option>
              <option value="POPULAR">Popular</option>
              <option value="LATEST">Latest</option>

            </select>
          </label>

          {/* Status Selection */}
          <label className="block mb-2">
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </label>

          {/* Additional Tags */}
          <label className="block mb-2">
            Tags (comma-separated):
            <input
              type="text"
              name="additionalTags"
              value={formData.additionalTags.join(",")}
              onChange={handleTagChange}
              className="border p-2 w-full"
            />
          </label>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateOtherDetails;
