# Residual Labs — Site Ultra-Moderne

Site professionnel de Residual Labs avec design premium, animations GSAP et connectivité serverless.

## 🎨 Design & Technologie

- **GSAP 3.12** : Animations cinématiques et parallax
- **ScrollTrigger** : Animations au scroll
- **Bento Grid** : Layout moderne et épuré
- **Glassmorphism** : Effets de verre dépoli
- **Dark Mode Premium** : Design OLED optimisé

## 🛠️ Structure

```
/
├── index.html           # Page principale (tout-en-un)
├── netlify.toml         # Configuration Netlify
├── api/
│   └── send-telegram.js # Fonction serverless pour Telegram
└── README.md
```

## 🚀 Déploiement sur Netlify

### 1. Connecter le dépôt GitHub
1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez sur "New site from Git"
3. Sélectionnez votre dépôt `residual-labs-site`

### 2. Configurer les variables d'environnement
Dans **Site configuration** > **Environment variables**, ajoutez :

```
TELEGRAM_BOT_TOKEN=votre_token_ici
TELEGRAM_CHAT_ID=votre_chat_id_ici
```

### 3. Déploiement automatique
Chaque `git push` sur `master` déclenche un nouveau déploiement.

## 📨 Fonctions Serverless

### `/.netlify/functions/send-telegram`

Envoie des messages Telegram de manière sécurisée (clés jamais exposées au client).

**Exemple d'utilisation :**

```javascript
fetch('/.netlify/functions/send-telegram', {
  method: 'POST',
  body: JSON.stringify({
    message: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+33612345678',
      project: 'Description du projet'
    },
    type: 'contact'
  })
})
```

## 🎯 Fonctionnalités

- ✅ Design ultra-moderne avec GSAP
- ✅ Animations au scroll (ScrollTrigger)
- ✅ Bento Grid responsive
- ✅ Sécurité maximale (clés API côté serveur)
- ✅ Déploiement automatique
- ✅ Performance optimisée

## 📱 Responsive

Le site est entièrement responsive et fonctionne parfaitement sur :
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔒 Sécurité

- Pas de clés API exposées en client
- Headers de sécurité configurés
- CORS protégé
- CSP (Content Security Policy) activée

## 📊 Analytics

Les données de visite sont envoyées automatiquement à votre bot Telegram via la fonction serverless.

## 🎬 Animations GSAP

- Fade-in des éléments au scroll
- Scale animation des stat cards
- Parallax subtle du fond
- Hover effects fluides

---

**Créé avec ❤️ par Manus**
