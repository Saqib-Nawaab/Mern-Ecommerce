import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate("/profile");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-pulse" />
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-4">
        Thank you for shopping with us. Your order has been placed and is being processed.
      </p>
      <p className="text-gray-500 text-sm mb-6">
        You will receive an email confirmation shortly.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleViewOrders}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View My Orders
        </button>
        <button
          onClick={handleContinueShopping}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
