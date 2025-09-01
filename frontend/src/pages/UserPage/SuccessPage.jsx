import React from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps/CheckoutSteps.jsx";
import Success from "../../components/Checkout/Success/Success.jsx";
function SuccessPage() {
  return (
    <div>
      <div>
        <Header />
        <br />
        <Success />
        <br />
        <Footer />
      </div>
    </div>
  );
}

export default SuccessPage;
