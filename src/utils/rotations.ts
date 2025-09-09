import { PlayerPosition, Phase, Player } from "@/types/volleyball";
import { BASE_PLAYERS } from "@/constants/volleyball";

// Fonction pour obtenir les joueurs selon la phase
export const getPlayersForPhase = (
  phase: Phase,
  selectedStep: number,
  startingPositions?: PlayerPosition[]
): Player[] => {
  const basePlayers = [...BASE_PLAYERS];

  // Le libero apparaît en phase de service ET de réception selon les règles
  if (phase === "serve" || phase === "serveReceive") {
    // Utiliser les positions de départ pour déterminer qui est en ligne arrière
    if (startingPositions) {
      // Trouver quel MB est sur la ligne arrière (positions 1, 6, 5)
      const backRowMB = startingPositions.findIndex((pos, index) => {
        // Vérifier si c'est un MB (index 2 ou 4) et s'il est sur la ligne arrière
        const isMB = index === 2 || index === 4; // MB1 ou MB2
        const isBackRow = pos.top > 70; // Ligne arrière (positions 1, 6, 5)
        return isMB && isBackRow;
      });

      // En phase de service, vérifier si c'est le MB qui sert (position 1)
      if (phase === "serve") {
        // Trouver qui est en position 1 (bas-droit) - celui qui sert
        const position1Index = startingPositions.findIndex(
          (pos) => pos.top > 70 && pos.left > 70
        );

        // Vérifier si c'est un MB qui sert (index 2 ou 4)
        const isMBserving = position1Index === 2 || position1Index === 4;

        // Si c'est le MB qui sert, ne pas le remplacer par le libero
        if (isMBserving) {
          return basePlayers;
        }
      }

      // Remplacer le MB de la ligne arrière par le libero
      if (backRowMB !== -1) {
        if (backRowMB === 2) {
          basePlayers[2] = { id: 3, role: "Libero", abbreviation: "L" };
        } else if (backRowMB === 4) {
          basePlayers[4] = { id: 5, role: "Libero", abbreviation: "L" };
        }
      }
    }
  }

  return basePlayers;
};
