"use client";

import React, { useState, useRef, useEffect } from "react";
import { Phase, MovementArrow } from "@/types/volleyball";
import { useVolleyballRotation } from "@/hooks/useVolleyballRotation";
import { Court } from "./Court";
import { Players } from "./Players";
import { Arrows } from "./Arrows";
import { EditModeIndicator } from "./EditModeIndicator";

interface VolleyballCourtProps {
  rotation: string;
  selectedStep: number;
}

const VolleyballCourt: React.FC<VolleyballCourtProps> = ({
  rotation,
  selectedStep,
}) => {
  // États principaux
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<Phase>("starting");

  // Hook personnalisé pour la logique de rotation
  const {
    setStartingPositions,
    setServePositions,
    setServeReceivePositions,
    setServeArrows,
    setReceiveArrows,
    getCurrentPositions,
    getCurrentArrows,
    getPlayers,
    exportConfigurations,
    resetPositions,
  } = useVolleyballRotation(rotation, selectedStep, selectedPhase);

  // États pour le drag & drop
  const [draggedPlayer, setDraggedPlayer] = useState<number | null>(null);
  const [draggedArrow, setDraggedArrow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const courtRef = useRef<HTMLDivElement>(null);

  const players = getPlayers();
  const currentPositions = getCurrentPositions();
  const currentArrows = getCurrentArrows();

  // Gestion des événements d'export/import
  useEffect(() => {
    const handleExport = () => {
      exportConfigurations();
    };

    const handleImport = (event: CustomEvent) => {
      const file = event.detail.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const config = JSON.parse(e.target?.result as string);
            console.log("Configuration importée :", config);
            alert("Configuration importée avec succès !");
            // Ici on pourrait implémenter l'import dans le store si nécessaire
          } catch (error) {
            console.error("Erreur lors de l'import :", error);
            alert("Erreur lors de l'import du fichier");
          }
        };
        reader.readAsText(file);
      }
    };

    window.addEventListener("exportConfigurations", handleExport);
    window.addEventListener(
      "importConfiguration",
      handleImport as EventListener
    );

    return () => {
      window.removeEventListener("exportConfigurations", handleExport);
      window.removeEventListener(
        "importConfiguration",
        handleImport as EventListener
      );
    };
  }, [exportConfigurations]);

  // Gestion du drag & drop des joueurs
  const handleMouseDown = (e: React.MouseEvent, playerId: number) => {
    if (!isEditMode) return;
    e.preventDefault();
    setDraggedPlayer(playerId);

    const rect = courtRef.current?.getBoundingClientRect();
    if (rect) {
      const currentPos = getCurrentPositions()[playerId - 1];
      setDragOffset({
        x: e.clientX - rect.left - (currentPos.left * rect.width) / 100,
        y: e.clientY - rect.top - (currentPos.top * rect.height) / 100,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedPlayer || !courtRef.current) return;

    const rect = courtRef.current.getBoundingClientRect();
    const newLeft = Math.max(
      5,
      Math.min(95, ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100)
    );
    const newTop = Math.max(
      5,
      Math.min(95, ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100)
    );

    // Mise à jour immédiate selon la phase actuelle
    if (selectedPhase === "serve") {
      setServePositions((prev) => {
        const newPositions = [...prev];
        newPositions[draggedPlayer - 1] = { top: newTop, left: newLeft };
        return newPositions;
      });
    } else if (selectedPhase === "serveReceive") {
      setServeReceivePositions((prev) => {
        const newPositions = [...prev];
        newPositions[draggedPlayer - 1] = { top: newTop, left: newLeft };
        return newPositions;
      });
    } else {
      setStartingPositions((prev) => {
        const newPositions = [...prev];
        newPositions[draggedPlayer - 1] = { top: newTop, left: newLeft };
        return newPositions;
      });
    }
  };

  const handleMouseUp = () => {
    if (draggedPlayer) {
      setDraggedPlayer(null);
    }
  };

  // Gestion du drag & drop des flèches
  const handleArrowMouseDown = (
    e: React.MouseEvent,
    arrowId: string,
    point: "start" | "end"
  ) => {
    if (!isEditMode || point === "start") return;

    e.preventDefault();
    e.stopPropagation();
    setDraggedArrow(arrowId);

    const rect = courtRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleArrowMouseMove = (e: React.MouseEvent) => {
    if (!draggedArrow || !courtRef.current) return;

    const rect = courtRef.current.getBoundingClientRect();
    const newX = Math.max(
      5,
      Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const newY = Math.max(
      5,
      Math.min(95, ((e.clientY - rect.top) / rect.height) * 100)
    );

    // Mettre à jour la position de la flèche
    if (selectedPhase === "serve") {
      setServeArrows((prev) =>
        prev.map((arrow) => {
          if (arrow.id === draggedArrow) {
            return { ...arrow, endX: newX, endY: newY };
          }
          return arrow;
        })
      );
    } else if (selectedPhase === "serveReceive") {
      setReceiveArrows((prev) =>
        prev.map((arrow) => {
          if (arrow.id === draggedArrow) {
            return { ...arrow, endX: newX, endY: newY };
          }
          return arrow;
        })
      );
    }
  };

  const handleArrowMouseUp = () => {
    setDraggedArrow(null);
  };

  // Ajouter une flèche pour un joueur spécifique
  const addArrowForPlayer = (playerId: number) => {
    const newArrow: MovementArrow = {
      id: `arrow-${Date.now()}`,
      startX: 0,
      startY: 0,
      endX: 25,
      endY: 25,
      color: "#3b82f6",
      playerId: playerId,
    };

    if (selectedPhase === "serve") {
      setServeArrows((prev) => [...prev, newArrow]);
    } else if (selectedPhase === "serveReceive") {
      setReceiveArrows((prev) => [...prev, newArrow]);
    }
  };

  // Supprimer une flèche
  const removeArrow = (arrowId: string) => {
    if (selectedPhase === "serve") {
      setServeArrows((prev) => prev.filter((arrow) => arrow.id !== arrowId));
    } else if (selectedPhase === "serveReceive") {
      setReceiveArrows((prev) => prev.filter((arrow) => arrow.id !== arrowId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow-lg p-4 border border-gray-100 gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base ${
              isEditMode
                ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200"
                : "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-200"
            }`}
          >
            {isEditMode ? "📖 Mode Lecture" : "✏️ Mode Édition"}
          </button>

          {isEditMode && (
            <button
              onClick={resetPositions}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-orange-200 text-sm sm:text-base"
            >
              🔄 Reset
            </button>
          )}
        </div>
      </div>

      <Court
        ref={courtRef}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleArrowMouseMove(e);
        }}
        onMouseUp={() => {
          handleMouseUp();
          handleArrowMouseUp();
        }}
        onMouseLeave={() => {
          handleMouseUp();
          handleArrowMouseUp();
        }}
      >
        <Arrows
          arrows={currentArrows}
          isEditMode={isEditMode}
          onArrowMouseDown={handleArrowMouseDown}
          onRemoveArrow={removeArrow}
        />

        <Players
          players={players}
          positions={currentPositions}
          isEditMode={isEditMode}
          draggedPlayer={draggedPlayer}
          currentArrows={currentArrows}
          onMouseDown={handleMouseDown}
          onAddArrow={addArrowForPlayer}
        />

        <EditModeIndicator isEditMode={isEditMode} />
      </Court>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 flex items-center justify-center">
          <span className="mr-2">🎯</span>
          Sélection des Phases
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {[
            { key: "starting", label: "Position de départ", icon: "🏁" },
            { key: "serve", label: "Service", icon: "🎾" },
            { key: "serveReceive", label: "Réception", icon: "🤲" },
          ].map((phase) => (
            <button
              key={phase.key}
              onClick={() => setSelectedPhase(phase.key as Phase)}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                selectedPhase === phase.key
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              <span className="text-base sm:text-lg">{phase.icon}</span>
              <span className="hidden sm:inline">{phase.label}</span>
            </button>
          ))}
        </div>
      </div>

      {isEditMode && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6 text-xs sm:text-sm text-blue-800">
          <h4 className="font-bold mb-3 text-base sm:text-lg flex items-center">
            <span className="mr-2">🎯</span>
            Mode Édition Activé
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>
                  <strong>Cliquez et glissez</strong> les joueurs pour les
                  repositionner
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>
                  <strong>Poignées rouges</strong> pour modifier la direction
                  des flèches
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>
                  <strong>Boutons × rouges</strong> pour supprimer les flèches
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>
                  <strong>Boutons + verts</strong> sur chaque joueur pour
                  ajouter des flèches
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolleyballCourt;
