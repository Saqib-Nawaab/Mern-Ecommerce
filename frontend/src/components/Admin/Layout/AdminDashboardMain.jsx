import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../../redux/actions/admin";
import {
  AiOutlineUser,
  AiOutlineShop,
  AiOutlineShopping,
  AiOutlineGift,
  AiOutlineCalendar,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineEye,
} from "react-icons/ai";
import { BsBoxSeam, BsClockHistory } from "react-icons/bs";
import {
  FiShoppingBag,
  FiPackage,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { BiPurchaseTag } from "react-icons/bi";
import { Link } from "react-router-dom";

function AdminDashboardMain() {
  const dispatch = useDispatch();
  const { dashboardStats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  const stats = [
    {
      title: "Total Users",
      value: dashboardStats?.totalUsers || 0,
      icon: AiOutlineUser,
      color: "bg-blue-500",
      change: dashboardStats?.userGrowth || 0,
    },
    {
      title: "Total Sellers",
      value: dashboardStats?.totalSellers || 0,
      icon: AiOutlineShop,
      color: "bg-green-500",
      change: dashboardStats?.sellerGrowth || 0,
    },
    {
      title: "Total Products",
      value: dashboardStats?.totalProducts || 0,
      icon: BsBoxSeam,
      color: "bg-purple-500",
      change: dashboardStats?.productGrowth || 0,
    },
    {
      title: "Total Orders",
      value: dashboardStats?.totalOrders || 0,
      icon: AiOutlineShopping,
      color: "bg-orange-500",
      change: dashboardStats?.orderGrowth || 0,
    },
    {
      title: "Total Events",
      value: dashboardStats?.totalEvents || 0,
      icon: AiOutlineCalendar,
      color: "bg-pink-500",
      change: dashboardStats?.eventGrowth || 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      {/* Header Section */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change >= 0;
          const ChangeIcon = isPositive ? FiTrendingUp : FiTrendingDown;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon size={22} className="text-white" />
                </div>
                {stat.change !== 0 && (
                  <div
                    className={`flex items-center text-sm font-medium ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <ChangeIcon size={14} className="mr-1" />
                    <span>{Math.abs(stat.change)}%</span>
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <span className="inline-block h-8 w-12 bg-gray-200 rounded animate-pulse"></span>
                ) : (
                  stat.value.toLocaleString()
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Users
            </h2>
            <Link to="/admin-users">
              <button className="text-sm text-blue-600 font-medium flex items-center">
                View All <AiOutlineEye className="ml-1" />
              </button>
            </Link>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : dashboardStats?.recentUsers?.length ? (
            <ul className="space-y-4">
              {dashboardStats.recentUsers.map((user, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <img
                    src={user?.avatar?.url || "/default-avatar.png"}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent users</p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
            <button className="text-sm text-blue-600 font-medium flex items-center">
              View All <AiOutlineEye className="ml-1" />
            </button>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : dashboardStats?.recentOrders?.length ? (
            <ul className="space-y-4">
              {dashboardStats.recentOrders.map((order, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiPackage size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Order #{order._id?.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.user?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${order.totalPrice?.toFixed(2) || "0.00"}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent orders</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sellers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Sellers
            </h2>
            <button className="text-sm text-blue-600 font-medium flex items-center">
              View All <AiOutlineEye className="ml-1" />
            </button>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : dashboardStats?.recentSellers?.length ? (
            <ul className="space-y-4">
              {dashboardStats.recentSellers.map((seller, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FiShoppingBag size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {seller.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {seller.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(seller.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent sellers</p>
          )}
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Products
            </h2>
            <button className="text-sm text-blue-600 font-medium flex items-center">
              View All <AiOutlineEye className="ml-1" />
            </button>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : dashboardStats?.recentProducts?.length ? (
            <ul className="space-y-4">
              {dashboardStats.recentProducts.map((product, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <img
                    src={product?.images?.[0]?.url || "/default-product.png"}
                    alt={product?.name}
                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${product.price?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent products</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardMain;
