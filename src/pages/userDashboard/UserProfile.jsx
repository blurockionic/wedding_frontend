import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../redux/apiSlice.auth";

const UserProfile = () => {
  const userData = useSelector((state) => state.auth.user.user.user);

  console.log(userData);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData.profile_pic || "");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      email: userData.email || "",
      phone_number: userData.phone_number || "",
      wedding_date: userData.wedding_date || "",
      wedding_location: userData.wedding_location || "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB. Please select a smaller file.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        // i want to send with req so make this with formdata

        setSelectedFile(file);

        toast.error("Invalid file type. Please upload an image file.");
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const updatedData = await updateUser(formData).unwrap();
      if (updatedData) {
        toast.success("User updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Error updating user data. Please try again.");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const renderProfileInfo = () => {
    const fields = [
      "first_name",
      "last_name",
      "phone_number",
      "wedding_date",
      "wedding_location",
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm text-pink-600">
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              id={field}
              {...register(field, {
                required:
                  field !== "email" &&
                  field !== "wedding_date" &&
                  "This field is required",
                pattern:
                  field === "email"
                    ? {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      }
                    : undefined,
              })}
              type={field === "wedding_date" ? "date" : "text"}
              className="w-full border border-pink-200 rounded p-2"
              disabled={!isEditing}
            />
            {errors[field] && (
              <p className="text-sm text-red-500">{errors[field].message}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await uploadMutation(formData).unwrap();
        toast.success("File uploaded successfully");
      } catch (error) {
        toast.error("File upload failed. Please try again.");
      }
    } else {
      toast.warning("Please select a file to upload.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-pink-700 mb-2">
          {isEditing ? "Edit Your Profile" : "Your Wedding Journey"}
        </h1>
        <p className="text-sm sm:text-lg text-gray-600">
          {isEditing
            ? "Update your details to cherish your special moments."
            : "Celebrate your love story with your personalized profile."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="w-full bg-white rounded-lg p-6 border border-pink-200 flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl text-center font-serif text-pink-600 mb-4">
            Profile Photo
          </h2>
          <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full overflow-hidden border-4 border-pink-300 mb-4">
            <img
              src={previewUrl || "/wedding-placeholder.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <div className="w-full">
              <label
                htmlFor="photo"
                className="block mb-2 text-sm text-pink-600"
              >
                Upload Photo
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-pink-200 rounded p-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max size: 5MB. Formats: JPG, PNG, GIF.
              </p>
            </div>
          )}
        </div>

        <div className="w-full col-span-2 bg-white rounded-lg p-6 border border-pink-200">
          <h2 className="text-xl sm:text-2xl font-serif text-pink-600 mb-4">
            Personal Information
          </h2>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {renderProfileInfo()}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="text-sm font-semibold text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-semibold text-white bg-pink-600 rounded hover:bg-pink-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {Object.entries(userData)
                .filter(
                  ([key]) =>
                    !["id", "refresh_token", "role", "is_verified","cart"].includes(
                      key.toLowerCase()
                    )
                )
                .map(([key, value]) => (
                  <div className="grid grid-cols-2 justify-between" key={key}>
                    <span className="text-pink-600 capitalize font-semibold">
                      {key.replace("_", " ")}:
                    </span>
                    <span>{value}</span>
                  </div>
                ))}

              <div className="grid grid-cols-2 justify-between" >
                <span className="text-pink-600 capitalize font-semibold">
                  verified
                </span>
                <span>{userData.is_verified?"Yes":"No"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="text-center mt-8">
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 text-sm font-semibold text-white bg-pink-600 rounded hover:bg-pink-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
