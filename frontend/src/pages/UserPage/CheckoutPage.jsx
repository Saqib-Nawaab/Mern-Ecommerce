import React from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps/CheckoutSteps.jsx";
import Checkout from "../../components/Checkout/Checkout.jsx";


function CheckoutPage() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps activeStep={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default CheckoutPage;
