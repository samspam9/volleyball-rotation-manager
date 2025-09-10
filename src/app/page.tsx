"use client";

import { useState } from "react";
import VolleyballCourt from "@/components/VolleyballCourt";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import rotationsConfig from "@/config/rotations.json";

export default function Home() {
  const [selectedRotation, setSelectedRotation] = useState<string>("5-1");
  const [selectedStep, setSelectedStep] = useState<number>(1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <Sidebar
            selectedRotation={selectedRotation}
            selectedStep={selectedStep}
            onRotationChange={setSelectedRotation}
            onStepChange={setSelectedStep}
            rotations={rotationsConfig.rotations}
          />

          <div className="xl:col-span-3 space-y-4 sm:space-y-6 order-1 xl:order-2">
            <VolleyballCourt
              rotation={selectedRotation}
              selectedStep={selectedStep}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
