import { useEffect } from "react";
import Header from "../../components/Layout/Header/Header.jsx";
import styles from "../../styles/styles.js";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Route/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsUser } from "../../redux/actions/product.js";
import React from "react";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const [data, setData] = useState([]);

  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsUser());
  }, [dispatch]);

  const allProductsData = Array.isArray(product?.message)
    ? [...product.message]
    : [];

  useEffect(() => {
    if (categoryData == null) {
      const d = allProductsData;
      setData(d);
    } else {
      const d =
        allProductsData &&
        allProductsData.filter((item) => item.category === categoryData);
      setData(d);
    }
    window.scrollTo(0, 0);
  }, [categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mb-4  ">
          {data &&
            data.map((item, index) => <ProductCard key={index} data={item} />)}
          {data && data.length === 0 && (
            <div className="text-center col-span-4">
              <h2 className="text-2xl font-semibold text-blue-500">
                No Products Found !!
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
