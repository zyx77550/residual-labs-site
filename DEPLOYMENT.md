# Guide de Déploiement - Residual Labs

Ce guide te montre comment déployer ton site gratuitement sur plusieurs plateformes.

---

## 🚀 Option 1 : GitHub Pages (Recommandé - Gratuit & Automatique)

### Étape 1 : Créer un repo GitHub
1. Va sur [github.com/new](https://github.com/new)
2. Nomme le repo : `residual-labs-site`
3. Rends-le **Public** (obligatoire pour Pages)
4. Clique "Create repository"

### Étape 2 : Pousser le code
```bash
cd /home/ubuntu/residual-labs-site
git remote add origin https://github.com/YOUR_USERNAME/residual-labs-site.git
git branch -M main
git push -u origin main
```

### Étape 3 : Activer GitHub Pages
1. Va dans les paramètres du repo
2. Scroll jusqu'à "GitHub Pages"
3. Sélectionne "Deploy from a branch"
4. Branche : `main`, dossier : `/ (root)`
5. Clique "Save"

**Ton site sera en ligne à** : `https://YOUR_USERNAME.github.io/residual-labs-site`

---

## 🚀 Option 2 : Netlify (Gratuit & Super Simple)

### Étape 1 : Pousser sur GitHub (voir Option 1)

### Étape 2 : Connecter Netlify
1. Va sur [netlify.com](https://netlify.com)
2. Clique "Sign up" → "GitHub"
3. Autorise Netlify à accéder à tes repos
4. Clique "New site from Git"
5. Sélectionne `residual-labs-site`
6. Clique "Deploy site"

**Ton site sera en ligne à** : `https://your-site.netlify.app`

**Bonus** : Chaque fois que tu pushes sur GitHub, Netlify redéploie automatiquement !

---

## 🚀 Option 3 : Vercel (Gratuit & Ultra-Rapide)

### Étape 1 : Pousser sur GitHub (voir Option 1)

### Étape 2 : Connecter Vercel
1. Va sur [vercel.com](https://vercel.com)
2. Clique "Sign up" → "GitHub"
3. Autorise Vercel à accéder à tes repos
4. Clique "Import Project"
5. Sélectionne `residual-labs-site`
6. Clique "Import"

**Ton site sera en ligne à** : `https://residual-labs-site.vercel.app`

---

## 🚀 Option 4 : Cloudflare Pages (Gratuit & Très Rapide)

### Étape 1 : Pousser sur GitHub (voir Option 1)

### Étape 2 : Connecter Cloudflare
1. Va sur [dash.cloudflare.com](https://dash.cloudflare.com)
2. Clique "Pages"
3. Clique "Create a project" → "Connect to Git"
4. Sélectionne ton repo GitHub
5. Clique "Begin setup"
6. Laisse les paramètres par défaut
7. Clique "Save and deploy"

**Ton site sera en ligne à** : `https://residual-labs-site.pages.dev`

---

## 🚀 Option 5 : Surge.sh (Gratuit & CLI)

### Installation
```bash
npm install -g surge
```

### Déploiement
```bash
cd /home/ubuntu/residual-labs-site
surge
```

Puis suis les instructions. Tu peux choisir ton domaine : `your-domain.surge.sh`

---

## 📊 Comparaison des Options

| Plateforme | Gratuit | Déploiement Auto | Domaine Custom | Vitesse | Recommandé |
|---|---|---|---|---|---|
| GitHub Pages | ✅ | ✅ (Git) | ✅ | Bon | ⭐ |
| Netlify | ✅ | ✅ (Git) | ✅ | Excellent | ⭐⭐ |
| Vercel | ✅ | ✅ (Git) | ✅ | Excellent | ⭐⭐ |
| Cloudflare Pages | ✅ | ✅ (Git) | ✅ | Excellent | ⭐⭐ |
| Surge.sh | ✅ | ❌ (Manuel) | ✅ | Bon | ⭐ |

---

## 🎯 Domaine Personnalisé

Une fois déployé, tu peux ajouter un domaine personnalisé (ex: `residuallabs.io`).

**Avec Netlify/Vercel/Cloudflare** :
1. Va dans les paramètres du site
2. Ajoute ton domaine
3. Modifie les DNS de ton registrar (Namecheap, GoDaddy, etc.)
4. Attends 24-48h pour la propagation

---

## 🔄 Mise à Jour du Site

Après le déploiement initial, pour mettre à jour :

```bash
# Fais tes modifications localement
# ...

# Puis pousse sur GitHub
git add .
git commit -m "Description de tes modifications"
git push origin main
```

**Netlify/Vercel/Cloudflare redéploieront automatiquement** !

---

## ✅ Checklist Avant Déploiement

- [ ] Liens LinkedIn et X vérifiés
- [ ] Email de contact correct dans le formulaire
- [ ] Telegram Bot Token et Chat ID vérifiés
- [ ] Tous les liens internes fonctionnent
- [ ] Site responsive (testé sur mobile)
- [ ] Images optimisées (si tu en ajoutes)

---

## 📞 Support

Si tu as des questions, contacte : contact@residuallabs.io

Bonne chance ! 🚀
