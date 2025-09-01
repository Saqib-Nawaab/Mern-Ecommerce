import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animation/loading.json'; // Adjust path if needed

function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center  text-white font-inter">
      <div className="flex flex-col items-center space-y-6">
        <Lottie 
          animationData={loadingAnimation} 
          loop 
          className="h-110 w-110" 
        />
      </div>
    </div>
  );
}

export default Loading;
