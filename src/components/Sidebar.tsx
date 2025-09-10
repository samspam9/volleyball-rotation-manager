import React from "react";
import { RotationSelector } from "./RotationSelector";
import { ExportImportButtons } from "./ExportImportButtons";
import { PositionSelector } from "./PositionSelector";
import { Rotation } from "@/types/rotation";

interface SidebarProps {
  selectedRotation: string;
  selectedStep: number;
  onRotationChange: (rotation: string) => void;
  onStepChange: (step: number) => void;
  rotations: Rotation[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedRotation,
  selectedStep,
  onRotationChange,
  onStepChange,
  rotations,
}) => {
  return (
    <div className="xl:col-span-1 space-y-4 sm:space-y-6 order-2 xl:order-1">
      <ExportImportButtons />
      <RotationSelector
        selectedRotation={selectedRotation}
        onRotationChange={onRotationChange}
        rotations={rotations}
      />
      <PositionSelector
        selectedStep={selectedStep}
        onStepChange={onStepChange}
      />
    </div>
  );
};
