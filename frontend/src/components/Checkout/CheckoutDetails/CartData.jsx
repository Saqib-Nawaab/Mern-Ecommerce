import React from "react";

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
        <p className="text-gray-500 mt-1">Review your order</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            $
            {subTotalPrice.toFixed(2) === "NaN"
              ? "0.00"
              : subTotalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            ${shipping.toFixed(2) === "NaN" ? "0.00" : shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-200 pb-4">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-red-500">
            -$
            {discountPercentenge?.toFixed(2) === "NaN"
              ? "0.00"
              : discountPercentenge.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between pt-4">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-indigo-600">
            ${totalPrice === "NaN" ? "0.00" : totalPrice}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="coupon"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Coupon Code
          </label>
          <div className="flex gap-2">
            <input
              id="coupon"
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CartData;
