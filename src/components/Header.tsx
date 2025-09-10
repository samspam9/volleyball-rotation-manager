import React from "react";

export const Header: React.FC = () => {
  return (
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
  );
};
