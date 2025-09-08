import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar.jsx";
import AdminDashboardWithdraw from "../../components/Admin/Layout/AdminDashboardWithdraw.jsx";
import AdminHeader from "../../components/Admin/Header/AdminHeader.jsx";

function AdminDashboardWithdrawPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (isCollapsed) => {
    setSidebarCollapsed(isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader onSidebarToggle={handleSidebarToggle} />

      {/* Sidebar + Main Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className={`fixed top-16 left-0 h-[calc(100vh-64px)] z-30 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <AdminSidebar active={7} onToggle={handleSidebarToggle} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 min-h-[calc(100vh-64px)] transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="p-4 md:p-6">
            <div className="max-w-full mx-auto">
              {/* Page Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>
                <p className="text-gray-600 mt-1">Review and process seller withdrawal requests</p>
              </div>
              
              {/* Content */}
              <AdminDashboardWithdraw />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardWithdrawPage;