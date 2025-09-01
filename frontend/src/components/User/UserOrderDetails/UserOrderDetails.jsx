import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsFillBagFill, BsArrowLeft, BsCheckCircle } from "react-icons/bs";
import { FiTruck, FiPackage, FiXCircle } from "react-icons/fi";
import { getAllOrders } from "../../../redux/actions/order.js";
import { useState } from "react";
import Loading from "../../Loading/Loading.jsx";
import OrderRefund from "./OrderRefund.jsx";
import OrderReview from "./OrderReview.jsx";
function UserOrderDetails() {
  const { order, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [openReview, setOpenReview] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [refundOrderData, setRefundOrderData] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAllOrders(user._id));
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [dispatch, user?._id]);

  const data = order?.data?.find((item) => item._id === id) || null;

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
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
      default:
        return <FiPackage className="text-yellow-500 mr-2" />;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div clasName="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-sm text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/profile"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <BsArrowLeft className="mr-2" /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount =
    data.cart?.reduce(
      (sum, item) =>
        sum + item.quantity * (item.discountedPrice || item.originalPrice || 0),
      0
    ) || 0;

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <BsFillBagFill className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-700">
                Order Details
              </h1>
              <p className="text-sm text-gray-500">Order ID: {data._id}</p>
            </div>
          </div>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
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
                          data.status?.toLowerCase() === "delivered"
                            ? "text-green-600"
                            : data.status?.toLowerCase() === "cancelled" ||
                              data.status?.toLowerCase() === "refunded" ||
                              data.status?.toLowerCase() === "refund processing"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {data.status || "Processing"}
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
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">
                  Products ({data.cart?.length || 0})
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {data.cart?.map((item, index) => (
                  <div key={item._id} className="p-5">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <Link
                            to={`/products/${item?.name
                              ?.toLowerCase()
                              ?.split(" ")
                              ?.join("-")}${
                              item?.status == "upcoming" ? "?isEvent=true" : ""
                            }`}
                          >
                            <img
                              src={
                                item.images?.[0]?.url || "/default-product.png"
                              }
                              alt={item.name}
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-400 "
                              onError={(e) => {
                                e.target.src = "/default-product.png";
                              }}
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-700 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 mb-3">
                            {item.category}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-xs text-gray-500">Quantity</p>
                              <p className="font-medium text-gray-700">
                                {item.quantity}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Price</p>
                              <p className="font-medium text-blue-600">
                                $
                                {(
                                  item.discountedPrice ||
                                  item.originalPrice ||
                                  0
                                ).toFixed(2)}
                              </p>
                            </div>
                            {item.discountedPrice &&
                              item.discountedPrice !== item.originalPrice && (
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Original
                                  </p>
                                  <p className="font-medium text-red-400 line-through">
                                    ${item.originalPrice.toFixed(2)}
                                  </p>
                                </div>
                              )}
                            <div>
                              <p className="text-xs text-gray-500">Subtotal</p>
                              <p className="font-medium text-green-600">
                                $
                                {(
                                  item.quantity *
                                  (item.discountedPrice ||
                                    item.originalPrice ||
                                    0)
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {data.status?.toLowerCase() !== "refunded" && (
                        <div className="flex items-center sm:justify-end mt-4 sm:mt-0">
                          <button
                            onClick={() => {
                              setOpenReview(true);
                              setReviewProduct(item);
                            }}
                            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                          >
                            Write Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">User Information</h3>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <img
                    src={data.user?.avatar?.url || "/default-avatar.png"}
                    alt={data.user?.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-700">
                      {data.user?.name || "Unknown User"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {data.user?.email || "No email provided"}
                    </p>
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
                      {data.shippingAddress?.address1 || "No address provided"}
                    </p>
                    {data.shippingAddress?.address2 && (
                      <p className="text-sm font-medium text-gray-700">
                        {data.shippingAddress.address2}
                      </p>
                    )}
                    <p className="text-sm font-medium text-gray-700">
                      {data.shippingAddress?.city || "Unknown city"},{" "}
                      {data.shippingAddress?.state || "Unknown state"}{" "}
                      {data.shippingAddress?.zipCode || ""}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {data.shippingAddress?.country || "Unknown country"}
                    </p>
                  </div>
                </div>

                {data.status?.toLowerCase() !== "cancelled" && (
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        data.status?.toLowerCase() === "refunded" ||
                        data.status?.toLowerCase() === "refund processing" ||
                        data.status?.toLowerCase() === "delivered"
                          ? setRefundOrderData("")
                          : setOpenRefund(true);
                        setRefundOrderData(data);
                      }}
                      className={`w-full px-4 py-2.5 text-sm font-medium ${
                        data.status?.toLowerCase() === "refunded"
                          ? "text-blue-500 bg-blue-100"
                          : data.status?.toLowerCase() === "refund processing"
                          ? "text-gray-600 bg-gray-200"
                          : data.status?.toLowerCase() === "delivered"
                          ? "text-green-600 bg-green-50 hover:bg-green-100"
                          : "text-red-600 bg-red-50 hover:bg-red-100"
                      } rounded-lg transition-colors duration-200 flex items-center justify-center`}
                    >
                      {data.status?.toLowerCase() === "refunded"
                        ? "Refund Complete"
                        : data.status?.toLowerCase() === "refund processing"
                        ? "Refund Processing"
                        : data.status?.toLowerCase() === "delivered"
                        ? "Order Delivered"
                        : "Request Refund"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openReview && (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <OrderReview
              product={reviewProduct}
              setOpen={setOpenReview}
              open={openReview}
            />
          </div>
        </div>
      )}

      {openRefund && (
        <div className="fixed inset-0 bg-[#0000004b] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <OrderRefund
              refundOrderData={refundOrderData}
              setOpen={setOpenRefund}
              open={openRefund}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrderDetails;
