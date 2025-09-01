import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrders, deleteOrder } from "../../../redux/actions/order.js";
import { useEffect } from "react";
import AiOutlineDelete from "@mui/icons-material/Delete";
function ContentOrders() {
  const { user } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deleteOrder(id));
    dispatch(getAllOrders(user._id));
  };

  useEffect(() => {
    dispatch(getAllOrders(user._id));
  }, [dispatch]);

  const filteredOrders = order?.data || [];
  const orders = filteredOrders.filter((order) => order.status !== "Refunded" && order.status !== "Refund Processing");

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
        <Link to={`/user/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart?.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        // rowsPerPageOptions={[5]}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
}

export default ContentOrders;
