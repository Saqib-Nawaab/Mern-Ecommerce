import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { MdTrackChanges } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../../redux/actions/order.js";
import { useEffect } from "react";

function ContentTrackOrders() {
  const { user } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders(user._id));
  }, [dispatch]);

  const orders = order?.data || [];

  const filteredOrders = orders.filter(
    (item) => item.status !== "Delivered" && item.status !== "Refunded" && item.status !== "Refund Processing"
  );

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
                : status === "pending" || status === "processing" || status === "shipped" || status === "on the way"
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
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/track/order/${params.id}`}>
          <Button>
            <MdTrackChanges size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const row = [];

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
    <div>
      <DataGrid
        rows={row}
        columns={columns}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
}

export default ContentTrackOrders;
