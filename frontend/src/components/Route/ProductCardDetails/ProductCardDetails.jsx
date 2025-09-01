import React, { useState } from "react";
import {
  RxCross1,
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
} from "../../../assets/icons/index.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTocart } from "../../../redux/actions/cart.js";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/heart.js";
function ProductCardDetails({ open, setOpen, data, click, setClick }) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalReviews = data?.review?.length || 0;
  const totalRating =
    data?.review?.reduce((acc, item) => acc + item.rating, 0) || 0;
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const handleAddToCart = () => {
    if (count > data.stock) {
      toast.error("Quantity exceeds available stock");
      return;
    }

    const existingItem = cart.find((item) => item._id === data._id);
    if (existingItem) {
      toast.error("Item already in cart");
    } else {
      const cartData = {
        ...data,
        quantity: count,
      };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart");
    }
  };

  const handleAddToWishlist = () => {
    const existingItem = wishlist.find((item) => item._id === data._id);
    if (existingItem) {
      dispatch(removeFromWishlist(data));
      setClick(false);
    } else {
      dispatch(addToWishlist(data));
      setClick(true);
    }
  };

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50 px-2">
      <div className="bg-gray-100 rounded-lg p-4 sm:p-6 w-full max-w-lg md:max-w-3xl max-h-[85vh] overflow-y-auto relative shadow-lg">
        <RxCross1
          size={24}
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
          onClick={() => setOpen(false)}
        />

        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
          <div className="md:w-[40%] flex flex-col items-center">
            <img
              src={data.images?.[0]?.url}
              alt={data.name}
              className="w-full max-h-[220px] sm:max-h-[300px] object-contain rounded-lg border border-gray-100 p-2 bg-gray-50"
            />
            <div className="flex items-center gap-3 mt-4 w-full">
              <img
                onClick={() => navigate(`/seller/${data.seller?._id}`)}
                src={data.seller?.avatar?.url}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border object-cover"
                alt={data.seller?.name}
              />
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                  {data.seller?.name}
                </h3>
                <div className="text-yellow-500 text-xs sm:text-sm">
                  {averageRating.toFixed(1) || `4.5`} Rating <br />
                  <span className="text-green-600 font-medium">
                    {data.sold_out} Sold
                  </span>
                </div>
              </div>
              <div className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm rounded-full px-3 py-1.5 flex items-center gap-1 cursor-pointer transition">
                Send <AiOutlineMessage size={14} />
              </div>
            </div>
          </div>

          <div className="md:w-[60%] flex flex-col justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                {data.name}
              </h1>
              <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
                {data.description}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg sm:text-xl font-bold text-blue-600">
                  {data.discountedPrice}$
                </h4>
                {data.price && (
                  <h3 className="text-red-500 line-through text-sm sm:text-base">
                    {data.originalPrice}$
                  </h3>
                )}
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
                    onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  >
                    -
                  </button>
                  <span className="w-9 sm:w-10 text-center text-gray-800 font-medium text-sm sm:text-base">
                    {count}
                  </span>
                  <button
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
                <div onClick={handleAddToWishlist} className="cursor-pointer">
                  {click ? (
                    <AiFillHeart
                      title="Remove from Wishlist"
                      size={26}
                      onClick={() => setClick(!click)}
                      color="red"
                    />
                  ) : (
                    <AiOutlineHeart
                      title="Add to Wishlist"
                      size={26}
                      onClick={() => setClick(!click)}
                      color="gray"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5 pt-3 border-t">
              <button
                className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg text-sm sm:text-base transition"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg text-sm sm:text-base transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardDetails;
