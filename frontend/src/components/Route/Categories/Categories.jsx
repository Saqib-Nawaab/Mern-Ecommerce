import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data.jsx";
import styles from "../../../styles/styles.js";

const Categories = () => {
  const navigate = useNavigate();

  const handleClickOnCategory = (items) => {
    navigate(`/products?category=${items.title}`);
  };

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className="my-12 flex justify-between w-full shadow-md bg-white p-6 rounded-lg gap-6 flex-wrap">
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                key={index}
                className="flex items-start gap-3 max-w-[300px] flex-1"
              >
                <div className="text-3xl text-amber-600">{i.icon}</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">{i.title}</h3>
                  <p className="text-sm text-gray-500">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12 shadow-sm`}
        id="categories"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Shop by Categories</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesData &&
            categoriesData.map((items, index) => (
              <div
                key={index}
                onClick={() => handleClickOnCategory(items)}
                className="group w-full h-[110px] flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
              >
                <h5 className="text-[18px] font-medium text-gray-700 group-hover:text-amber-700">
                  {items.title}
                </h5>
                <img
                  src={items.image_Url}
                  alt={items.title}
                  className="w-[100px] h-[80px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
