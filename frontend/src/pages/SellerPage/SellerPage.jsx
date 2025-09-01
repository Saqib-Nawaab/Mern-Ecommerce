import React, { useState } from "react";
import styles from "../../styles/Styles.js";
import SellerInfo from "../../components/Seller/Layout/SellerData/SellerInfo/SellerInfo.jsx";
import SellerProfileData from "../../components/Seller/Layout/SellerData/SellerProfileData/SellerProfileData.jsx";
import { FiMenu, FiX } from "react-icons/fi";

function SellerPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Add style tag directly in the component */}
      <style>
        {`
          /* Custom scrollbar styles */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #c5c5c5;
            border-radius: 10px;
            transition: background 0.3s ease;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
          
          /* For Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #c5c5c5 #f1f1f1;
          }
        `}
      </style>

      <div
        className={`md:hidden sticky top-0 z-20 bg-white shadow-sm p-4 flex justify-between items-center transition-opacity duration-300 ${
          mobileSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-xl font-semibold text-gray-800">Seller Profile</h1>
        <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      <div className={`${styles.section} py-4 md:py-8`}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative">
          <div
            className={`fixed md:static inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out 
              ${
                mobileSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
              w-80 md:w-[24%] bg-white md:rounded-2xl shadow-md md:h-[90vh] md:sticky md:top-6 overflow-hidden border border-gray-200`}
          >
            <div className="md:hidden p-4 flex justify-end bg-white sticky top-0 z-10 border-b border-gray-200">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="h-[calc(100%-56px)] md:h-full overflow-y-auto">
              <SellerInfo isOwner={true} />
            </div>
          </div>

          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-[#0000004b]  z-10 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          <div className="w-full md:w-[75%]">
            <SellerProfileData isOwner={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;