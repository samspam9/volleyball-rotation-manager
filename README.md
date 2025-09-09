# 🏐 Visualisateur de Rotations de Volley

Application web interactive pour visualiser et comprendre les rotations de volley-ball.

## ✨ Fonctionnalités

- **3 types de rotations** : 1-5, 2-4, 3-3
- **Visualisation interactive** du terrain avec 6 joueurs
- **Navigation par étapes** (6 étapes de rotation)
- **Animation automatique** des rotations
- **Interface moderne** et responsive

## 🚀 Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Construire pour la production
npm run build

# Démarrer en mode production
npm start
```

## 🏗️ Structure du projet

```
src/
├── app/                    # Pages Next.js
│   ├── page.tsx          # Page principale
│   ├── layout.tsx        # Layout de l'application
│   └── globals.css       # Styles globaux
├── components/            # Composants React
│   ├── index.ts          # Export centralisé des composants
│   ├── VolleyballCourt.tsx    # Terrain de volley
│   ├── RotationSelector.tsx   # Sélecteur de rotation
│   └── RotationSteps.tsx      # Navigation des étapes
└── types/                 # Types TypeScript
    └── global.d.ts       # Déclarations globales
```

## 📁 Alias d'import

Le projet utilise des alias d'import pour simplifier les chemins :

```typescript
// ✅ Recommandé - Import depuis l'index des composants
import { VolleyballCourt, RotationSelector, RotationSteps } from "@/components";

// ✅ Alternative - Import direct avec alias
import VolleyballCourt from "@/components/VolleyballCourt";

// ❌ Éviter - Import relatif
import VolleyballCourt from "../components/VolleyballCourt";
```

### Configuration des alias

- **`@/*`** → `./src/*` (configuré dans `tsconfig.json`)
- **`@/components`** → `./src/components`
- **`@/app`** → `./src/app`
- **`@/types`** → `./src/types`

## 🎨 Technologies utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS utilitaire
- **React 19** - Bibliothèque UI

## 🏐 Types de rotations

### Rotation 1-5

- **Formation classique** avec libéro en zone 6
- **Idéale pour la défense**
- **Libéro** : Zone 6 (réception)

### Rotation 2-4

- **Formation équilibrée** avec libéro en zone 5
- **Bonne pour l'attaque et la défense**
- **Libéro** : Zone 5 (milieu)

### Rotation 3-3

- **Formation équilibrée** pour débutants
- **Distribution uniforme** des rôles
- **Parfaite pour l'apprentissage**

## 🎯 Utilisation

1. **Sélectionnez** une rotation dans le panneau de gauche
2. **Visualisez** les joueurs sur le terrain virtuel
3. **Naviguez** entre les étapes avec "Étape suivante"
4. **Animez** la rotation complète avec "Animer la rotation"

## 🔧 Développement

### Ajouter un nouveau composant

1. Créez le composant dans `src/components/`
2. Ajoutez l'export dans `src/components/index.ts`
3. Importez depuis `@/components`

### Styles personnalisés

Les styles personnalisés sont dans `src/app/globals.css` avec :

- Animations CSS personnalisées
- Variables CSS pour les couleurs
- Classes utilitaires pour le volley

## 📱 Responsive

L'application s'adapte à tous les écrans :

- **Mobile** : Layout vertical optimisé
- **Tablet** : Grille adaptative
- **Desktop** : Layout en 3 colonnes

## 🎨 Personnalisation

Vous pouvez facilement personnaliser :

- Les couleurs des joueurs
- Les positions sur le terrain
- Les types de rotations
- Les animations et transitions
