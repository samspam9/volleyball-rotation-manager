import React from "react";
import { Rotation } from "@/types/rotation";

interface RotationSelectorProps {
  selectedRotation: string;
  onRotationChange: (rotationId: string) => void;
  rotations: Rotation[];
}

export const RotationSelector: React.FC<RotationSelectorProps> = ({
  selectedRotation,
  onRotationChange,
  rotations,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
        <span className="mr-2">🔄</span>
        Type de Rotation
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {rotations.map((rotation) => (
          <button
            key={rotation.id}
            onClick={() => onRotationChange(rotation.id)}
            className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-left ${
              selectedRotation === rotation.id
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                : rotation.config
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!rotation.config}
            title={rotation.description}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm sm:text-lg truncate">
                  {rotation.name}
                </div>
                <div className="text-xs sm:text-sm opacity-75 truncate">
                  {rotation.description}
                </div>
              </div>
              {!rotation.config && (
                <div className="text-xs italic bg-gray-200 text-gray-500 px-2 py-1 rounded-full text-nowrap ml-2 flex-shrink-0">
                  A venir
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
