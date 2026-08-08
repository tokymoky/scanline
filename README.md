# Scanline — Image to Text

Outil simple : dépose une image, récupère le texte extrait.
L'extraction est un vrai OCR (Tesseract.js) qui tourne entièrement
dans le navigateur — aucune API, aucune clé, aucun serveur.

## Structure

```
scanline/
└── index.html   ← tout est ici (page + logique OCR)
```

## Déploiement (GitHub Pages — gratuit, sans backend)

### 1. Créer le repo GitHub
```bash
cd scanline
git init
git add .
git commit -m "Premier jet: image to text (OCR local)"
git remote add origin https://github.com/<ton-compte>/scanline.git
git push -u origin main
```

### 2. Activer GitHub Pages
- Sur GitHub : Settings → Pages
- Source : "Deploy from a branch" → branche `main` → dossier `/ (root)`
- Sauvegarde. GitHub te donne une URL du type
  `https://<ton-compte>.github.io/scanline/`

C'est tout — pas de Vercel, pas de clé API, pas de coût par utilisation.

## Notes
- La précision dépend de la qualité de l'image (texte net, bien cadré = meilleurs résultats).
- Tesseract.js est configuré en français + anglais (`fra+eng`) — ajoute d'autres
  langues si besoin (liste des codes : https://tesseract.projectnaptha.com/langs).
- Le premier chargement télécharge le modèle de langue (quelques Mo) — normal,
  c'est mis en cache ensuite par le navigateur.
