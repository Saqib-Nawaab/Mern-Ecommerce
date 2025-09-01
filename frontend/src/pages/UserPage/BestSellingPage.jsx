import { useEffect } from "react";
import Header from "../../components/Layout/Header/Header.jsx";
import styles from "../../styles/styles.js";
import { productData } from "../../static/data.jsx";
import { useState } from "react";
import ProductCard from "../../components/Route/ProductCard/ProductCard.jsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsUser } from "../../redux/actions/product.js";

function BestSellingPage() {
  const [data, setData] = useState([]);

  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProductsUser());
  }, [dispatch]);

  useEffect(() => {
    const allProductsData = Array.isArray(product?.message)
    ? [...product.message]
    : [];
    const sortedData =
      allProductsData &&
      allProductsData.sort((a, b) => {
        return b.total_sell - a.total_sell; 
      });
    setData(sortedData);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
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

export default BestSellingPage;
