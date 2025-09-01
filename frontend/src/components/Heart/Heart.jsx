import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Styles";
import { removeFromWishlist } from "../../redux/actions/heart.js";
import { addTocart } from "../../redux/actions/cart.js"; // Import your cart actions if needed
import { toast } from "react-toastify";
// Main Heart Component
function Heart({ setOpenHeart }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const totalAmount = wishlist.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50">
      <div className="fixed top-0 right-0 min-h-full w-full sm:w-[75%] md:w-[50%] lg:w-[30%] flex flex-col justify-between bg-white p-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-end">
          <RxCross1
            size={26}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setOpenHeart(false)}
          />
        </div>

        <div className={`${styles.normalFlex} p-2 items-center`}>
          <AiOutlineHeart size={26} className="text-gray-700 mr-2" />
          <h3 className="text-gray-800 text-xl font-semibold">Wishlist</h3>
        </div>
        <h5 className="text-gray-500 ml-10 text-sm">{wishlist.length} items</h5>

        {/* Wishlist Items */}
        <div className="w-full border-t border-gray-200 mt-4 pt-4 overflow-y-auto flex-grow">
          {wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <HeartSingle key={index} item={item} />
            ))
          ) : (
            <p className="text-gray-600 text-center py-8">
              Your Favorites is empty.
            </p>
          )}
        </div>

        {/* Total */}
        <div className="mt-4">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Total{" "}
            <span className="ml-2 font-bold">${totalAmount.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Single Wishlist Item
const HeartSingle = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addTocart(item));
    toast.success("Item added to cart successfully!");
  };

  const handleRemoveWishlistItem = (item) => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <div className="border-b border-gray-200 py-4 flex items-center justify-between">
      <RxCross1
        className="cursor-pointer ml-2 hover:text-red-500"
        onClick={() => handleRemoveWishlistItem(item)}
        title="Remove from Wishlist"
      />

      <img
        src={item.images?.[0]?.url}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md mx-4"
      />

      <div className="flex-grow">
        <h1 className="text-gray-800 font-medium text-base line-clamp-2">
          {item.name}
        </h1>
        <h4 className="text-blue-600 font-semibold text-base mt-1">
          ${item?.discountedPrice?.toFixed(2)} USD
        </h4>
      </div>

      <div onClick={() => handleAddToCart(item)} className="cursor-pointer ml-4">
        <BsCartPlus
          size={22}
          className="text-gray-600 hover:text-green-600"
          title="Add to cart"
        />
      </div>
    </div>
  );
};

export default Heart;
