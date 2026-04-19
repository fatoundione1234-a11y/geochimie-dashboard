# 🪨 Dashboard Géochimique — Zone Aurifère

Dashboard interactif de visualisation des données géochimiques aurifères du Bouclier Précambrien.

**[👉 Voir le dashboard en ligne](https://VOTRE-USERNAME.github.io/geochimie-dashboard/)**

![Dashboard Preview](https://img.shields.io/badge/status-actif-brightgreen) ![Licence](https://img.shields.io/badge/licence-MIT-blue) ![Données](https://img.shields.io/badge/donn%C3%A9es-15%20%C3%A9chantillons-gold)

---

## 📊 Fonctionnalités

| Section | Contenu |
|---|---|
| **Vue d'ensemble** | Cartes métriques, histogramme Au, donut par classe, Au par formation, évolution vs profondeur |
| **Pathfinders** | Corrélations r, scatter As/Te vs Au, barres d'anomalie vs seuil |
| **Éléments majeurs** | Radar géochimique, scatter SiO₂/Fe₂O₃, histogramme groupé |
| **Tableau** | Données complètes, recherche en temps réel, tri par colonne |

## 🗂️ Structure du projet

```
geochimie-dashboard/
├── index.html          ← Page principale
├── css/
│   └── style.css       ← Styles (thème dark GitHub)
├── js/
│   └── app.js          ← Logique, graphiques Chart.js
├── data/
│   └── data.js         ← Données géochimiques (15 échantillons)
└── README.md
```

## 🚀 Déploiement sur GitHub Pages

### Étape 1 — Créer le dépôt

```bash
git init
git add .
git commit -m "Initial commit — dashboard géochimique"
```

Créez un nouveau dépôt sur [github.com/new](https://github.com/new) nommé `geochimie-dashboard`.

```bash
git remote add origin https://github.com/VOTRE-USERNAME/geochimie-dashboard.git
git branch -M main
git push -u origin main
```

### Étape 2 — Activer GitHub Pages

1. Allez dans **Settings** de votre dépôt
2. Cliquez sur **Pages** (menu gauche)
3. Source : **Deploy from a branch**
4. Branch : `main` / `/ (root)`
5. Cliquez **Save**

Votre dashboard sera accessible en ~1 minute à :
`https://VOTRE-USERNAME.github.io/geochimie-dashboard/`

## 📦 Technologies

- **Chart.js 4.4** — graphiques interactifs
- **CSS custom properties** — thème dark cohérent
- **Vanilla JS** — aucune dépendance lourde
- **GitHub Pages** — hébergement gratuit

## 🔢 Données incluses

15 échantillons géochimiques avec :
- **Or (Au)** en ppb — de 12 à 12 400 ppb
- **Éléments majeurs** : SiO₂, Al₂O₃, Fe₂O₃, MgO, CaO, Na₂O, K₂O
- **Traces** : As, Sb, Cu, Pb, Zn, Ag, Te, S

### Classification des teneurs

| Classe | Seuil | Interprétation |
|---|---|---|
| 🔴 Très haute | ≥ 2000 ppb | Cible prioritaire |
| 🟠 Haute | 500–1999 ppb | Cible secondaire |
| 🟡 Modérée | 50–499 ppb | Zone d'intérêt |
| ⬜ Faible | < 50 ppb | Non significatif |

## 📝 Licence

MIT — libre d'utilisation et de modification.
