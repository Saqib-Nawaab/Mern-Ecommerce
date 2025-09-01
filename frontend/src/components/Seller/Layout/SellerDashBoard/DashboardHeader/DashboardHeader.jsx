import React from "react";
import {
  AiOutlineGift,
  MdLocalOffer,
  FiShoppingBag,
  FiPackage,
  BiMessageSquareDetail,
} from "../../../../../assets/icons/index.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SellerDashBoardHeader() {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div>
      <div className="w-full h-20 bg-white shadow-sm flex items-center justify-between px-4">
        <div>
          <Link
            to="/"
            className="text-2xl   font-bold text-gray-800 "
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJGyCePXO3jxRy9jA9dzJDzIjTgSojXrdwnw&s"
              alt="Logo"
              className="w-[170px]  xs:w-[120px] sm:w-[170px] md:w-[170px] h-auto object-contain p-2 hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={"/seller/dashboard/coupons"}
            className="text-gray-600 hover:text-gray-800 lg:block hidden md:block "
          >
            <div className="flex items-center gap-2 ">
              <AiOutlineGift size={30} className="text-2xl text-gray-600 hover:text-blue-600" />
            </div>
          </Link>
          <Link
            to={"/seller/dashboard/events"}
            className="text-gray-600 hover:text-gray-800 lg:block hidden md:block"
          >
            <div className="flex items-center gap-2 ">
              <MdLocalOffer size={30} className="text-2xl text-gray-600 hover:text-blue-600" />
            </div>
          </Link>
          <Link
            to={"/seller/dashboard/products"}
            className="text-gray-600 hover:text-gray-800 lg:block hidden md:block"
          >
            <div className="flex items-center gap-2 ">
              <FiShoppingBag size={30} className="text-2xl text-gray-600 hover:text-blue-600" />
            </div>
          </Link>
          <Link
            to={"/seller/dashboard/orders"}
            className="text-gray-600 hover:text-gray-800 lg:block hidden md:block"
          >
            <div className="flex items-center gap-2 ">
              <FiPackage size={30} className="text-2xl text-gray-600 hover:text-blue-600" />
            </div>
          </Link>
          <Link
            to={"/seller/dashboard/messages"}
            className="text-gray-600 hover:text-gray-800 lg:block hidden md:block"
          >
            <div className="flex items-center gap-2 ">
              <BiMessageSquareDetail
                size={30}
                className="text-2xl text-gray-600 hover:text-blue-600"
              />
            </div>
          </Link>
          <Link
            to={`/seller/${seller._id}`}
            className="text-gray-600 hover:text-gray-800"
          >
            <img
              src={`${seller.avatar.url.replace(/\\/g, "/")}`}
              className="w-10 h-10 rounded-4xl border-2 border-blue-500 hover:border-blue-400  hover:scale-105 transition-transform duration-200"
              alt="Profile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SellerDashBoardHeader;
