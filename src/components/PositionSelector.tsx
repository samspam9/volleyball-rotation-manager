import React from "react";

interface PositionSelectorProps {
  selectedStep: number;
  onStepChange: (step: number) => void;
}

export const PositionSelector: React.FC<PositionSelectorProps> = ({
  selectedStep,
  onStepChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
        <span className="mr-2">📍</span>
        Positions
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <button
            key={step}
            onClick={() => onStepChange(step)}
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-center text-sm sm:text-base ${
              selectedStep === step
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            Position {step}
          </button>
        ))}
      </div>
    </div>
  );
};
