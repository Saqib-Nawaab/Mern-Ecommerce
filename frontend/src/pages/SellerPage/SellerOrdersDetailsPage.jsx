import React from "react";
import SellerDashBoardHeader from "../../components/Seller/Layout/SellerDashBoard/DashboardHeader/DashboardHeader";
import Footer from "../../components/Layout/Footer/Footer";
import OrderDetails from "../../components/Seller/Layout/Order/OrderDetails.jsx";
function SellerOrdersDetailsPage() {
  return (
    <div>
      <SellerDashBoardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
}

export default SellerOrdersDetailsPage;
