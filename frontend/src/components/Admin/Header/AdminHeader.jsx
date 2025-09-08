import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actions/user";
import {
  IoNotificationsOutline,
  IoSearch,
  IoMenu,
  IoLogOutOutline,
  IoSettingsOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      text: "New event registration received",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      text: "Ticket sales report is ready",
      time: "2 hours ago",
      read: false,
    },
    { id: 3, text: "System update completed", time: "1 day ago", read: true },
  ];

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="h-16 flex items-center justify-between px-4 lg:px-6">
        {/* Left section - Logo and menu toggle */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors lg:hidden">
            <IoMenu className="text-xl text-gray-600" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJGyCePXO3jxRy9jA9dzJDzIjTgSojXrdwnw&s"
              alt="Logo"
              className="w-24 h-16 object-cover"
            />
          </Link>
        </div>

        {/* Right section - Search, notifications, profile */}
        <div className="flex items-center gap-3">
          {/* Search icon for mobile */}
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors md:hidden">
            <IoSearch className="text-xl text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition-colors relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <IoNotificationsOutline className="text-xl text-gray-600" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <span className="text-xs text-blue-600 cursor-pointer">
                    Mark all as read
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-800">
                          {notification.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-center text-gray-500 text-sm">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <Link
                    to="/admin/notifications"
                    className="text-sm text-blue-600 font-medium block text-center"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                Admin User
              </span>
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <Link
                  to="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <IoPersonCircleOutline className="mr-2 text-lg" />
                  Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <IoSettingsOutline className="mr-2 text-lg" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <IoLogOutOutline className="mr-2 text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;







