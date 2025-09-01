import React, { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../../Route/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsUser } from "../../../redux/actions/product.js";

function RelateProducts({ data }) {
  const [products, setProducts] = useState(null);

  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsUser());
  }, [dispatch]);
  const allProductsData = Array.isArray(product?.message)
    ? [...product.message]
    : [];

  useEffect(() => {
    const d =
      allProductsData &&
      allProductsData.filter((item) => item.category === data.category);
    setProducts(d);
  }, []);

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 rounded-lg  my-12">
      {" "}
      {data ? (
        <div>
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-10 tracking-tight">
            {" "}
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {" "}
            {products &&
              products
                .slice(0, 5)
                .map((item, index) => <ProductCard key={index} data={item} />)}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12 text-lg font-medium">
          {" "}
          No related products found at the moment.
        </div>
      )}
    </div>
  );
}

export default RelateProducts;
