# 🩺 Mon Suivi Diabète — React + Vercel

## 📁 Structure du projet

```
mon-suivi-diabete/
├── public/
│   ├── cover.jpg                        ← couverture du livret (déjà incluse)
│   ├── LIVRET_MON_SUIVI_DIABETE.pdf     ← à uploader
│   └── fiches/
│       ├── alimentation-glucides.pdf
│       ├── activite-physique.pdf
│       ├── medicaments-insuline.pdf
│       ├── surveillance-glycemique.pdf
│       ├── hypoglycemie.pdf
│       └── complications-depistage.pdf
├── src/
│   ├── config.js          ← ✏️ SEUL FICHIER À MODIFIER
│   ├── constants.js
│   ├── components/
│   └── ...
```

---

## ✏️ ÉTAPE 1 — Personnaliser (30 secondes)

Ouvrez `src/config.js` et remplissez vos infos :

```js
const CONFIG = {
  medecinNom:  "Dr. Pauline DUPONT",
  specialite:  "Médecin généraliste",
  formspreeId: "xpzgkwqb",   // ← votre ID Formspree
}
```

---

## 📧 ÉTAPE 2 — Formspree (votre email reste invisible)

1. Allez sur **https://formspree.io** → créez un compte gratuit
2. Cliquez **"New Form"** → entrez votre adresse email pro
3. Copiez l'ID fourni (ex: `xpzgkwqb`) → collez dans `config.js`

---

## 🚀 ÉTAPE 3 — Déployer sur Vercel

### 3a. Pousser sur GitHub

1. Créez un repo sur **https://github.com** (public ou privé)
2. Uploadez tout le dossier du projet

Ou avec Git en terminal :
```bash
git init
git add .
git commit -m "Mon Suivi Diabète"
git remote add origin https://github.com/VOTRE_PSEUDO/mon-suivi-diabete.git
git push -u origin main
```

### 3b. Déployer sur Vercel

1. Allez sur **https://vercel.com** → connectez votre compte GitHub
2. Cliquez **"Add New Project"**
3. Importez votre repo `mon-suivi-diabete`
4. Vercel détecte Vite automatiquement → cliquez **"Deploy"**
5. ⏳ 2 minutes plus tard, votre URL est prête :

```
https://mon-suivi-diabete.vercel.app
```

**À chaque modification**, Vercel redéploie automatiquement dès que vous poussez sur GitHub.

---

## 📱 ÉTAPE 4 — QR Code

1. Allez sur **https://www.qr-code-generator.com**
2. Collez votre URL Vercel
3. Téléchargez en PNG haute résolution
4. Insérez dans votre livret (pages 10 et 13)

---

## 🛠️ Développement local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

---

## ✅ Récapitulatif

| Quoi | Où |
|------|----|
| Votre nom & spécialité | `src/config.js` |
| ID Formspree | `src/config.js` |
| Livret PDF | `public/LIVRET_MON_SUIVI_DIABETE.pdf` |
| Fiches PDF | `public/fiches/` |
| Couverture | `public/cover.jpg` (déjà incluse) |
