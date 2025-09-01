import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
} from "../../../assets/icons/index.js";
import ProductCardDetails from "../ProductCardDetails/ProductCardDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/heart.js";

function ProductCard({ data, isEvent }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlist?.find((item) => item._id === data._id);
  const [click, setClick] = useState(!!isInWishlist);

  useEffect(() => {
    setClick(!!isInWishlist);
  }, [wishlist, data._id]);

  const handleWishlistClick = () => {
    if (click) {
      dispatch(removeFromWishlist(data));
    } else {
      dispatch(addToWishlist(data));
    }
    setClick(!click);
  };

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const totalReviews = data?.review?.length || 0;
  const totalRating =
    data?.review?.reduce((acc, item) => acc + item.rating, 0) || 0;
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const stars = [1, 2, 3, 4, 5].map((num) =>
    num <= averageRating ? (
      <AiFillStar key={num} />
    ) : (
      <AiOutlineStar key={num} />
    )
  );

  const product_name = data.name.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full h-[370px] relative cursor-pointer">
      <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
        {click ? (
          <AiFillHeart
            title="Remove from Wishlist"
            size={22}
            onClick={handleWishlistClick}
            color="red"
          />
        ) : (
          <AiOutlineHeart
            title="Add to Wishlist"
            size={22}
            onClick={handleWishlistClick}
            color="gray"
          />
        )}
        <AiOutlineEye
          title="View Product"
          size={22}
          onClick={() => setOpen(!open)}
          color={open ? "blue" : "gray"}
        />
        <AiOutlineShoppingCart
          title="Add to Cart"
          size={22}
          onClick={() => setOpen(!open)}
          color={open ? "blue" : "gray"}
        />
      </div>

      {open && (
        <ProductCardDetails
          open={open}
          setClick={setClick}
          click={click}
          setOpen={setOpen}
          data={data}
        />
      )}

      <Link
        to={`/products/${product_name}${isEvent ? "?isEvent=true" : ""}`}
        onClick={handleScrollToTop}
        className="flex flex-col items-center mb-2"
      >
        <img
          src={data.images?.[0]?.url}
          alt={data.name}
          className="w-full h-[170px] object-contain hover:scale-105 transition-transform duration-400"
        />
      </Link>

      <Link to={`/seller/${data.seller?._id}`} className="block mb-1">
        <h5 className={styles.shop_name}>
          {data.seller?.name || "Unknown Shop"}
        </h5>
      </Link>

      <Link
        to={`/products/${product_name}${isEvent ? "?isEvent=true" : ""}`}
        onClick={handleScrollToTop}
        className="block"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
          {data.name.length > 35 ? `${data.name.slice(0, 35)}...` : data.name}
        </h3>

        <div className="flex gap-1 mb-2">
          {stars.map((star, index) => (
            <span key={index} className="text-yellow-500 text-xl">
              {star}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <h5 className={styles.productDiscountPrice}>
              {data.discountedPrice
                ? `${data.discountedPrice}$`
                : `${data.originalPrice}$`}
            </h5>
            {data.discountedPrice && (
              <h4 className={styles.price}>{`${data.originalPrice}$`}</h4>
            )}
          </div>
          <span className="font-semibold text-green-500 text-sm">
            {data.sold_out} Sold
          </span>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
