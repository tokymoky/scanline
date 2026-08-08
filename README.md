# Scanline — Image to Text

Deux modes d'extraction :
- **Standard** — Tesseract.js, tourne dans le navigateur, gratuit, illimité,
  aucune clé. Bon pour du texte imprimé net.
- **Avancée** — Google Gemini (vision), meilleure sur l'écriture manuscrite
  et les mises en page complexes. Gratuite dans les limites du free tier,
  mais nécessite une clé API et un backend pour la garder secrète.

## Structure

```
scanline/
├── index.html              ← page + logique Tesseract (mode standard)
├── api/
│   └── extract-advanced.js ← fonction serverless, appelle Gemini (mode avancé)
└── README.md
```

## Déploiement

Comme le mode avancé a besoin d'un backend, on repasse par GitHub + Vercel
(GitHub Pages seul ne suffit plus, contrairement à la version 100% Tesseract).

### 1. Obtenir une clé API Gemini (gratuite)
- Va sur https://aistudio.google.com
- Connecte-toi avec un compte Google
- "Get API key" → crée une clé
- **Vérifie le nom du modèle actuel** dans la doc à ce moment-là — le fichier
  utilise `gemini-1.5-flash`, mais Google change ces noms de temps en temps ;
  si l'extraction avancée renvoie une erreur, c'est la première chose à checker.

### 2. Pousser sur GitHub
Upload direct sur github.com (comme avant) : dézippe et dépose tous les
fichiers, dossier `api/` inclus.

### 3. Importer sur Vercel
- vercel.com → "Add New Project" → sélectionne le repo
- Vercel détecte automatiquement `api/extract-advanced.js` comme fonction serverless

### 4. Ajouter la clé en variable d'environnement
- Settings → Environment Variables → `GEMINI_API_KEY` = ta clé
- Redéploie pour appliquer

### 5. Tester
- Le bouton "Extraire le texte" (standard) fonctionne partout, y compris sur
  GitHub Pages seul, sans backend.
- Le bouton "Extraction avancée" ne fonctionne que sur le déploiement Vercel
  (celui qui a la clé configurée).

## Notes
- Le free tier Gemini a des limites de requêtes par minute/jour — largement
  suffisant pour tester et un usage personnel, mais ajoute une limite basique
  (par IP) avant de partager le lien largement.
- Si tu veux revenir à une version 100% gratuite/sans backend, retire le
  bouton "avancée" et le dossier `api/` — Tesseract seul tourne sur GitHub
  Pages tel quel.
