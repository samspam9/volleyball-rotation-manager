import React from "react";
import { MovementArrow } from "@/types/volleyball";

interface ArrowsProps {
  arrows: MovementArrow[];
  isEditMode: boolean;
  onArrowMouseDown: (
    e: React.MouseEvent,
    arrowId: string,
    point: "start" | "end"
  ) => void;
  onRemoveArrow: (arrowId: string) => void;
}

export const Arrows: React.FC<ArrowsProps> = ({
  arrows,
  isEditMode,
  onArrowMouseDown,
  onRemoveArrow,
}) => {
  return (
    <>
      {arrows.map((arrow) => (
        <div key={arrow.id} className="absolute inset-0 w-full h-full">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 15 }}
          >
            <defs>
              <marker
                id={`arrowhead-${arrow.id}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill={arrow.color} />
              </marker>
            </defs>
            <line
              x1={`${arrow.startX}%`}
              y1={`${arrow.startY}%`}
              x2={`${arrow.endX}%`}
              y2={`${arrow.endY}%`}
              stroke={arrow.color}
              strokeWidth="2"
              markerEnd={`url(#arrowhead-${arrow.id})`}
              className="animate-pulse"
            />
          </svg>

          {isEditMode && (
            <>
              <div
                className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-red-500 border border-white sm:border-2 rounded-full cursor-move hover:scale-125 transition-transform z-30 shadow-lg"
                style={{
                  top: `${arrow.endY}%`,
                  left: `${arrow.endX}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseDown={(e) => onArrowMouseDown(e, arrow.id, "end")}
                title="Déplacer la fin de la flèche"
              />

              <button
                className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors z-30 shadow-lg flex items-center justify-center"
                style={{
                  top: `${arrow.startY}%`,
                  left: `${arrow.startX}%`,
                  transform: "translate(50%, 50%)",
                }}
                onClick={() => onRemoveArrow(arrow.id)}
                title="Supprimer la flèche"
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
};
