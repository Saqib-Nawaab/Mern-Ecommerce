import React from 'react';
import SellerDashBoardHeader from '../../components/Seller/Layout/SellerDashBoard/DashboardHeader/DashboardHeader.jsx';
import SellerDashBoardSideBar from '../../components/Seller/Layout/SellerDashBoard/DashboardSideBar/DashboardSideBar.jsx';
import SellerCoupons from '../../components/Seller/Layout/Coupons/SellerCoupons.jsx';
function SellerCouponsPage() {
  return (
    <div>
        <div className="min-h-screen bg-gray-100">
      <SellerDashBoardHeader />
      
      <div className="flex px-4 py-2 gap-x-4">
        <div className="md:block md:w-[250px] lg:w-[250px] ">
          <SellerDashBoardSideBar active={9} />
        </div>
        <div className="flex-1 w-full">
          <SellerCoupons />
        </div>
      </div>
    </div>

    </div>
  )
}

export default SellerCouponsPage