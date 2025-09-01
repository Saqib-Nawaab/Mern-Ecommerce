import React, {  useState } from "react";
import {
  CgProfile,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "../../../assets/icons/index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "../../Cart/Cart.jsx";
import Heart from "../../Heart/Heart.jsx";
function HomeProfile() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [openCart, setOpenCart] = useState(false);
  const [openheart, setOpenHeart] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);


  return (
    <div>
      <div className="flex items-center space-x-5">
        <button
          onClick={() => setOpenHeart(true)}
          type="button"
          className="relative hover:scale-105 transition"
        >
          <AiOutlineHeart
            size={26}
            className="text-white hover:text-rose-400 transition-colors"
          />
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
            {wishlist && wishlist.length > 0 ? wishlist.length : 0}
          </span>
        </button>

        <button
          onClick={() => setOpenCart(true)}
          type="button"
          className="relative hover:scale-105 transition"
        >
          <AiOutlineShoppingCart
            size={26}
            className="text-white hover:text-yellow-300 transition-colors"
          />
          <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-white text-xs font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
            {cart && cart.length > 0 ? cart.length : 0}
          </span>
        </button>

        {isAuthenticated && user?.avatar?.url ? (
          <Link to="/profile" className="relative hover:scale-105 transition">
            <img
              src={`${user.avatar.url.replace(/\\/g, "/")}`}
              className="w-10 h-10 rounded-4xl border-2 border-blue-500 hover:border-blue-400 transition-all"
              alt="Profile"
            />
          </Link>
        ) : (
          <Link to="/login" className="relative hover:scale-105 transition">
            <CgProfile
              size={26}
              className="text-white hover:text-green-300 transition-colors"
            />
          </Link>
        )}
      </div>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openheart && <Heart setOpenHeart={setOpenHeart} />}
    </div>
  );
}

export default HomeProfile;
