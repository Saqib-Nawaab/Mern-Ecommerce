import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "../../../assets/icons/index.js";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/cart.js";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/heart.js";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server.js";
import { setActivate } from "../../../redux/reducers/profile.js";
import ProductDetailsInfo from "./ProductDetailsInfo.jsx";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const totalReviews = data?.review?.length || 0;
  const totalRating = data?.review?.reduce((acc, item) => acc + item.rating, 0) || 0;
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
      const cartData = { ...data, quantity: count };
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

  const handleMessage = async () => {
    try {
      if (!isAuthenticated) {
        toast.error("Please log in to send a message");
        navigate("/login");
        return;
      }
      const sellerId = data?.seller?._id;
      const userId = user?._id;

      if (!sellerId || !userId) {
        toast.error("Seller or user info missing");
        return;
      }
      const groupTitle = `${user.name}-${data.seller.name}`;

      const { data: convoData } = await axios.post(
        `${server}/conversation/create-new-conversation`,
        { senderId: userId, receiverId: sellerId, groupTitle },
        { withCredentials: true }
      );

      const conversation = convoData?.data;


      dispatch(setActivate(4));
      navigate("/profile", {
        state: {
          openConversation: conversation._id,
          sellerName: data.seller.name,
          sellerAvatar: data.seller.avatar?.url,
        },
      });
    } catch (error) {
      console.error("Message error:", error);
      toast.error(error.response?.data?.message || "Failed to start conversation");
    }
  };

  return (
    <div className="bg-white p-6">
      {data ? (
        <div>
          <div className={`${styles.section} w-[90%] 800px:w-[80%] min-h-screen py-8`}>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2 flex flex-col items-center">
                <img
                  src={data.images?.[select]?.url || "/default-product.png"}
                  alt={data.name}
                  className="w-[60%] rounded-lg"
                />
                <div className="flex gap-3 mt-4">
                  {data?.images.slice(0, 4).map((img, index) => (
                    <img
                      key={index}
                      src={img?.url || ""}
                      alt={`thumbnail-${index}`}
                      onClick={() => setSelect(index)}
                      className={`h-30 w-30 mt-6 object-cover rounded-md border-2 cursor-pointer transition ${
                        select === index ? "border-blue-500 scale-105" : "border-gray-200 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">{data?.name}</h1>
                <p className="text-gray-600 text-sm leading-relaxed">{data?.description}</p>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <h4 className="text-gray-600">${data?.discount_price || data?.discountedPrice}</h4>
                  {data?.price && (<h3 className="text-red-400 line-through">${data?.price}</h3>)}
                </div>
                <div className="flex items-center gap-6 mt-5">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 transition" onClick={() => setCount(count > 1 ? count - 1 : 1)}>-</button>
                    <span className="w-10 text-center text-gray-800 font-medium">{count}</span>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition" onClick={() => setCount(count + 1)}>+</button>
                  </div>
                  <div onClick={handleAddToWishlist}>
                    {click || wishlist.find(item => item._id === data._id) ? (
                      <AiFillHeart
                        title="Remove from Wishlist"
                        size={28}
                        className="cursor-pointer text-red-500 hover:scale-110 transition"
                        onClick={() => setClick(!click)}
                      />
                    ) : (
                      <AiOutlineHeart
                        title="Add to Wishlist"
                        size={28}
                        className="cursor-pointer text-gray-500 hover:scale-110 transition"
                        onClick={() => setClick(!click)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button onClick={handleAddToCart} className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-3 cursor-pointer py-2 rounded-lg flex items-center gap-2 transition">
                    Add to Cart <AiOutlineShoppingCart size={20} />
                  </button>
                  <button onClick={handleMessage} className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-2 cursor-pointer py-2 rounded-lg flex items-center gap-2 transition">
                    Send Message <AiOutlineMessage size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-6 p-4 rounded-lg ">
                  <img
                    onClick={() => navigate(`/seller/${data.seller?._id}`)}
                    src={data?.seller?.avatar?.url || "/default-avatar.png"}
                    className="w-12 h-12 rounded-full border cursor-pointer"
                    alt="shop"
                  />
                  <div>
                    <h3 className="text-gray-800 font-semibold text-lg">{data?.seller?.name ? data.seller.name.toUpperCase() : "No Shop Name"}</h3>
                    <h5 className="text-gray-500 text-sm">
                      {averageRating > 0 ? `${averageRating.toFixed(1)} ⭐` : "No ratings yet"}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br /><br /><br />
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetails;