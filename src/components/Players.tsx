import React from "react";
import { Player } from "@/types/volleyball";
import { PlayerPosition, MovementArrow } from "@/types/rotation";
import { PLAYER_SIZE } from "@/constants/volleyball";

interface PlayersProps {
  players: Player[];
  positions: PlayerPosition[];
  isEditMode: boolean;
  draggedPlayer: number | null;
  currentArrows: MovementArrow[];
  onMouseDown: (e: React.MouseEvent, playerId: number) => void;
  onAddArrow: (playerId: number) => void;
}

export const Players: React.FC<PlayersProps> = ({
  players,
  positions,
  isEditMode,
  draggedPlayer,
  currentArrows,
  onMouseDown,
  onAddArrow,
}) => {
  return (
    <>
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`absolute rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm cursor-pointer z-20 ${
            isEditMode ? "hover:scale-110 hover:shadow-lg" : ""
          } ${
            draggedPlayer === player.id ? "scale-110 shadow-2xl z-30" : ""
          } bg-blue-700`}
          style={{
            width: PLAYER_SIZE.width,
            height: PLAYER_SIZE.height,
            top: `${positions[index].top}%`,
            left: `${positions[index].left}%`,
            transform: `translate(-50%, -50%)`,
          }}
          onMouseDown={(e) => onMouseDown(e, player.id)}
          title={`${player.role} (${player.abbreviation})`}
        >
          {player.abbreviation}
          {isEditMode && (
            <>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full border border-white sm:border-2 animate-pulse" />
              {!currentArrows.some((arrow) => arrow.playerId === player.id) && (
                <button
                  className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors z-30 shadow-lg flex items-center justify-center"
                  onClick={() => onAddArrow(player.id)}
                  title={`Ajouter une flèche pour ${player.abbreviation}`}
                >
                  +
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
};
