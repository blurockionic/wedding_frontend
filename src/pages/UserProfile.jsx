import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/actions/userActions"; // Replace with your actual action

const UserProfile = () => {
  const dispatch = useDispatch();

  // Accessing user data from Redux store
  const userData = useSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(userData);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const toggleEditMode = () => setEditMode(!editMode);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to update user profile
    dispatch(updateUserProfile(profileData));
    setEditMode(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={profileData.first_name}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={profileData.last_name}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={profileData.phone_number}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Wedding Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Wedding Date
          </label>
          <input
            type="date"
            name="wedding_date"
            value={new Date(profileData.wedding_date)
              .toISOString()
              .split("T")[0]}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Wedding Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Wedding Location
          </label>
          <input
            type="text"
            name="wedding_location"
            value={profileData.wedding_location}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          {editMode ? (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleEditMode}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}

          {editMode && (
            <button
              type="button"
              onClick={() => {
                setProfileData(userData);
                setEditMode(false);
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
