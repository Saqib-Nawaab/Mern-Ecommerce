import React from "react";
import Header from "../../components/Layout/Header/Header.jsx";
import Footer from "../../components/Layout/Footer/Footer.jsx";
import  UserOrderDetails from "../../components/User/UserOrderDetails/UserOrderDetails.jsx";
function UserOrderDetailsPage() {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
}

export default UserOrderDetailsPage;
