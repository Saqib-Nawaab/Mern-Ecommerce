import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import { MdLocalOffer } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function AdminSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Determine active tab based on current route
  const getActiveState = () => {
    const path = location.pathname;
    if (path === "/admin") return 1;
    if (path === "/admin-users") return 2;
    if (path === "/admin-sellers") return 3;
    if (path === "/admin-products") return 4;
    if (path === "/admin-orders") return 5;
    if (path === "/admin-events") return 6;
    if (path === "/admin-withdraw-request") return 7;
    return 1;
  };

  const active = getActiveState();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-full transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="w-full h-[89vh] sticky top-0 left-0 z-10 bg-white border-r border-gray-200 overflow-y-auto shadow-sm">
        {/* Toggle Button */}
        <div className="flex justify-end p-4 border-b border-gray-100">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <RiArrowRightSLine size={20} />
            ) : (
              <RiArrowLeftSLine size={20} />
            )}
          </button>
        </div>

        <div className="flex flex-col py-4 space-y-1">
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 transition-all duration-200 mx-2 rounded-lg ${
              active === 1
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <RxDashboard
              className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
              size={22}
            />
            {!isCollapsed && (
              <span className="text-base font-medium">Dashboard</span>
            )}
          </Link>

          <Link
            to="/admin-users"
            className={`flex items-center px-6 py-3 transition-all duration-200 mx-2 rounded-lg ${
              active === 2
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <AiOutlineUser
              className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
              size={22}
            />
            {!isCollapsed && (
              <span className="text-base font-medium">Users</span>
            )}
          </Link>

          <Link
            to="/admin-sellers"
            className={`flex items-center px-6 py-3 transition-all duration-200 mx-2 rounded-lg ${
              active === 3
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <FiShoppingBag
              className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
              size={22}
            />
            {!isCollapsed && (
              <span className="text-base font-medium">Sellers</span>
            )}
          </Link>

          <Link
            to="/admin-products"
            className={`flex items-center px-6 py-3 transition-all duration-200 mx-2 rounded-lg ${
              active === 4
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <FiPackage
              className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
              size={22}
            />
            {!isCollapsed && (
              <span className="text-base font-medium">Products</span>
            )}
          </Link>

          <Link
            to="/admin-orders"
            className={`flex items-center px-6 py-3 transition-all duration-200 mx-2 rounded-lg ${
              active === 5
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <FiShoppingBag
              className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
              size={22}
            />
            {!isCollapsed && (
              <span className="text-base font-medium">Orders</span>
            )}
          </Link>

          <Link
            to="/admin-events"
            className={`flex items-center px-6 py-3 transition-all duration-200 mx-2 rounded-lg ${
              active === 6
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <MdLocalOffer
              className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
              size={22}
            />
            {!isCollapsed && (
              <span className="text-base font-medium">Events</span>
            )}
          </Link>

          <Link
            to="/admin-withdraw-request"
            className={`flex items-center px-6 py-3 transition-all duration-200 mx-2 rounded-lg ${
              active === 7
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <CiMoneyBill
              className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
              size={22}
            />
            {!isCollapsed && (
              <span className="text-base font-medium">Withdrawals</span>
            )}
          </Link>
        </div>

        {/* Sidebar footer with version info */}
        {!isCollapsed && (
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Admin Panel v1.2.0
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;
