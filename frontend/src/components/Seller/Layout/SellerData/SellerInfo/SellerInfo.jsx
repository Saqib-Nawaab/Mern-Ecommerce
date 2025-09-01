import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../../../../server";
import { getAllProducts } from "../../../../../redux/actions/product";
function SellerInfo({ isOwner }) {
  const { seller } = useSelector((state) => state.seller);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProducts(seller._id));
    }
  }, [dispatch, seller?._id]);

  const totalProducts = product?.message?.length || 0;

  let totalReviews = 0;
  let totalRating = 0;

  if (Array.isArray(product?.message)) {
    product.message.forEach((p) => {
      const reviews = p.review || [];
      totalReviews += reviews.length;
      totalRating += reviews.reduce((acc, r) => acc + r.rating, 0);
    });
  } else if (product?.message) {
    const reviews = product.message.review || [];
    totalReviews = reviews.length;
    totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
  }

  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const logOutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/seller/logout-seller`, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/seller-login");
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        `Logout failed: ${
          error?.response?.data?.message || "Something went wrong"
        }`
      );
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4">
      <div className="w-full py-5">
        <div className="flex items-center justify-center w-full">
          <img
            src={seller?.avatar?.url || "/default-avatar.png"}
            alt="Seller Avatar"
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center text-[20px] mt-6">{seller?.name}</h3>
        <p className="text-center text-[16px] text-gray-500 mt-1">
          {seller?.description || "No description provided"}
        </p>
      </div>

      <div className="p-3">
        <h5 className="text-[16px] text-gray-900 text-center">Address</h5>
        <h4 className="text-[16px] text-gray-500 mt-1 text-center">
          {seller?.address || "No address provided"}
        </h4>
      </div>

      <div className="p-3">
        <h5 className="text-[16px] text-gray-900 text-center">Zip Code</h5>
        <h4 className="text-[16px] text-gray-500 mt-1 text-center">
          {seller?.zipCode || "No zip code provided"}
        </h4>
      </div>

      <div className="p-3">
        <h5 className="text-[16px] text-gray-900 text-center">Phone Number</h5>
        <h4 className="text-[16px] text-gray-500 mt-1 text-center">
          {seller?.phoneNumber || "No phone number provided"}
        </h4>
      </div>

      <div className="p-3">
        <h5 className="text-[16px] text-gray-900 text-center">
          Total Products
        </h5>
        <h4 className="text-[16px] text-gray-500 mt-1 text-center">
          {totalProducts}
        </h4>
      </div>

      <div className="p-3">
        <h5 className="text-[16px] text-gray-900 text-center">Shop Rating</h5>
        <h4 className="text-[16px] text-gray-500 mt-1 text-center">
          {averageRating.toFixed(1) || "No rating"}
        </h4>
      </div>

      <div className="p-3">
        <h5 className="text-[16px] text-gray-900 text-center">Joined Date</h5>
        <h4 className="text-[16px] text-gray-500 mt-1 text-center">
          {seller?.createdAt
            ? seller.createdAt.slice(0, 10)
            : "No joined date provided"}
        </h4>
      </div>

      {isOwner && (
        <div>
          <div className="p-3 flex justify-center items-center">
            <Link
              to="/seller/dashboard/settings"
              className="bg-blue-500 text-white py-2 px-4 cursor-pointer hover:bg-blue-400 rounded"
            >
              Edit Info
            </Link>
          </div>
          <div className="p-3 flex justify-center items-center">
            <button
              onClick={logOutHandler}
              className="bg-blue-500 text-white py-2 px-4 cursor-pointer hover:bg-blue-400 rounded"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerInfo;
