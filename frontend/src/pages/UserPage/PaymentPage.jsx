import React from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps/CheckoutSteps.jsx";
import Payment from "../../components/Payment/Payment.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../../components/Loading/Loading";

function PaymentPage() {
  const stripeApiKey = useSelector((state) => state.user?.stripeApiKey);
  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  if (!stripePromise) return <Loading />;

  return (
    <div>
      <Header />
      <br />
      <CheckoutSteps activeStep={2} />
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
      <br />
      <Footer />
    </div>
  );
}

export default PaymentPage;
