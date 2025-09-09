import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div 
      className="relative min-h-[70vh] md:min-h-[85vh] w-full bg-cover bg-center bg-no-repeat flex items-center overflow-hidden"
      style={{
        backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md md:max-w-2xl transform transition-all duration-500 hover:shadow-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Best Collection for <br className="hidden md:block" /> 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Home Decoration
            </span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
            Discover stylish home decor essentials that transform your living
            spaces. Elevate your interior with our exclusive collection of
            premium designs curated just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link 
              to="/products" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="inline-block border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
};

export default Hero;