import React, { useEffect } from "react";
import { useState } from "react";
import {
  AiOutlineMoneyCollect,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { LuPackage } from "react-icons/lu";
import { GoArchive } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerAllOrders,
  deleteOrder,
} from "../../../../../redux/actions/order.js";
import { getAllProducts } from "../../../../../redux/actions/product.js";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BsGraphUp } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import Loading from "../../../../Loading/Loading.jsx";

function DashboardHero() {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { order, isLoading } = useSelector((state) => state.order);
  const { product } = useSelector((state) => state.product);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);

  const handleDelete = async (id) => {
    await dispatch(deleteOrder(id));
    dispatch(getSellerAllOrders(seller?._id));
  };

  useEffect(() => {
    dispatch(getSellerAllOrders(seller._id));
    dispatch(getAllProducts(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    if (order?.data) {
      const orderData = order.data.filter(
        (item) => item?.status?.toLowerCase() === "delivered"
      );
      setDeliveredOrders(orderData);

      const sortedOrders = [...order.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setLatestOrders(sortedOrders.slice(0, 3));
    }
  }, [order]);

  const totalEarnings = deliveredOrders.reduce(
    (acc, item) => acc + (item?.totalPrice || 0),
    0
  );
  const serviceCharge = (totalEarnings * 0.1).toFixed(2);
  const accountBalance = (totalEarnings - serviceCharge).toFixed(2);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => (
        <span className="text-[14px] text-gray-600">
          {params.value.substring(0, 10)}...
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        const status = params.value?.toString().trim().toLowerCase();
        const statusStyles = {
          delivered: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          processing: "bg-blue-100 text-blue-800",
          shipped: "bg-indigo-100 text-indigo-800",
          cancelled: "bg-red-100 text-red-800",
          refunded: "bg-red-100 text-red-800",
          default: "bg-gray-100 text-gray-800",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[status] || statusStyles.default
            }`}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items",
      type: "number",
      minWidth: 80,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "view",
      flex: 0.5,
      minWidth: 80,
      headerName: "View",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button className="min-w-[30px] text-blue-500 hover:text-blue-700">
            <AiOutlineEye size={18} />
          </Button>
        </Link>
      ),
    },
    {
      field: "delete",
      flex: 0.5,
      minWidth: 80,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.id)}
          aria-label="delete"
          className="min-w-[30px] text-gray-500 hover:text-red-600"
        >
          <AiOutlineDelete size={18} />
        </Button>
      ),
    },
  ];

  const rows = latestOrders.map((item) => ({
    id: item._id,
    itemsQty: item.cart?.length || 0,
    total: "US$ " + item.totalPrice,
    status: item.status,
  }));

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl  text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500">
          Welcome back, {seller?.name || "Seller"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Account Balance
            </h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiDollarSign className="text-blue-500" size={18} />
            </div>
          </div>
          <p className="text-2xl  text-green-600">${accountBalance}</p>
          <p className="text-xs text-gray-500 mt-1">After 10% service fee</p>
          <Link to="/seller/dashboard/withdraw-money">
            <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              Withdraw
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Total Earnings
            </h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <BsGraphUp className="text-green-500" size={18} />
            </div>
          </div>
          <p className="text-2xl  text-blue-600">${totalEarnings.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">
            From {deliveredOrders.length} orders
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">All Orders</h3>
            <div className="p-2 bg-purple-50 rounded-lg">
              <LuPackage className="text-purple-500" size={18} />
            </div>
          </div>
          <p className="text-2xl  text-gray-800">{order?.data?.length || 0}</p>
          <Link to="/seller/dashboard/orders">
            <button className="mt-4 w-full bg-purple-50 hover:bg-purple-100 text-purple-600 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              View Orders
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Products</h3>
            <div className="p-2 bg-orange-50 rounded-lg">
              <GoArchive className="text-orange-500" size={18} />
            </div>
          </div>
          <p className="text-2xl  text-gray-800">
            {product?.message?.length || 0}
          </p>
          <Link to="/seller/dashboard/products">
            <button className="mt-4 w-full bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              View Products
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Latest Orders</h3>
          <Link to="/seller/dashboard/orders">
            <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              View all orders
            </span>
          </Link>
        </div>

        <div className="w-full h-full">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            disableSelectionOnClick
            autoHeight
            hideFooter
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f9fafb",
                fontWeight: "bold",
                borderRadius: "0",
                borderBottom: "1px solid #e5e7eb",
              },
              "& .MuiDataGrid-cell": {
                padding: "12px 16px",
                borderBottom: "1px solid #f3f4f6",
              },
              "& .MuiDataGrid-virtualScroller": {
                minHeight: "200px",
              },
              "& .MuiDataGrid-footerContainer": {
                display: "none",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f9fafb",
              },
            }}
            className="text-sm"
          />
        </div>

        {rows.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
}

export default DashboardHero;
