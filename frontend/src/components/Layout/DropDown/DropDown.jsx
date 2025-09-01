import React from "react";
import { useNavigate } from "react-router-dom";

function DropDown({ categoriesData, setIsDropdownOpen, compact = false }) {
  const navigate = useNavigate();

  const submitHandler = (item) => {
    navigate(`/products?category=${encodeURIComponent(item.title)}`);
    if (setIsDropdownOpen) setIsDropdownOpen(false);
  };

  const itemBase =
    "flex items-center gap-3 cursor-pointer transition select-none";
  const sizeClasses = compact
    ? "py-1.5 px-4 hover:bg-blue-50"
    : "py-2 px-4 hover:bg-blue-100";
  const titleClasses = compact
    ? "text-gray-800 text-sm font-medium"
    : "text-gray-800 text-base font-medium";

  return (
    <div className="bg-white rounded-b-xl">
      {categoriesData && categoriesData.length > 0 ? (
        categoriesData.map((item, index) => (
          <div
            key={index}
            className={`${itemBase} ${sizeClasses}`}
            onClick={() => submitHandler(item)}
          >
            <img
              src={item.image_Url[0]?.url || item.image_Url}
              alt={item.title}
              className="w-7 h-7 select-none"
              draggable="false"
            />
            <h3 className={titleClasses}>{item.title}</h3>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center py-3 text-sm">
          No Categories
        </div>
      )}
    </div>
  );
}

export default DropDown;
