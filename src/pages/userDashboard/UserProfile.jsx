import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../redux/apiSlice.auth";
import { userUpdate } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/global/button/CustomButton";

import imagebg1 from "../../../public/userprofile/imagebg1.png";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData?.profile_pic || "");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (
      userData?.role !== "USER" &&
      userData?.role !== "ADMIN" &&
      userData?.role !== "SUPER_ADMIN"
    ) {
      navigate("/");
    }
  }, [userData, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_name: userData?.user_name || "",
      email: userData?.email || "",
      phone_number: userData?.phone_number || "",
      wedding_date: userData?.wedding_date
        ? new Date(userData?.wedding_date).toISOString().split("T")[0]
        : "",
      wedding_location: userData?.wedding_location || "",
      profile_photo: userData?.profile_photo || "",
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
      const val =
        key === "wedding_date" && data[key]
          ? new Date(data[key]).toISOString()
          : data[key];

      formData.append(key, val);
    }

    if (selectedFile) {
      formData.append("profile_photo", selectedFile);
    }

    try {
      const updatedData = await updateUser(formData).unwrap();

      toast.success(updatedData?.message);

      try {
        dispatch(userUpdate(updatedData.user));
      } catch (error) {
        console.error("Dispatch error:", error);
        toast.error("Failed to update user data in the store.");
      }
    } catch (error) {
      toast.error(error.data.message || "Failed to update user.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const renderProfileInfo = () => {
    const fields = [
      "user_name",
      "phone_number",
      "wedding_date",
      "wedding_location",
      "email",
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field} className="space-y-2">
            <label
              htmlFor={field}
              className="block font-semibold capitalize font-outfit text-sm text-pink-600"
            >
              {field.replace("_", " ")}
            </label>
            <input
              id={field}
              autoFocus={isEditing && field === "user_name"}
              placeholder={isEditing ? ` your ${field.replace("_", " ")}` : ""}
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
              className="disabled:cursor-not-allowed cursor-pointer w-full border  border-pink-200 rounded p-2"
              disabled={field === "email" || !isEditing}
            />
            {errors[field] && (
              <p className="text-sm text-red-500">{errors[field].message}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full   mx-auto rounded-lg">
      <div className="relative text-center  h-fit">
        {/* Background Image */}
        <div className="absolute inset-0 min-h-[300px]">
          <img
            className="w-full h-full object-cover"
            src={imagebg1}
            alt="bg image"
          />
        </div>

        {/* Profile Section */}
        <div className="relative font-outfit   z-10 flex flex-col gap-5 md:flex-row items-center justify-between min-h-[300px] mx-auto p-6 md:p-10 ">
          {/* Profile Picture & Name */}
          <div className="flex flex-col md:flex-row  items-center md:space-x-6 text-white">
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full overflow-hidden border-4 border-pink-300">
              <img
                src={isEditing ? previewUrl : userData?.profile_photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col md:items-start mt-4  md:mt-0">
              <p className="hidden md:block">Your Name</p>
              <h2 className="text-lg uppercase   text-start sm:text-xl text-white  md:mt-0">
                {userData?.user_name}
              </h2>
            </div>
          </div>

          {/* Right Section (Button & Stats) */}

          <div className="w-full md:w-auto flex md:flex-col gap-10 items-center md:items-end flex-col-reverse">
            <div className="mb-4">
              {!isEditing && (
                <CustomButton
                  onClick={() => setIsEditing(true)}
                  text="Edit Profile"
                  className="px-6 py-2 text-sm font-semibold text-white bg-pink-600 rounded hover:bg-pink-700"
                />
              )}
            </div>

            <div className=" flex ">
              {[
                { count: 5, what: "checklist created" },
                { count: 5, what: "wishlist" },
                { count: 5, what: "event created" },
                { count: 5, what: "posts" },
              ].map((item, index, array) => (
                <div
                  key={item.what}
                  className={`flex flex-col justify-center items-center  gap-2 p-2 ${
                    index !== array.length - 1
                      ? "border-r-2 border-gray-300"
                      : ""
                  }`}
                >
                  <span className="text-lg text-white">{item.count}</span>
                  <span className="text-sm text-gray-300">{item.what}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid my-8 grid-cols-1 px-4 md:mx-10 gap-6 ">
        {isEditing && (
          <div className=" row-span-1 bg-white rounded-lg p-6 border border-pink-200 flex flex-col items-center">
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
          </div>
        )}

        <div
          className={`w-full col-span-2 ${
            isEditing ? "bg-green-100 border-dashed border-4" : "bg-white"
          } rounded-lg p-6 border-2 border-pink-400`}
        >
          <div className="text-xl my-4 font-semibold  flex justify-between sm:text-2xl text-pink-600 ">
            <span> Personal Information</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderProfileInfo()}
            <div className="flex justify-end space-x-4 mt-6">
              {isEditing && (
                <>
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
                    {isLoading ? "updating..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
