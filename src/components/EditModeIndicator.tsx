import React from "react";

interface EditModeIndicatorProps {
  isEditMode: boolean;
}

export const EditModeIndicator: React.FC<EditModeIndicatorProps> = ({
  isEditMode,
}) => {
  if (!isEditMode) return null;

  return (
    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
      MODE ÉDITION
    </div>
  );
};
