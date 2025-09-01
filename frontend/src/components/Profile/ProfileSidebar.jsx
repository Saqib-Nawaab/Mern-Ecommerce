import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  HiOutlineShoppingBag,
  RxPerson,
  HiOutlineReceiptRefund,
  TbAddressBook,
  MdOutlineTrackChanges,
  RiLockPasswordLine,
  AiOutlineLogin,
  AiOutlineMessage,
} from "../../assets/icons/index.js";
import { server } from "../../server.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user.js";

function ProfileSidebar({ activate, setActivate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogOuthandler = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-2 md:p-6 md:pt-8 space-y-2 md:space-y-4">
        {[
          { id: 1, icon: RxPerson, label: "Profile" },
          { id: 2, icon: HiOutlineShoppingBag, label: "Orders" },
          { id: 3, icon: HiOutlineReceiptRefund, label: "Refunds" },
          { id: 4, icon: AiOutlineMessage, label: "Inbox" },
          { id: 5, icon: MdOutlineTrackChanges, label: "Track Order" },
          { id: 6, icon: RiLockPasswordLine, label: "Change Password" },
          { id: 7, icon: TbAddressBook, label: "Address" },
          { id: 8, icon: AiOutlineLogin, label: "Log out" },
        ].map((item) => (
          <div
            key={item.id}
            className={`group flex items-center cursor-pointer p-2 md:p-3 rounded-lg transition-colors ${
              activate === item.id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
            }`}
            onClick={() => item.id === 8 ? LogOuthandler() : setActivate(item.id)}
          >
            <item.icon
              className={`text-xl md:text-xl ${
                activate === item.id
                  ? "text-blue-600"
                  : "text-gray-600 group-hover:text-blue-400"
              }`}
            />
            <span
              className={`text-sm md:text-base ml-2 hidden md:block whitespace-nowrap transition-colors ${
                activate === item.id
                  ? "font-medium text-blue-600"
                  : "group-hover:text-blue-400"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSidebar;