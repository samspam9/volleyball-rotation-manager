export interface MovementArrow {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  playerId: number;
}

export interface PlayerPosition {
  top: number;
  left: number;
}

export interface PhaseConfig {
  positions: PlayerPosition[];
  arrows: MovementArrow[];
}

export interface StepConfig {
  step: number;
  phases: {
    starting: PhaseConfig;
    serve: PhaseConfig;
    serveReceive: PhaseConfig;
  };
}

export interface RotationConfig {
  name: string;
  rotation: string;
  totalSteps: number;
  steps: StepConfig[];
}

export interface Rotation {
  id: string;
  name: string;
  description: string;
  config?: RotationConfig | null;
}
