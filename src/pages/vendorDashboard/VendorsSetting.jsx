import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../../components/global/inputfield/PasswordField";
import { GoLock } from "react-icons/go";
import {
  useDashboardChangePasswordMutation,
  useVendorDeleteAccountMutation,
} from "../../redux/vendorSlice";
import { toast } from "react-toastify";
import { userlogout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const vendorSettingSchema = z
  .object({
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters."),
  })
  .superRefine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function VendorsSetting() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vendorSettingSchema),
  });

  const dispatch = useDispatch();

  const [changePassword, { isLoading: isChangingPassword }] = useDashboardChangePasswordMutation();
  const [deleteVendor, { isLoading: isDeleting }] = useVendorDeleteAccountMutation();
   const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPasswordCon, setIsShowPasswordCon] = useState(false);


  const [confirmDelete, setConfirmDelete] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {

    console.log(data)
    try {
      const res = await changePassword({pass:data.confirmPassword}).unwrap();
      toast.success(res.message);
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password.");
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmDelete !== "DELETE") {
      setMessage("You must type DELETE to confirm.");
      return;
    }

    try {
      const deleteRes = await deleteVendor().unwrap();
      toast.success(deleteRes.message);
      setMessage("Account successfully deleted!");
      setConfirmDelete(""); 
     
     
      
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete account.");
    }finally{
      dispatch(userlogout());
    }
  };

  return (
    <div className="p-6 m-2 max-w-lg mx-auto border rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Vendor Settings</h2>

      {/* Change Password Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <h3 className="font-semibold text-lg">Change Password</h3>

        <PasswordField
          icon={<GoLock size={20} className="text-primary" />}
          type="password"
          id="newPassword"
          register={register}
          label="New Password"
          isShow={isShowPassword}
          setIsShow={setIsShowPassword}
          error={errors.newPassword}
        />

        <PasswordField
          icon={<GoLock size={20} className="text-primary" />}
          type="password"
          id="confirmPassword"
          register={register}
          label="Confirm New Password"
          error={errors.confirmPassword}
        
          isShow={isShowPasswordCon}
          setIsShow={setIsShowPasswordCon}

        />

        <button
          type="submit"
          className="bg-primary hover:bg-pink-600 text-white p-3 rounded w-full transition disabled:bg-gray-400"
          disabled={isChangingPassword}
        >
          {isChangingPassword ? "Changing..." : "Change Password"}
        </button>
      </form>

      {/* Delete Account Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-red-600">Type DELETE to confirm</h3>
        <input
          type="text"
          placeholder=""
          value={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.value)}
          className="w-full p-3 border rounded focus:ring focus:ring-ring"
        />
        <button
          onClick={handleDeleteAccount}
          className={`p-3 rounded w-full transition text-white ${
            confirmDelete === "DELETE" ? "bg-primary hover:bg-pink-600 ": "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={confirmDelete !== "DELETE" || isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>

      {message && <p className="text-center text-sm mt-4 text-gray-600">{message}</p>}
    </div>
  );
}
