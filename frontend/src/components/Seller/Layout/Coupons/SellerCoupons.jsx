import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCoupons,
  deleteCoupon,
  resetCouponState,
} from "../../../../redux/actions/coupon.js";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../../Loading/Loading.jsx";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import CreateCoupons from "./CreateCoupons.jsx";
function SellerCoupons() {
  const { seller } = useSelector((state) => state.seller);
  const { coupon, isLoading } = useSelector((state) => state.coupon);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCoupon(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      headerClassName: "font-bold",
    },
    {
      field: "minAmount",
      headerName: "Min Amount",
      minWidth: 120,
      flex: 0.8,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span className="font-medium text-gray-700">${params.value}</span>
      ),
    },
    {
      field: "maxAmount",
      headerName: "Max Amount",
      minWidth: 120,
      flex: 0.8,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span className="font-medium text-gray-700">${params.value}</span>
      ),
    },
    {
      field: "value",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span className="font-medium text-blue-600">${params.value}</span>
      ),
    },
    {
      field: "Product",
      headerName: "Product",
      minWidth: 150,
      flex: 1,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span className="font-medium text-green-700">{params.value}</span>
      ),
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.id}`} className="hover:text-blue-600">
            <Button aria-label="preview" className="min-w-[40px]">
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      headerName: "",
      minWidth: 100,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.id)}
          aria-label="delete"
          className="hover:text-red-600"
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const row = [];

  coupon &&
    coupon?.message &&
    coupon?.message.length > 0 &&
    coupon?.message?.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        discount: item.discount,
        maxAmount: item.maxAmount,
        minAmount: item.minAmount,
        value: item.value,
        shop: item.shop,
        Product: item.selectedProduct ? item.selectedProduct : "N/A",
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
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Coupons
            </h2>
            <div
              onClick={() => {
                setOpen(true);
                dispatch(resetCouponState());
              }}
              className="flex items-center space-x-2 text-white px-1 py-1 rounded-md hover:bg-blue-200 hover:text-gray-800 "
            >
              <Button className="">Create Coupons</Button>
            </div>
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

      {open && (
        <CreateCoupons
          setOpen={setOpen}
          onClose={() => {
            setOpen(false);
            dispatch(getAllCoupons(seller._id));
          }}
        />
      )}
    </div>
  );
}

export default SellerCoupons;
