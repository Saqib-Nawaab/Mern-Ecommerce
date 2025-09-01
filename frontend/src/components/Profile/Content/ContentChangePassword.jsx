import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import {
  AiOutlineKey,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/actions/user.js";

function ContentChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("All fields are required");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }

      dispatch(changePassword({ currentPassword, newPassword }));
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex justify-center items-center  ">
      <div className="w-full max-w-md  p-6 rounded-lg  ">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Current Password */}
          <div className="flex flex-col gap-1 space-y-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <AiOutlineKey className="text-gray-500 mr-2" />
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                id="currentPassword"
                placeholder="Enter current password"
                className="w-full outline-none"
              />
              <div
                className="absolute right-3 text-gray-600 cursor-pointer"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </div>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1 space-y-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FiLock className="text-gray-500 mr-2" />
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type={showNew ? "text" : "password"}
                id="newPassword"
                placeholder="Enter new password"
                className="w-full outline-none"
              />
              <div
                className="absolute right-3 text-gray-600 cursor-pointer"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </div>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-1 space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full outline-none"
              />
              <div
                className="absolute right-3 text-gray-600 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 rounded-md"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContentChangePassword;
