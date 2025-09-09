"use client";

import { useState } from "react";
import VolleyballCourt from "@/components/VolleyballCourt";
import { RotationSelector } from "@/components/RotationSelector";
import rotationsConfig from "@/config/rotations.json";

export default function Home() {
  const [selectedRotation, setSelectedRotation] = useState<string>("5-1");
  const [selectedStep, setSelectedStep] = useState<number>(1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Editeur de rotations de volley
          </h1>
          <div className="relative group">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold cursor-help hover:bg-blue-600 transition-colors">
              ?
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 sm:w-96 bg-gray-900 text-white text-xs sm:text-sm rounded-lg p-4 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              <div className="space-y-2">
                <div className="font-bold text-blue-300">
                  🎯 Comment utiliser l&apos;éditeur :
                </div>
                <div className="space-y-1">
                  <div>
                    • <strong>Sélectionnez une position</strong> (1-6) dans la
                    colonne de gauche
                  </div>
                  <div>
                    • <strong>Choisissez une phase</strong> : Départ, Service,
                    ou Réception
                  </div>
                  <div>
                    • <strong>Activez le mode édition</strong> pour déplacer les
                    joueurs
                  </div>
                  <div>
                    • <strong>Glissez-déposez</strong> les joueurs sur le
                    terrain
                  </div>
                  <div>
                    • <strong>Ajoutez des flèches</strong> avec les boutons +
                    verts
                  </div>
                  <div>
                    • <strong>Exportez/Importez</strong> vos configurations
                  </div>
                </div>
                <div className="text-blue-300 text-xs mt-2">
                  💡 Les modifications sont sauvegardées automatiquement
                </div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="xl:col-span-1 space-y-4 sm:space-y-6 order-2 xl:order-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
                <span className="mr-2">💾</span>
                Export/Import
              </h2>
              <div className="flex flex-col sm:flex-row xl:flex-col gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    const event = new CustomEvent("exportConfigurations");
                    window.dispatchEvent(event);
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-emerald-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span className="text-base sm:text-lg">📤</span>
                  <span>Exporter</span>
                </button>
                <label className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 font-semibold cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-200 flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <span className="text-base sm:text-lg">📥</span>
                  <span>Importer</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const event = new CustomEvent("importConfiguration", {
                        detail: e,
                      });
                      window.dispatchEvent(event);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <RotationSelector
              selectedRotation={selectedRotation}
              onRotationChange={setSelectedRotation}
              rotations={rotationsConfig.rotations}
            />

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
                <span className="mr-2">📍</span>
                Positions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <button
                    key={step}
                    onClick={() => setSelectedStep(step)}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-center text-sm sm:text-base ${
                      selectedStep === step
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                  >
                    Position {step}
                  </button>
                ))}
              </div>
            </div>
          </div>

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
