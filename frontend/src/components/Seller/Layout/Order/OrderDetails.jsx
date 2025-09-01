import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsFillBagFill, BsArrowLeft, BsCheckCircle } from "react-icons/bs";
import { FiTruck, FiPackage, FiXCircle } from "react-icons/fi";
import {
  getSellerAllOrders,
  updateOrderStatus,
} from "../../../../redux/actions/order";
import { useState } from "react";
import Loading from "../../../Loading/Loading.jsx";

const OrderDetails = () => {
  const { order, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(getSellerAllOrders(seller._id));
  }, [dispatch, seller?._id]);

  const data = order ? order?.data.find((item) => item._id === id) : null;

  const handleUpdateStatus = async (orderId) => {
    setIsUpdating(true);
    try {
      await dispatch(updateOrderStatus(orderId, status));
      await dispatch(getSellerAllOrders(seller?._id));
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <BsCheckCircle className="text-green-500 mr-2" />;
      case "shipped":
      case "on the way":
        return <FiTruck className="text-blue-500 mr-2" />;
      case "cancelled":
        return <FiXCircle className="text-red-500 mr-2" />;
      case "refund processing":
        return <FiPackage className="text-red-500 mr-2" />;
      case "refunded":
        return <FiPackage className="text-red-500 mr-2" />;
      case "processing":
        return <FiPackage className="text-blue-500 mr-2" />;
      default:
        return <FiPackage className="text-yellow-500 mr-2" />;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-sm text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/seller/dashboard/orders"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700  text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <BsArrowLeft className="mr-2" /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = data.cart.reduce(
    (sum, item) => sum + item.quantity * item.discountedPrice,
    0
  );

  let statusOptions = ["Processing", "Shipped", "On the Way", "Delivered"];
  const statusOption = data?.status?.toLowerCase();
  if (statusOption === "refund processing" || statusOption === "refunded") {
    statusOptions = ["Refunded"];
  }

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <BsFillBagFill className="text-blue-600  text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-700">
                Order Details
              </h1>
              <p className="text-sm text-gray-500">Order ID : {data._id}</p>
            </div>
          </div>
          <Link
            to={`/seller/dashboard/${
              statusOption === "refunded" ||
              statusOption === "refund processing" ||
              statusOption === "Refunded"
                ? "refunds"
                : "orders"
            }`}
            className="flex items-center px-4 py-2.5 bg-white border
            border-gray-200 rounded-lg shadow-sm text-sm font-medium
            text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <BsArrowLeft className="mr-2" /> Back to Orders
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">Order Summary</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(data.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="text-sm font-medium text-gray-700 capitalize">
                      {data.paymentInfo?.type || "Not specified"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Current Status</p>
                    <div className="flex items-center">
                      {getStatusIcon(data.status)}
                      <span
                        className={`text-sm font-medium ${
                          data.status.toLowerCase() === "delivered"
                            ? "text-green-600"
                            : data.status.toLowerCase() === "cancelled" ||
                              data.status.toLowerCase() === "refunded" ||
                              data.status.toLowerCase() === "refund processing"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {data.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                    <div className="flex-1 w-full">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Update Status
                      </label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-[151px] pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                      >
                        <option value="">Select status</option>
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    {data.status.toLowerCase() === "refunded" ||
                    data.status.toLowerCase() === "refund processing" ||
                    data.status.toLowerCase() === "delivered" ? (
                      <span
                        className={`${
                          data.status.toLowerCase() === "refunded" ||
                          data.status.toLowerCase() === "refund processing"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        } px-4 py-2 rounded-lg font-medium text-sm`}
                      >
                        {data.status.toLowerCase() === "refunded"
                          ? "Refunded"
                          : data.status.toLowerCase() === "refund processing"
                          ? "Refund Processing"
                          : "Delivered"}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(data._id)}
                        disabled={!status || isUpdating}
                        className={`px-4 py-2 rounded-lg font-medium text-sm ${
                          !status || isUpdating
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        } transition-colors duration-200`}
                      >
                        {isUpdating ? "Updating..." : "Update Status"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">
                  Products ({data.cart.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {data.cart.map((item) => (
                  <div key={item._id} className="p-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.images[0]?.url}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-700 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-3">
                          {item.category}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Quantity</p>
                            <p className="text-sm font-medium text-gray-700">
                              {item.quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="text-sm font-medium text-blue-600">
                              ${item.discountedPrice.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Original</p>
                            <p className="text-sm font-medium text-red-400 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Subtotal</p>
                            <p className="text-sm font-medium text-green-600">
                              $
                              {(item.quantity * item.discountedPrice).toFixed(
                                2
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">
                  Customer Information
                </h3>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <img
                    src={data.user?.avatar?.url || "/default-avatar.png"}
                    alt={data.user?.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-700">
                      {data.user?.name}
                    </h4>
                    <p className="text-sm text-gray-500">{data.user?.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-medium text-gray-700">
                      {data.user?.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">
                  Shipping Information
                </h3>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-700">
                      {data.shippingAddress?.address1}
                    </p>
                    {data.shippingAddress?.address2 && (
                      <p className="text-sm font-medium text-gray-700">
                        {data.shippingAddress.address2}
                      </p>
                    )}
                    <p className="text-sm font-medium text-gray-700">
                      {data.shippingAddress?.city},{" "}
                      {data.shippingAddress?.state}{" "}
                      {data.shippingAddress?.zipCode}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {data.shippingAddress?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
