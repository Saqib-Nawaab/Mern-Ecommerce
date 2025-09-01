import React from 'react';
import SellerDashBoardHeader from '../../components/Seller/Layout/SellerDashBoard/DashboardHeader/DashboardHeader.jsx';
import SellerDashBoardSideBar from '../../components/Seller/Layout/SellerDashBoard/DashboardSideBar/DashboardSideBar.jsx';
import SellerCreateProduct from '../../components/Seller/Layout/CreateProduct/SellerCreateProduct.jsx';

function SellerCreateProductPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <SellerDashBoardHeader />
      
      <div className="flex px-4 py-2 gap-x-4">
        <div className="md:block md:w-[250px] lg:w-[250px] ">
          <SellerDashBoardSideBar active={4} />
        </div>
        <div className="flex-1 w-full">
          <SellerCreateProduct />
        </div>
      </div>
    </div>
  );
}

export default SellerCreateProductPage;
