import React, { forwardRef } from "react";

interface CourtProps {
  children: React.ReactNode;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export const Court = forwardRef<HTMLDivElement, CourtProps>(
  ({ children, onMouseMove, onMouseUp, onMouseLeave }, ref) => {
    return (
      <div
        ref={ref}
        className="relative mx-auto bg-orange-500 border-2 sm:border-4 border-blue-800 rounded-lg overflow-hidden w-full max-w-lg"
        style={{
          aspectRatio: "2/3",
          maxWidth: "400px",
          maxHeight: "600px",
        }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute top-1/2 left-0 right-0 h-1 sm:h-2 bg-white transform -translate-y-1/2 z-10" />

        <div className="absolute top-1/3 left-0 right-0 h-0.5 sm:h-1 bg-white transform -translate-y-1/2" />
        <div className="absolute top-2/3 left-0 right-0 h-0.5 sm:h-1 bg-white transform -translate-y-1/2" />

        {children}
      </div>
    );
  }
);

Court.displayName = "Court";
