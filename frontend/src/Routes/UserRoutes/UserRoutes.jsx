import React from "react";
import { Route } from "react-router-dom";
import {
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
  LoginPage,
  SignupPage,
  ActivationPage,
  ProductsDetailsPage,
  EventsDetailsPage,
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  SuccessPage,
  UserOrderDetailsPage,
  UserTrackOrderDetailsPage,
} from "../../Routes.js";
import { UserProtectedRoute } from "../ProtectedRoutes/UserProtectedRoute.jsx";


const UserRoutes = [

  <Route key="home" path="/" element={<HomePage />} />,
  <Route key="faq" path="/faq" element={<FaqPage />} />,
  <Route key="events" path="/events" element={<EventsPage />} />,
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route key="sign-up" path="/sign-up" element={<SignupPage />} />,
  <Route key="checkout" path="/checkout" element={<CheckoutPage />} />,
  <Route key="payment" path="/payment" element={<PaymentPage />} />,
  <Route key="products" path="/products" element={<ProductsPage />} />,
  <Route key="best-selling" path="/best-selling" element={<BestSellingPage />} />,
  <Route key="products-details" path="/products/:name" element={<ProductsDetailsPage />} />,
  <Route key="events-details" path="/events/:name" element={<EventsDetailsPage />} />,
  <Route key="activation" path="/activate/:activation_token" element={<ActivationPage />} />,
  <Route key="success" path="/order/success" element={<SuccessPage />} />,
  <Route key="user-order-details" path="/user/order/:id" element={<UserOrderDetailsPage />} />,
  <Route key="user-track-order-details" path="/user/track/order/:id" element={<UserTrackOrderDetailsPage />} />,
  <Route key="profile" path="/profile" element={<UserProtectedRoute><ProfilePage /></UserProtectedRoute>} />,
 
];

export default UserRoutes;
