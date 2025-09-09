import { Player, PlayerPosition } from "@/types/volleyball";

export const BASE_PLAYERS: Player[] = [
  { id: 1, role: "Setter", abbreviation: "S" },
  { id: 2, role: "Outside Hitter 1", abbreviation: "OH1" },
  { id: 3, role: "Middle Blocker 1", abbreviation: "MB1" },
  { id: 4, role: "Opposite", abbreviation: "OPP" },
  { id: 5, role: "Middle Blocker 2", abbreviation: "MB2" },
  { id: 6, role: "Outside Hitter 2", abbreviation: "OH2" },
];

export const PHASES = [
  { key: "starting", label: "Position de départ" },
  { key: "serve", label: "Service" },
  { key: "serveReceive", label: "Réception" },
] as const;

export const COURT_DIMENSIONS = {
  width: 500,
  height: 583,
};

export const PLAYER_SIZE = {
  width: 48, // w-12
  height: 48, // h-12
};

// Positions de fallback par défaut (utilisées seulement si pas de configuration)
export const getDefaultFallbackPositions = (): PlayerPosition[] => [
  { top: 75, left: 75 }, // S - Setter (position 1 - arrière droite)
  { top: 60, left: 75 }, // OH1 - Outside Hitter 1 (position 2 - avant droite)
  { top: 75, left: 50 }, // MB1 - Middle Blocker 1 (position 3 - arrière centre)
  { top: 60, left: 25 }, // OPP - Opposite (position 4 - avant gauche)
  { top: 60, left: 50 }, // MB2 - Middle Blocker 2 (position 5 - avant centre)
  { top: 75, left: 25 }, // OH2 - Outside Hitter 2 (position 6 - arrière gauche)
];
