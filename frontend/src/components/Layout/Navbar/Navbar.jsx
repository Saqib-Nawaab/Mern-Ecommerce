import React from "react";
import styles from "../../../styles/Styles.js";
import { navItems } from "../../../static/data.jsx";
import { Link } from "react-router-dom";

function Navbar({ active }) {
  return (
    <nav className={`flex flex-col md:flex-row lg:flex-row gap-4 800px:${styles.normalFlex}`}>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          className={`relative px-4 py-2 rounded-md transition-all duration-300 ease-in-out
            ${
              active === index + 1
                ? "text-yellow-300 font-semibold"
                : "text-black md:text-white lg:text-white"
            } hover:text-blue-200 hover:scale-[1.05]`}
        >
          {item.title}
          <span
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-blue-300 transition-all duration-300 ease-in-out 
              ${
                active === index + 1
                  ? "w-full"
                  : "w-0 group-hover:w-full group-hover:left-0"
              }`}
          />
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
