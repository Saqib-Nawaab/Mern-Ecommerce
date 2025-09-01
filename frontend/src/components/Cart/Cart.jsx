import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../../redux/actions/cart.js";
import { toast } from "react-toastify";

function Cart({ setOpenCart }) {
  const { cart } = useSelector((state) => state.cart);
  const cartData = cart || [];

  const totalAmount = cartData.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50">
      <div className="fixed top-0 right-0 min-h-full w-full sm:w-[75%] md:w-[50%] lg:w-[30%] flex flex-col justify-between bg-white p-4 shadow-lg">
        {/* Cart Header */}
        <div className="flex flex-col flex-grow">
          <div className="flex justify-end mb-4">
            <RxCross1
              size={26}
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
              onClick={() => setOpenCart(false)}
            />
          </div>

          <div className="flex p-2 items-center">
            <IoBagHandleOutline size={26} className="text-gray-700 mr-2" />
            <h3 className="text-gray-800 text-xl font-semibold">
              Shopping Cart
            </h3>
          </div>
          <h5 className="text-gray-500 ml-10 text-sm">
            {cartData.length} items
          </h5>

          {/* Cart Items Container */}
          <div className="w-full border-t border-gray-200 mt-4 pt-4 overflow-y-auto flex-grow">
            {cartData.length > 0 ? (
              cartData.map((item, index) => (
                <CartSingle key={index} item={item} />
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">
                Your cart is empty.
              </p>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        {cartData.length > 0 && (
          <div className="mt-4">
            <Link to="/checkout" className="block">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-lg font-medium">
                Checkout Now
                <span className="ml-2 font-bold">
                  ${totalAmount.toFixed(2)}
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const CartSingle = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    if (newQuantity > item.stock) {
      toast.error("Quantity exceeds available stock.");
      return;
    }

    setQuantity(newQuantity);
    const updatedItem = { ...item, quantity: newQuantity };
    dispatch(updateCartItem(updatedItem));
  };

  const handleRemoveCartItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const totalPrice = item.discountedPrice * quantity;

  return (
    <div className="border-b border-gray-200 py-4 flex items-center justify-between">
      <div className="flex flex-col items-center mr-4">
        <div
          onClick={() => handleQuantityChange(quantity + 1)}
          className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-200"
        >
          <HiPlus size={18} />
        </div>
        <span className="text-gray-700 text-base font-medium my-1">
          {quantity}
        </span>
        <div
          onClick={() => handleQuantityChange(quantity - 1)}
          className="bg-gray-200 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors duration-200"
        >
          <HiOutlineMinus size={18} />
        </div>
      </div>

      <img
        src={item.images?.[0]?.url}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md mr-4"
      />

      <div className="flex-grow">
        <h1 className="text-gray-800 font-medium text-base line-clamp-2">
          {item.name}
        </h1>
        <h4 className="text-gray-600 text-sm mt-1">
          ${item.discountedPrice.toFixed(2)} x {quantity}
        </h4>
        <h4 className="text-blue-600 font-semibold text-base mt-1">
          ${totalPrice.toFixed(2)} USD
        </h4>
      </div>

      <div
        onClick={() => handleRemoveCartItem(item)}
        className="cursor-pointer ml-4"
      >
        <RxCross1
          size={20}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default Cart;
