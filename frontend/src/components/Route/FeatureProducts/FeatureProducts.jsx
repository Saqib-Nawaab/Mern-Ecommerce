import React from "react";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsUser } from "../../../redux/actions/product.js";
import { useEffect } from "react";
function FeatureProducts() {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsUser());
  }, [dispatch]);

  const allProductsData = Array.isArray(product?.message)
    ? [...product.message]
    : [];

  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600">
            Discover our carefully curated selection of premium products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allProductsData?.map((item, index) => (
            <ProductCard
              data={item}
              key={`${item.id}-${index}`}
              className="hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeatureProducts;
