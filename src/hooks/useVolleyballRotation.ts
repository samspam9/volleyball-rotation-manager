import { useState, useEffect, useCallback } from "react";
import { Phase } from "@/types/volleyball";
import { PlayerPosition, MovementArrow } from "@/types/rotation";
import { getPlayersForPhase } from "@/utils/rotations";
// Store manager simple pour sauvegarder les positions
interface StoredData {
  startingPositions: PlayerPosition[];
  servePositions: PlayerPosition[];
  serveReceivePositions: PlayerPosition[];
  serveArrows: MovementArrow[];
  receiveArrows: MovementArrow[];
}

const positionStore = new Map<string, StoredData>();
import { getDefaultFallbackPositions } from "@/constants/volleyball";
import rotationsConfig from "@/config/rotations.json";

export const useVolleyballRotation = (
  rotation: string,
  selectedStep: number,
  selectedPhase: Phase
) => {
  // Obtenir la configuration de rotation actuelle
  const currentRotationConfig = rotationsConfig.rotations.find(
    (r) => r.id === rotation
  );

  // Fonction pour obtenir les positions par défaut depuis la config
  const getDefaultPositions = useCallback(
    (step: number, phase: Phase): PlayerPosition[] => {
      if (!currentRotationConfig?.config) {
        // Fallback si pas de config
        return getDefaultFallbackPositions();
      }

      const stepConfig = currentRotationConfig.config.steps.find(
        (s) => s.step === step
      );
      if (!stepConfig) return getDefaultFallbackPositions();

      return (
        stepConfig.phases[phase]?.positions || getDefaultFallbackPositions()
      );
    },
    [currentRotationConfig]
  );

  // Fonction pour obtenir les flèches par défaut depuis la config
  const getDefaultArrows = useCallback(
    (step: number, phase: Phase): MovementArrow[] => {
      if (!currentRotationConfig?.config) return [];

      const stepConfig = currentRotationConfig.config.steps.find(
        (s) => s.step === step
      );
      if (!stepConfig) return [];

      return stepConfig.phases[phase]?.arrows || [];
    },
    [currentRotationConfig]
  );

  // Positions des joueurs pour chaque phase - initialisées avec les positions de la config
  const [startingPositions, setStartingPositions] = useState<PlayerPosition[]>(
    () => getDefaultPositions(selectedStep, "starting")
  );

  const [servePositions, setServePositions] = useState<PlayerPosition[]>(() =>
    getDefaultPositions(selectedStep, "serve")
  );

  const [serveReceivePositions, setServeReceivePositions] = useState<
    PlayerPosition[]
  >(() => getDefaultPositions(selectedStep, "serveReceive"));

  // Flèches pour chaque phase - initialisées avec les flèches de la config
  const [serveArrows, setServeArrows] = useState<MovementArrow[]>(() =>
    getDefaultArrows(selectedStep, "serve")
  );
  const [receiveArrows, setReceiveArrows] = useState<MovementArrow[]>(() =>
    getDefaultArrows(selectedStep, "serveReceive")
  );

  // Charger les positions depuis le store ou la configuration par défaut
  useEffect(() => {
    const storeKey = `${rotation}-${selectedStep}-${selectedPhase}`;
    const storedData = positionStore.get(storeKey);

    if (storedData) {
      setStartingPositions(
        storedData.startingPositions ||
          getDefaultPositions(selectedStep, "starting")
      );
      setServePositions(
        storedData.servePositions || getDefaultPositions(selectedStep, "serve")
      );
      setServeReceivePositions(
        storedData.serveReceivePositions ||
          getDefaultPositions(selectedStep, "serveReceive")
      );
      setServeArrows(
        storedData.serveArrows || getDefaultArrows(selectedStep, "serve")
      );
      setReceiveArrows(
        storedData.receiveArrows ||
          getDefaultArrows(selectedStep, "serveReceive")
      );
    } else {
      setStartingPositions(getDefaultPositions(selectedStep, "starting"));
      setServePositions(getDefaultPositions(selectedStep, "serve"));
      setServeReceivePositions(
        getDefaultPositions(selectedStep, "serveReceive")
      );
      setServeArrows(getDefaultArrows(selectedStep, "serve"));
      setReceiveArrows(getDefaultArrows(selectedStep, "serveReceive"));
    }
  }, [
    rotation,
    selectedStep,
    selectedPhase,
    getDefaultPositions,
    getDefaultArrows,
  ]);

  // Obtenir les positions actuelles selon la phase
  const getCurrentPositions = (): PlayerPosition[] => {
    switch (selectedPhase) {
      case "starting":
        return startingPositions;
      case "serve":
        return servePositions;
      case "serveReceive":
        return serveReceivePositions;
      default:
        return getDefaultPositions(selectedStep, selectedPhase);
    }
  };

  // Obtenir les flèches actuelles selon la phase
  const getCurrentArrows = (): MovementArrow[] => {
    if (selectedPhase === "serve") {
      return serveArrows.map((arrow) => {
        const playerPos = servePositions[arrow.playerId - 1];
        return {
          ...arrow,
          startX: playerPos.left,
          startY: playerPos.top,
        };
      });
    } else if (selectedPhase === "serveReceive") {
      return receiveArrows.map((arrow) => {
        const playerPos = serveReceivePositions[arrow.playerId - 1];
        return {
          ...arrow,
          startX: playerPos.left,
          startY: playerPos.top,
        };
      });
    }
    return [];
  };

  // Obtenir les joueurs selon la phase
  const getPlayers = (): typeof getPlayersForPhase extends (
    phase: Phase,
    step: number,
    startingPositions?: PlayerPosition[]
  ) => infer R
    ? R
    : never => {
    return getPlayersForPhase(selectedPhase, selectedStep, startingPositions);
  };

  // Sauvegarder les positions actuelles dans le store
  const saveCurrentPositions = () => {
    const storeKey = `${rotation}-${selectedStep}-${selectedPhase}`;
    positionStore.set(storeKey, {
      startingPositions,
      servePositions,
      serveReceivePositions,
      serveArrows,
      receiveArrows,
    });
    console.log("Positions sauvegardées dans le store !", storeKey);
  };

  // Exporter toutes les configurations
  const exportConfigurations = () => {
    const steps = [];

    // Générer toutes les 6 étapes avec les 3 phases
    for (let step = 1; step <= 6; step++) {
      const stepData = {
        step,
        phases: {
          starting: {
            positions: getDefaultPositions(step, "starting"),
            arrows: getDefaultArrows(step, "starting"),
          },
          serve: {
            positions: getDefaultPositions(step, "serve"),
            arrows: getDefaultArrows(step, "serve"),
          },
          serveReceive: {
            positions: getDefaultPositions(step, "serveReceive"),
            arrows: getDefaultArrows(step, "serveReceive"),
          },
        },
      };

      // Ajouter les données du store si disponibles
      for (const phase of ["starting", "serve", "serveReceive"]) {
        const storeKey = `${rotation}-${step}-${phase}`;
        const storedData = positionStore.get(storeKey);
        if (storedData) {
          const phaseKey = phase as keyof typeof stepData.phases;
          const positionsKey = `${phase}Positions` as keyof StoredData;
          const arrowsKey = `${
            phase === "serve" ? "serve" : "receive"
          }Arrows` as keyof StoredData;

          stepData.phases[phaseKey] = {
            positions:
              (storedData[positionsKey] as PlayerPosition[]) ||
              stepData.phases[phaseKey].positions,
            arrows:
              (storedData[arrowsKey] as MovementArrow[]) ||
              stepData.phases[phaseKey].arrows,
          };
        }
      }

      steps.push(stepData);
    }

    const globalConfig = {
      name: `Rotation ${rotation} - Configuration complète`,
      rotation,
      totalSteps: 6,
      steps,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(globalConfig, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `volleyball-rotation-${rotation}-complete.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Configuration complète exportée !", globalConfig);
    alert(
      `Configuration complète exportée avec ${globalConfig.steps.length} étapes (6 étapes × 3 phases) !`
    );
  };

  // Réinitialiser les positions
  const resetPositions = () => {
    const defaultStarting = getDefaultPositions(selectedStep, "starting");
    const defaultServe = getDefaultPositions(selectedStep, "serve");
    const defaultReceive = getDefaultPositions(selectedStep, "serveReceive");
    const defaultServeArrows = getDefaultArrows(selectedStep, "serve");
    const defaultReceiveArrows = getDefaultArrows(selectedStep, "serveReceive");

    setStartingPositions(defaultStarting);
    setServePositions(defaultServe);
    setServeReceivePositions(defaultReceive);
    setServeArrows(defaultServeArrows);
    setReceiveArrows(defaultReceiveArrows);
    saveCurrentPositions();
  };

  return {
    // États
    setStartingPositions,
    setServePositions,
    setServeReceivePositions,
    setServeArrows,
    setReceiveArrows,

    // Fonctions
    getCurrentPositions,
    getCurrentArrows,
    getPlayers,
    saveCurrentPositions,
    exportConfigurations,
    resetPositions,
  };
};
