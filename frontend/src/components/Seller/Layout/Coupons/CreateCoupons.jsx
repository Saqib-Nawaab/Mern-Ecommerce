import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../../redux/actions/product.js";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { createCoupon } from "../../../../redux/actions/coupon.js";
import { useState } from "react";
import {
  resetCouponSuccess,
  resetCouponState,
} from "../../../../redux/actions/coupon.js";

function CreateCoupons({ setOpen, onClose }) {
  const dispatch = useDispatch();

  const { seller } = useSelector((state) => state.seller);
  const { product } = useSelector((state) => state.product);
  const { isLoading, success, error } = useSelector((state) => state.coupon);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllProducts(seller._id));
    }
  }, [dispatch, seller]);

  useEffect(() => {
    if (setOpen) {
      dispatch(resetCouponState());
    }
  }, [dispatch, setOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !value || !minAmount || !maxAmount || !selectedProduct) {
      return alert("Please fill all fields");
    }

    dispatch(resetCouponState());

    const coupounData = {
      name,
      value,
      minAmount,
      maxAmount,
      selectedProduct,
      sellerId: seller._id,
    };

    const toastId = toast.loading("Creating Coupon...");

    try {
      await dispatch(createCoupon(coupounData));
      toast.dismiss(toastId);
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (success) {
      toast.dismiss();
      toast.success("Coupon Created Successfully", { autoClose: 3000 });

      setName("");
      setValue("");
      setMinAmount("");
      setMaxAmount("");
      setSelectedProduct("");
      setOpen(false);
      onClose();
      dispatch(resetCouponSuccess());
    } else if (error) {
      toast.dismiss();
      toast.error(error || "Failed to create coupon", { autoClose: 3000 });
    }
  }, [success, error, dispatch]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000004b] ">
      <div className="w-[95%] md:w-[50%] lg:w-[40%]  h-[72vh] overflow-y-auto bg-white p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create Coupon</h2>
          <RxCross1
            onClick={() => handleClose()}
            className="cursor-pointer text-gray-500 hover:text-gray-800 text-xl"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter coupon name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Discount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter discount value"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="e.g., 100"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="e.g., 1000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Product <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a product</option>
              {product &&
                product.message.map((product) => (
                  <option key={product._id} value={product.name}>
                    {product.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-center pt-7">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-5 py-2 cursor-pointer flex items-center justify-center rounded-lg font-semibold text-white transition ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCoupons;
