import React from "react";
import SellerDashBoardHeader from "../../components/Seller/Layout/SellerDashBoard/DashboardHeader/DashboardHeader.jsx";
import SellerDashBoardSideBar from "../../components/Seller/Layout/SellerDashBoard/DashboardSideBar/DashboardSideBar.jsx";
import SellerWithdrawMoney from "../../components/Seller/Layout/WithdrawMoney/SellerWithdrawMoney.jsx";
function SellerWithdrawMoneyPage() {
  return (
    <div>
      <div>
        <SellerDashBoardHeader />
        <div className="flex  justify-between px-4 py-2 bg-gray-100 w-full">
          <div className=" md:block md:w-64 lg:w-60 bg-white shadow-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <SellerDashBoardSideBar active={7} />
          </div>

          <main className="flex-1 p-4 md:p-6 overflow-x-auto">
            <div className="max-w-full mx-auto">
              <SellerWithdrawMoney />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SellerWithdrawMoneyPage;
