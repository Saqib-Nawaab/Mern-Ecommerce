import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSellerAllOrders,
  deleteOrder,
} from "../../../../redux/actions/order.js";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../../Loading/Loading.jsx";

function SellerAllOrders() {
  const { seller } = useSelector((state) => state.seller);
  const { order, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerAllOrders(seller?._id));
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteOrder(id));
    dispatch(getSellerAllOrders(seller?._id));
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        const status = params.value?.toString().trim().toLowerCase();

        return (
          <span
            className={
              status === "delivered"
                ? "text-green-600"
                : status === "pending" ||
                  status === "processing" ||
                  status === "shipped" ||
                  status === "on the way"
                ? "text-blue-600"
                : "text-red-600"
            }
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.id)}
          aria-label="delete"
          className="min-w-[40px] hover:text-red-600"
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const row = [];

  const orders = order?.data || [];

  const filteredOrders = orders.filter(
    (item) =>
      item.status !== "Refunded" &&
      item.status !== "Refund Processing"
  );

  filteredOrders &&
    filteredOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart?.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-4 md:p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Products
            </h2>
          </div>
          <div className="w-full h-full">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              autoHeight
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f9fafb",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-cell": {
                  padding: "8px 16px",
                },
                "& .MuiDataGrid-virtualScroller": {
                  minHeight: "200px",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#f9fafb",
                },
              }}
              className="text-sm md:text-base"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerAllOrders;
