import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsUser } from "../../../redux/actions/product.js";

function BestDeals() {
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

    const sortedData = allProductsData.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData.slice(0, 4);
    setData(firstFive);
  }, [product]);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.length > 0 ? (
          data.map((item, index) => (
            <ProductCard key={item._id || index} data={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-4">
            No best deals available yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default BestDeals;
