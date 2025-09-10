import React from "react";

export const ExportImportButtons: React.FC = () => {
  return (
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
  );
};
