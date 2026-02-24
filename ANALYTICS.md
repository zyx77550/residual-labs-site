# 📊 Système de Tracking & Analytics - Residual Labs

Un système complet de tracking en temps réel qui envoie les données des visiteurs directement sur Telegram.

---

## 🎯 Qu'est-ce que tu reçois ?

À chaque visite, tu reçois un message Telegram avec :

### 🌍 **Localisation**
- Pays du visiteur
- Ville
- Adresse IP
- Fournisseur Internet (ISP)

### 📱 **Appareil**
- Type : Desktop, Mobile ou Tablet
- Système d'exploitation : Windows, macOS, Linux, iOS, Android
- Navigateur : Chrome, Safari, Firefox, Edge

### 🔗 **Source de Trafic**
- D'où vient le visiteur :
  - Direct (tape l'URL)
  - LinkedIn
  - X (Twitter)
  - Discord
  - Google, Bing, etc.
  - Autre site

### 📄 **Activité**
- Nombre de pages visitées
- Dernière page consultée
- Durée de la session (en secondes)
- Langue du navigateur
- Fuseau horaire

### 🕐 **Timestamp**
- Heure exacte de la visite

---

## 🚀 Comment ça marche ?

1. **Visiteur arrive sur le site** → Le script `analytics.js` se charge
2. **Données collectées** → Localisation, appareil, source, pages
3. **Envoi Telegram** → Message formaté envoyé toutes les 30 secondes
4. **Tu reçois une notification** → Sur Telegram en temps réel

---

## 📝 Exemple de Message Telegram

```
📊 NOUVELLE VISITE - RESIDUAL LABS

🌍 Localisation
• Pays: France
• Ville: Paris
• IP: 192.168.1.1
• ISP: Orange

📱 Appareil
• Type: Desktop
• OS: macOS
• Navigateur: Chrome

🔗 Source de Trafic
• Provenance: LinkedIn

📄 Activité
• Pages visitées: 3
• Dernière page: /pages/services.html
• Durée: 245s
• Langue: fr-FR
• Fuseau horaire: Europe/Paris

🕐 Heure: 23/02/2024 18:42:15
```

---

## ⚙️ Configuration

### Telegram Bot Token
```
8523706065:AAGAC3mealnTsQpF4lDyK5AsznmHRhbjZMo
```

### Chat ID
```
6255000093
```

### Pour modifier :
1. Ouvre `assets/js/analytics.js`
2. Cherche les lignes :
   ```javascript
   const TELEGRAM_BOT_TOKEN = '8523706065:...';
   const TELEGRAM_CHAT_ID = '6255000093';
   ```
3. Remplace par tes propres valeurs

---

## 📊 Fréquence d'Envoi

- **Première visite** : Immédiat
- **Mises à jour** : Toutes les 30 secondes
- **À la fermeture** : Avant de quitter la page

---

## 🔒 Respect de la Vie Privée

⚠️ **Important** : Ce système collecte des données personnelles (IP, localisation).

**Recommandations** :
- Ajoute une mention dans ta politique de confidentialité
- Informe tes visiteurs du tracking
- Respecte le RGPD si tu as des visiteurs européens

---

## 🛠️ Troubleshooting

### Je ne reçois pas de messages
1. Vérifie le Bot Token et Chat ID
2. Assure-toi que le bot est dans le chat
3. Vérifie que `analytics.js` est chargé (console du navigateur)

### Les données ne sont pas exactes
- La localisation dépend de l'API `ipapi.co` (gratuit, peut avoir des délais)
- Le navigateur peut bloquer certaines données

### Comment désactiver le tracking ?
Supprime ou commente cette ligne dans `index.html` et `pages/*.html` :
```html
<script src="assets/js/analytics.js"></script>
```

---

## 📈 Améliorations Futures

- [ ] Dashboard web pour visualiser les stats
- [ ] Graphiques de trafic
- [ ] Rapports quotidiens
- [ ] Détection des conversions (clics sur CTA)
- [ ] Heatmap des clics
- [ ] Temps de chargement des pages

---

## 📞 Support

Pour toute question : contact@residuallabs.io
