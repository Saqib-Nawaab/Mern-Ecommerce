import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div 
      className="relative min-h-[60vh] md:min-h-[80vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 mb-24">
        <div className=" bg-opacity-90 p-6 rounded-lg max-w-md md:max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Best Collection for <br className="hidden md:block" /> Home Decoration
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Discover stylish home decor essentials that transform your living
            spaces. Elevate your interior with our exclusive collection of
            premium designs curated just for you.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;