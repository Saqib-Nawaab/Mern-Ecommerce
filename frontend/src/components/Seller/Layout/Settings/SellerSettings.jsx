import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { server } from "../../../../server.js";
import { AiOutlineCamera } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import store from "../../../../redux/store.js";
import { loadSeller } from "../../../../redux/actions/seller.js";

function SellerSettings() {
  const { seller } = useSelector((state) => state.seller);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialForm = {
    name: seller?.name || "",
    email: seller?.email || "",
    phone: seller?.phoneNumber || "",
    zipCode: seller?.zipCode || "",
    address: seller?.address || "",
    description: seller?.description || "",
  };

  const [formData, setFormData] = useState(initialForm);

  const [avatar, setAvatar] = useState(seller?.avatar?.url || null);
  const [avatarPreview, setAvatarPreview] = useState(
    seller?.avatar?.url ? seller.avatar.url.replace(/\\/g, "/") : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating profile...");

    setIsLoading(true);

    try {
      const { name, phone, zipCode, address, description } = formData;

      if (!name || !phone || !zipCode || !address || !description) {
        toast.update(toastId, {
          render: "Please fill in all required fields.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      const updatedData = {
        name: formData.name,
        phoneNumber: formData.phone,
        description: formData.description,
        addresses: [
          {
            address: formData.address,
            zipCode: formData.zipCode,
          },
        ],
      };

      await axios.post(`${server}/seller/update-seller`, updatedData, {
        withCredentials: true,
      });

      if (avatar && typeof avatar !== "string") {
        const formData = new FormData();
        formData.append("file", avatar);

        await axios.post(`${server}/seller/update-avatar`, formData, {
          withCredentials: true,
        });
      }

      store.dispatch(loadSeller());

      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setIsEditing(false);
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to update profile.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialForm);
    setAvatarPreview(
      seller?.avatar?.url ? seller.avatar.url.replace(/\\/g, "/") : null
    );
    setAvatar(null);
    setIsEditing(false);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 hover:border-blue-400 transition-all duration-300"
              alt="User profile"
            />
          ) : (
            <div className="w-36 h-36 flex items-center justify-center rounded-full border-4 border-blue-500 bg-gray-100">
              <CgProfile size={80} className="text-blue-500" />
            </div>
          )}

          {isEditing && (
            <label className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <AiOutlineCamera size={18} />
            </label>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled
              className={`w-full px-4 py-2 border  text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "border-blue-400 " : "border-blue-300 bg-blue-50"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code *
            </label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              placeholder="Enter your zip code"
              required
              value={formData.zipCode}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address *
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter your address"
              required
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Description *
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter your description"
              required
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  handleCancel();
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-3 rounded-md shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default SellerSettings;
