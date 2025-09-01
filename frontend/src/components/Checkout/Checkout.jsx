import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { IoIosArrowRoundForward } from "react-icons/io";
import ShippingInfo from "./CheckoutDetails/ShippingInfo.jsx";
import CartData from "./CheckoutDetails/CartData.jsx";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + (item.quantity || 0) * (item.discountedPrice || 0),
    0
  );
  const shipping = subTotalPrice * 0.1;

  const discountPercentenge = couponCodeData ? discountPrice : 0;
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paymentSubmit = () => {
    if (!address1 || !address2 || !zipCode || !country || !city) {
      toast.error("Please choose your delivery address!");
      return;
    }

    const shippingAddress = { address1, address2, zipCode, country, city };
    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${server}/coupon/getCoupon/${couponCode}`
      );
      const coupon = data.message;

      if (data.success === false) {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
        return;
      } else {
        toast.success("Coupon code applied successfully!");
      }

      const sellerId = coupon.sellerId;
      const couponValue = coupon.value;
      const validItems = cart.filter((item) => item.sellerId === sellerId);

      if (validItems.length === 0) {
        toast.error("Coupon code is not valid for this shop");
        setCouponCode("");
        return;
      }



      const eligiblePrice = validItems.reduce(
        (acc, item) => acc + item.quantity * item.discountedPrice,
        0
      );

      const discount = (eligiblePrice * couponValue) / 100;
      setDiscountPrice(discount);
      setCouponCodeData(coupon);
      setCouponCode("");
    } catch (err) {
      console.error("Coupon fetch error:", err);
      toast.error(
        `Invalid coupon request! ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <ShippingInfo
            user={user}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />

          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={paymentSubmit}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="flex items-center justify-center cursor-pointer">
              <span className="text-lg font-semibold">Proceed to Payment</span>
              <IoIosArrowRoundForward className="ml-2 w-10 h-10" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
