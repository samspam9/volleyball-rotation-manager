export interface Player {
  id: number;
  role: string;
  abbreviation: string;
}

export interface PlayerPosition {
  top: number;
  left: number;
}

export interface MovementArrow {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  playerId: number;
}

export type Phase = "starting" | "serve" | "serveReceive";
