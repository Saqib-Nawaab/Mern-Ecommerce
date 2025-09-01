import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const [orderData, setOrderData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(order || {});
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.clientSecret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: "Processing ",
          type: "Credit Card",
        };
        order.status = result.paymentIntent.status;

        await axios.post(`${server}/order/create-order`, order, config);
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        navigate("/order/success");
      }
    } catch (error) {
      toast.error(error?.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      order.paymentInfo = { type: "Cash On Delivery" };
      order.status = "Shipped";

      await axios.post(`${server}/order/create-order`, order, config);
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      navigate("/order/success");
    } catch (error) {
      toast.error("Order failed", error?.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Payment Method
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Select Payment Method
              </h2>
              <div
                className={`p-4 mb-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Credit/Debit Card
                  </h3>
                  <div className="ml-auto flex"></div>
                </div>

                {paymentMethod === "card" && (
                  <form className="mt-6" onSubmit={handleStripePayment}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          readOnly
                          value={user?.name || ""}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                          <CardNumberElement className="w-full" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                          <CardExpiryElement className="w-full" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                          <CardCvcElement className="w-full" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={processing}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        processing ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {processing
                        ? "Processing..."
                        : `Pay $${Number(orderData?.totalPrice || 0).toFixed(
                            2
                          )}`}
                    </button>
                  </form>
                )}
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      paymentMethod === "cod"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Cash on Delivery
                  </h3>
                </div>

                {paymentMethod === "cod" && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Pay with cash when your order is delivered. An additional
                      $2.00 processing fee may apply.
                    </p>
                    <button
                      onClick={handleCashOnDelivery}
                      disabled={processing}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        processing ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {processing
                        ? "Processing..."
                        : `Confirm Order ($${Number(
                            orderData?.totalPrice || 0
                          ).toFixed(2)})`}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ${orderData?.subTotalPrice?.toFixed(2) || "0.00"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    ${orderData?.shipping?.toFixed(2) || "0.00"}
                  </span>
                </div>

                {orderData?.discountPrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">
                      -${orderData.discountPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-bold text-blue-600">
                      ${Number(orderData?.totalPrice || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
