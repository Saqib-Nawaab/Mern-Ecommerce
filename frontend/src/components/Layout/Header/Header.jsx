import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  RxCross1,
  IoMenuOutline,
  IoIosArrowDown,
  IoIosArrowForward,
  BiMenuAltLeft,
} from "../../../assets/icons/index.js";
import styles from "../../../styles/styles.js";
import { categoriesData } from "../../../static/data.jsx";
import DropDown from "../DropDown/DropDown.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import HomeProfile from "../HomeProfile/HomeProfile.jsx";
import { useSelector } from "react-redux";
import { getAllProductsUser } from "../../../redux/actions/product.js";
import { useDispatch } from "react-redux";

function Header({ activeHeading }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchWrapperRef = useRef(null);
  const mobileSearchWrapperRef = useRef(null);
  const catRef = useRef(null);
  const categoriesSectionRef = useRef(null);

  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { product } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsUser());
  }, [dispatch]);

  const allProductsData = Array.isArray(product?.message)
    ? [...product.message]
    : [];

  const searchQueryFiltered = useMemo(() => {
    if (!searchQuery) return [];
    const normalized = searchQuery.replace(/\s+/g, "").toLowerCase();
    return allProductsData.filter((item) =>
      item.name.replace(/\s+/g, "").toLowerCase().includes(normalized)
    );
  }, [searchQuery, allProductsData]);

  useEffect(() => {
    setIsOpen(Boolean(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    const ignoreClasses = ["search-input", "search-icon", "dropdown-menu"];
    const handleClickOutside = (e) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target) &&
        mobileSearchWrapperRef.current &&
        !mobileSearchWrapperRef.current.contains(e.target) &&
        !ignoreClasses.some((className) =>
          e.target.classList.contains(className)
        )
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleCatClickOutside = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleCatClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleCatClickOutside);
  }, [isDropDownOpen]);

  useEffect(() => {
    let offsetTop = 0;
    if (categoriesSectionRef.current) {
      offsetTop = categoriesSectionRef.current.offsetTop;
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > offsetTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="top-0 z-50 w-full">
      <div
        className={`${styles.section} bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 mt-4 rounded-2xl shadow-md hidden md:block`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-5 px-4 md:px-8 gap-3 md:gap-0">
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJGyCePXO3jxRy9jA9dzJDzIjTgSojXrdwnw&s"
              alt="Logo"
              className="w-[120px] md:w-[170px] h-[50px] md:h-[90px] object-contain rounded-4xl p-2 hover:scale-105 transition-transform"
            />
          </Link>

          <div
            ref={searchWrapperRef}
            className="relative w-full max-w-md md:max-w-lg"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[44px] w-full pl-5 pr-12 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm text-gray-800 placeholder-gray-400 search-input"
            />
            <AiOutlineSearch
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 opacity-80"
            />
            {isOpen && (
              <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">
                {searchQueryFiltered.length > 0 ? (
                  searchQueryFiltered.map((item, i) => {
                    const slug = item.name.replace(/ /g, "-").toLowerCase();
                    return (
                      <Link
                        key={`${item.id ?? slug}-${i}`}
                        to={`/products/${slug}`}
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <img
                          src={item.images?.[0]?.url}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md mr-3 border border-gray-200"
                        />
                        <span className="text-gray-700 text-sm font-medium">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center text-sm">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
          <Link
            to="/seller-create"
            className="hidden md:flex items-center lg:px-5 lg:py-2.5 md:px-2 md:py-1 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <span className="text-sm md:text-base  font-semibold">
              {seller ? "Go to Dashboard" : "Become a Seller"}
            </span>
            <IoIosArrowForward className="ml-2 text-lg" />
          </Link>
        </div>
      </div>

      <div
        ref={categoriesSectionRef}
        className={`hidden md:block w-full bg-blue-500 shadow-md ${
          isSticky ? "fixed top-0 animate-slide-down z-40" : "relative mt-3"
        }`}
      >
        <div
          className={`${styles.section} flex items-center justify-between h-[65px] px-4 md:px-6`}
        >
          <div ref={catRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-5 h-[65px] text-white font-semibold text-base hover:bg-blue-600 transition rounded-t-lg"
            >
              <BiMenuAltLeft size={26} />
              <span>All Categories</span>
              <IoIosArrowDown
                size={18}
                className={`transition-transform ${
                  isDropDownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropDownOpen && (
              <div className="absolute top-full left-0 w-full min-w-[200px] bg-white border border-gray-200 shadow-lg rounded-b-lg z-50">
                <DropDown
                  categoriesData={categoriesData}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              </div>
            )}
          </div>

          <Navbar active={activeHeading} />
          <HomeProfile />
        </div>
      </div>

      <div className="w-full flex items-center justify-between px-4 py-3 bg-blue-500 shadow-md fixed top-0 left-0 z-50 md:hidden rounded-b-sm">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-white hover:bg-blue-600 p-2 rounded-full transition"
        >
          <IoMenuOutline size={26} />
        </button>

        <Link to="/" className="flex-shrink-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZN9ltmviIaXXJV51tgKoY3R8RIaxJjXHNIJJQb95AMcvSdHbDF21Z8AGoXH1M1PPuHk&usqp=CAU"
            alt="Logo"
            className="w-[120px] h-[40px] object-contain rounded-xl hover:scale-105 transition-transform duration-200"
          />
        </Link>

        <div className="relative">
          <AiOutlineShoppingCart
            size={26}
            className="text-white hover:text-gray-200 cursor-pointer transition"
          />
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
            {cart && cart.length > 0 ? cart.length : 0}
          </span>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`fixed w-full bg-[#0000005f] z-50 h-full top-0 left-0`}>
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px]"
                  // onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    {0}
                  </span>
                </div>
              </div>
              <RxCross1
                size={24}
                className="ml-4 mt-5 "
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <div
              className="my-8 w-[92%] m-auto relative"
              ref={mobileSearchWrapperRef}
            >
              <input
                type="search"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isOpen && (
                <div
                  className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50  dropdown-menu 
                "
                >
                  {searchQueryFiltered.length > 0 ? (
                    searchQueryFiltered.map((item, i) => {
                      const slug = item.name.replace(/ /g, "-").toLowerCase();
                      return (
                        <Link
                          key={`${slug}-${i}`}
                          to={`/products/${slug}`}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 z-[9999999999999999]"
                          onClick={() => {
                            setIsOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <img
                            src={item.images?.[0]?.url}
                            alt={item.name}
                            className="w-12 h-12  z-66 object-cover rounded-md mr-3 border border-gray-200"
                          />
                          <span className="text-gray-700 text-sm font-medium">
                            {item.name}
                          </span>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center text-sm">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <Navbar active={activeHeading} />
            </div>

            <div className="flex flex-col items-center justify-center mt-6">
              <Link
                to="/seller-create"
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-2 py-2.5 rounded-lg shadow-sm transition mt-4"
              >
                {seller ? "Go to Dashboard" : "Become a Seller"}
              </Link>
            </div>

            {!isAuthenticated && (
              <div>
                <div className="flex flex-col items-center justify-center mt-6">
                  <Link
                    className="text-blue-500 hover:text-blue-600 text-base font-semibold"
                    to="/login"
                  >
                    Login
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                  <Link
                    className="text-blue-500 hover:text-blue-600 text-base font-semibold"
                    to="/sign-up"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
            {isAuthenticated && (
              <div className="flex items-center justify-center mt-6">
                <Link
                  to="/profile"
                  className="flex justify-center flex-col  items-center gap-5 group transition-transform hover:scale-105"
                >
                  <img
                    src={`${user.avatar.url.replace(/\\/g, "/")}`}
                    alt="Profile"
                    className="w-19 h-19 rounded-full border-2 border-blue-500 group-hover:border-blue-400 shadow-md transition-all duration-300"
                  />
                  <span className="text-blue-600 text-sm font-semibold group-hover:text-blue-500 transition-colors duration-300">
                    {user.name?.toUpperCase() || "PROFILE"}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
