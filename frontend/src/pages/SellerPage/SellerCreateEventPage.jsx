import React from 'react';
import SellerDashBoardHeader from '../../components/Seller/Layout/SellerDashBoard/DashboardHeader/DashboardHeader.jsx';
import SellerDashBoardSideBar from '../../components/Seller/Layout/SellerDashBoard/DashboardSideBar/DashboardSideBar.jsx';
import SellerCreateEvent from '../../components/Seller/Layout/CreateEvent/SellerCreateEvent.jsx';

function SellerCreateEventPage() {
  return (
    <div>
        <div className="min-h-screen bg-gray-100">
      <SellerDashBoardHeader />
      
      <div className="flex px-4 py-2 gap-x-4">
        <div className="md:block md:w-[250px] lg:w-[250px] ">
          <SellerDashBoardSideBar active={6} />
        </div>
        <div className="flex-1 w-full">
          <SellerCreateEvent />
        </div>
      </div>
    </div>

    </div>
  )
}

export default SellerCreateEventPage