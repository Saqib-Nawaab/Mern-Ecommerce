import React from "react";
import { HiCheck } from "react-icons/hi";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    { id: 1, title: "Shipping" },
    { id: 2, title: "Payment" },
    { id: 3, title: "Complete" },
  ];

  return (
    <div className="w-full bg-white py-8 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div
            className={`absolute  top-5 left-0 right-0 h-1 bg-gray-200 rounded-full z-0 ${
              activeStep === 3 ? `ml-3` : `mr-4 ml-4`
            } `}
          />
          <div
            className={`absolute top-5  left-0 h-1 bg-indigo-600 rounded-full z-10 transition-all duration-300 ${activeStep === 3 ? `` : `mr-4 ml-4`}`}
            style={{
              width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
          {steps.map((step) => {
            const isCompleted = activeStep > step.id;
            const isActive = activeStep === step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center z-20 relative"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 transition-colors duration-300
                  ${
                    isCompleted
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : isActive
                      ? "border-indigo-600 text-indigo-600 bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {isCompleted ? <HiCheck className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={`text-sm font-medium text-center ${
                    isCompleted || isActive
                      ? "text-indigo-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
