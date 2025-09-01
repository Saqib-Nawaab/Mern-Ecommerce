import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refundOrder, getAllOrders } from "../../../redux/actions/order.js";
import { toast } from "react-toastify";
function OrderRefund({ refundOrderData, setOpen }) {
  const { order } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleRefund = () => {
    dispatch(refundOrder(refundOrderData._id))
      .then(() => {
        dispatch(getAllOrders(user._id)); 
        setOpen(false);
        toast.success("Refund successful!");
      })
      .catch((err) => {
        console.error("Refund failed:", err);
        toast.error("Refund failed. Please try again.");
      });
  };


  return (
    <div>
      <div className="fixed inset-0 bg-[#0000004b] flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">Refund Order</h2>
          <p className="mb-4">Are you sure you want to refund this order?</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
              onClick={handleRefund}
            >
              Confirm Refund
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderRefund;
