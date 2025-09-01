import React from "react";
import { Route } from "react-router-dom";
import {
  SellerPage,
  SellerCreatePage,
  SellerLoginPage,
  SellerDashBoardPage,
  SellerCreateProductPage,
  SellerProductsPage,
  SellerCreateEventPage,
  SellerAllEventPage,
  SellerCouponsPage,
  SellerActivationPage,
  SellerOrdersPage,
  SellerOrdersDetailsPage,
  SellerOrderRefundPage,
  SellerSettingsPage,
  SellerWithdrawMoneyPage,
  SellerInboxPage
} from "../../Routes.js";
import { SellerProtectedRoute } from "../ProtectedRoutes/SellerProctedRoute.jsx";

const SellerRoutes = [
  <Route key="create" path="/seller-create" element={<SellerCreatePage />} />,
  <Route key="login" path="/seller-login" element={<SellerLoginPage />} />,
  <Route key="activate" path="/activate-seller/:activation_token" element={<SellerActivationPage />} />,
  <Route key="page" path="/seller/:id" element={<SellerProtectedRoute><SellerPage /></SellerProtectedRoute>} />,
  <Route key="dashboard" path="/seller/dashboard" element={<SellerProtectedRoute><SellerDashBoardPage /></SellerProtectedRoute>} />,
  <Route key="orders" path="/seller/dashboard/orders" element={<SellerProtectedRoute><SellerOrdersPage /></SellerProtectedRoute>} />,
  <Route key="orders-details" path="/order/:id" element={<SellerProtectedRoute><SellerOrdersDetailsPage /></SellerProtectedRoute>} />,
  <Route key="products" path="/seller/dashboard/products" element={<SellerProtectedRoute><SellerProductsPage /></SellerProtectedRoute>} />,
  <Route key="create-product" path="/seller/dashboard/create-product" element={<SellerProtectedRoute><SellerCreateProductPage /></SellerProtectedRoute>} />,
  <Route key="create-events" path="/seller/dashboard/create-events" element={<SellerProtectedRoute><SellerCreateEventPage /></SellerProtectedRoute>} />,
  <Route key="events" path="/seller/dashboard/events" element={<SellerProtectedRoute><SellerAllEventPage /></SellerProtectedRoute>} />,
  <Route key="coupons" path="/seller/dashboard/coupons" element={<SellerProtectedRoute><SellerCouponsPage /></SellerProtectedRoute>} />,
  <Route key="refunds" path="/seller/dashboard/refunds" element={<SellerProtectedRoute><SellerOrderRefundPage /></SellerProtectedRoute>} />,
  <Route key="settings" path="/seller/dashboard/settings" element={<SellerProtectedRoute><SellerSettingsPage /></SellerProtectedRoute>} />,
  <Route key="shop-inbox" path="/seller/dashboard/shop-inbox" element={<SellerProtectedRoute><SellerInboxPage /></SellerProtectedRoute>} />,
  <Route key="withdraw-money" path="/seller/dashboard/withdraw-money" element={<SellerProtectedRoute><SellerWithdrawMoneyPage /></SellerProtectedRoute>} />,
];

export default SellerRoutes;

