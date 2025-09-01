import React, { useState, useEffect } from "react";
import ProductCard from "../../../../Route/ProductCard/ProductCard.jsx";
import styles from "../../../../../styles/Styles.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../../../redux/actions/product.js";
import Loading from "../../../../Loading/Loading.jsx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import SellerAllReviews from "./SellerAllReviews/SellerAllReviews.jsx";
import { getAllEvents } from "../../../../../redux/actions/event.js";
function SellerProfileData({ isOwner }) {
  const [activeTab, setActiveTab] = useState(1);
  const { seller } = useSelector((state) => state.seller);
  const { product, isLoading } = useSelector((state) => state.product);
  const { event } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(seller._id));
  }, [dispatch]);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEvents(seller._id));
    }
  }, [dispatch, seller?._id]);




  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex items-center justify-between px-6 py-4 bg-white rounded-t-md border-b border-gray-200">
          <div className="flex flex-wrap gap-6">
            <h5
              className={`text-[18px] font-semibold cursor-pointer transition-all ${
                activeTab === 1
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Shop Products
            </h5>

            <h5
              className={`text-[18px] font-semibold cursor-pointer transition-all ${
                activeTab === 2
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(2)}
            >
              Running Events
            </h5>

            <h5
              className={`text-[18px] font-semibold cursor-pointer transition-all ${
                activeTab === 3
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(3)}
            >
              Shop Reviews
            </h5>
          </div>

          {isOwner && (
            <Link
              to="/seller/dashboard"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
        {activeTab === 1 && (
          <div className={`${styles.section} py-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product && product.message.length > 0 ? (
                product.message.map((item, index) => (
                  <ProductCard key={index} data={item} />
                ))
              ) : isLoading ? (
                <div>
                  <Loading />
                </div>
              ) : (
                <div className="col-span-full text-center py-10">
                  <h2 className="text-xl font-semibold text-blue-500">
                    No Products Found !!
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className={`${styles.section} py-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {event && event?.message?.length > 0 ? (
                event?.message.map((item, index) => (
                  <ProductCard key={index} data={item} isEvent={true} />
                ))
              ) : isLoading ? (
                <div>
                  <Loading />
                </div>
              ) : (
                <div className="col-span-full text-center py-10">
                  <h2 className="text-xl font-semibold text-blue-500">
                    No Events Found !!
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="w-full">
            <SellerAllReviews />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProfileData;
