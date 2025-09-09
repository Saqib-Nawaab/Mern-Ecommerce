import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative min-h-[65vh] md:min-h-[85vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80)",
      }}
    >
      {/* Light gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-transparent"></div>

      <div className="relative container mx-auto px-6 md:px-10">
        <div className="  p-8 rounded-2xl max-w-lg md:max-w-2xl   animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-violet-600 to-cyan-400 text-transparent bg-clip-text leading-tight mb-6">
            Best Collection for <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Home Decoration
            </span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            Discover stylish home decor essentials that transform your living
            spaces. Elevate your interior with our exclusive collection of
            premium designs curated just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 text-center"
            >
              Shop Now
            </Link>
            <Link
              to="/best-selling"
              className="inline-block border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl transform hover:scale-105 transition duration-300 text-center"
            >
              Spring Sale
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;