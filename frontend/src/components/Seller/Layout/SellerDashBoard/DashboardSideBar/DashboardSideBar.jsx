import React from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiShoppingBag,
  RxDashboard,
  AiOutlineFolderAdd,
  VscNewFile,
  CiMoneyBill,
  BiMessageSquareDetail,
  AiOutlineGift,
  HiOutlineReceiptRefund,
  CiSettings,
  MdOutlineLocalOffer,
} from "../../../../../assets/icons/index.js";

function DashboardSideBar({ active }) {
  return (
    <div className="h-full">
      <div className="w-full h-[89vh] sticky top-0 left-0 z-10 bg-white border-r border-gray-200 overflow-y-auto">
       <div className="flex flex-col py-4 space-y-4 sm:space-y-4 md:space-y-4 lg:space-y-4">
          <Link
            to="/seller/dashboard"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 1
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <RxDashboard className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              Dashboard
            </span>
          </Link>

          <Link
            to="/seller/dashboard/orders"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 2
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <FiShoppingBag className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              All Orders
            </span>
          </Link>

          <Link
            to="/seller/dashboard/products"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 3
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <FiPackage className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              All Products
            </span>
          </Link>

          <Link
            to="/seller/dashboard/create-product"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 4
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <AiOutlineFolderAdd className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              Create Product
            </span>
          </Link>

          <Link
            to="/seller/dashboard/events"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 5
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <MdOutlineLocalOffer className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              All Events
            </span>
          </Link>

          <Link
            to="/seller/dashboard/create-events"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 6
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <VscNewFile className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              Create Events
            </span>
          </Link>

          <Link
            to="/seller/dashboard/withdraw-money"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 7
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <CiMoneyBill className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              Withdraw Money
            </span>
          </Link>

          <Link
            to="/seller/dashboard/shop-inbox"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 8
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <BiMessageSquareDetail className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              Shop Inbox
            </span>
          </Link>

          <Link
            to="/seller/dashboard/coupons"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 9
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <AiOutlineGift className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              Discount Codes
            </span>
          </Link>

          <Link
            to="/seller/dashboard/refunds"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 10
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <HiOutlineReceiptRefund className="mr-3" size={24} />
            <span className="text-base font-medium hidden lg:block md:block">
              Refunds
            </span>
          </Link>

          <Link
            to="/seller/dashboard/settings"
            className={`flex items-center px-6 py-3 transition-all duration-200 ${
              active === 11
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            <CiSettings className="mr-3" size={28} />
            <span className="text-base font-medium hidden lg:block md:block">
              Settings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardSideBar;
