import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
} from "../../../../redux/actions/product.js";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../../Loading/Loading.jsx";

function SellerAllProducts() {
  const { seller } = useSelector((state) => state.seller);
  const { product, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
      headerClassName: "font-bold",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
      headerClassName: "font-bold",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span className="font-medium text-green-600">{params.value}</span>
      ),
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span
          className={
            params.value < 5 ? "text-red-500 font-medium" : "text-gray-700"
          }
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "sold",
      headerName: "Sold",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span className="font-medium text-blue-600">{params.value}</span>
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
          <Link
            to={`/products/${params.row.name.toLowerCase().replace(/ /g, "-")}`}
            className="hover:text-blue-600"
          >
            <Button aria-label="preview" className="min-w-[40px]">
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleDelete(params.id)}
            aria-label="delete"
            className="min-w-[40px] hover:text-red-600"
          >
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const row = [];

  product &&
    product?.message?.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountedPrice,
        Stock: item.stock,
        sold: item?.sold_out || 0,
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

export default SellerAllProducts;
