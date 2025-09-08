import React from "react";
import { Route } from "react-router-dom";
import { AdminProtectedRoute } from "../ProtectedRoutes/AdminProtectedRoute.jsx";
import {
    AdminDashboardMainPage,
    AdminDashboardWithdrawPage,
    AdminDashboardEventsPage,
    AdminDashboardProductsPage,
    AdminDashboardOrdersPage,
    AdminDashboardSellersPage,
    AdminDashboardUsersPage
} from "../../Routes.js";

const AdminRoutes = [
    <Route key="admin" path="/admin" element={<AdminProtectedRoute><AdminDashboardMainPage /></AdminProtectedRoute>} />,
    <Route key="admin-users" path="/admin-users" element={<AdminProtectedRoute><AdminDashboardUsersPage /></AdminProtectedRoute>} />,
    <Route key="admin-events" path="/admin-events" element={<AdminProtectedRoute><AdminDashboardEventsPage /></AdminProtectedRoute>} />,
    <Route key="admin-orders" path="/admin-orders" element={<AdminProtectedRoute><AdminDashboardOrdersPage /></AdminProtectedRoute>} />,
    <Route key="admin-sellers" path="/admin-sellers" element={<AdminProtectedRoute><AdminDashboardSellersPage /></AdminProtectedRoute>} />,
    <Route key="admin-products" path="/admin-products" element={<AdminProtectedRoute><AdminDashboardProductsPage /></AdminProtectedRoute>} />,
    <Route key="admin-withdraw-request" path="/admin-withdraw-request" element={<AdminProtectedRoute><AdminDashboardWithdrawPage /></AdminProtectedRoute>} />,
];

export default AdminRoutes;
