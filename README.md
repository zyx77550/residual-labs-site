# Residual Labs - Site Web Professionnel

Un site web moderne et complet pour **Residual Labs**, un studio technique spécialisé dans les agents IA, le scraping complexe et les backends haute friction.

## 📋 Structure du Projet

```
residual-labs-site/
├── index.html              # Page d'accueil
├── pages/
│   ├── services.html       # Détail des services (6 services complets)
│   ├── portfolio.html      # Cas d'usage et réalisations
│   ├── blog.html           # Blog avec 5 articles SEO
│   ├── faq.html            # FAQ complète (30+ questions)
│   ├── pricing.html        # Tarifs détaillés et comparaison
│   └── process.html        # Notre processus en 6 étapes
├── assets/
│   ├── css/
│   │   ├── global.css      # Styles globaux et variables CSS
│   │   ├── header.css      # Navigation et header
│   │   ├── hero.css        # Hero, sections, footer
│   │   ├── modal.css       # Formulaire de contact modal
│   │   └── components.css  # Cartes, grilles, composants
│   ├── js/
│   │   ├── global.js       # Logique globale (modal, formulaire Telegram, animations)
│   │   └── analytics.js    # Tracking en temps réel sur Telegram
│   └── images/             # Images (à ajouter)
├── sitemap.xml             # Sitemap pour SEO
├── robots.txt              # Directives pour les crawlers
└── README.md               # Ce fichier
```

## 🎨 Design & Branding

- **Thème** : Dark mode premium avec accents violets
- **Typographie** : Inter (sans-serif) + JetBrains Mono (monospace)
- **Couleurs principales** :
  - Accent primaire : `#7c3aed` (violet)
  - Accent secondaire : `#a855f7` (violet clair)
  - Texte : `#f1f0ff` (blanc cassé)
  - Fond : `#0a0a0f` (noir profond)

## 🚀 Fonctionnalités

### Page d'Accueil
- Hero section percutante avec CTA principal
- Preuve sociale (ticker défilant avec résultats chiffrés)
- Aperçu des 6 services principaux
- Section CTA finale
- Footer complet avec navigation

### Page Services
- Détail complet de chaque service :
  1. Agents Autonomes
  2. Scraping & Data Extraction
  3. Bots & Automatisation
  4. Backends & APIs
  5. Applications & Sites
  6. Architectures Multi-Agents
- Descriptions détaillées, technologies utilisées, fourchette de prix

### Page Portfolio
- 4 cas d'usage concrets avec résultats mesurables
- Cartes interactives avec icônes et métriques
- CTA pour démarrer une démo

### Page Blog (NOUVEAU)
- 5 articles SEO complets et optimisés
- Articles sur : agents IA, scraping avancé, backends fintech, bots trading, architectures multi-agents
- Métadonnées optimisées pour Google
- Liens internes vers les services

### Page FAQ (NOUVEAU)
- 30+ questions/réponses complètes
- Catégories : Services, Tarifs, Processus, Technique, Légal
- Design interactif avec accordéons
- Réponses détaillées et professionnelles

### Page Pricing (NOUVEAU)
- 5 niveaux tarifaires : Démo, Simple, Moyen, Complexe, Entreprise
- Grille de comparaison détaillée
- Plan de paiement flexible
- Transparence totale sur les coûts

### Page Process (NOUVEAU)
- 6 étapes du processus de travail
- Timeline détaillée semaine par semaine
- Communication asynchrone
- Engagements clairs

### Formulaire de Contact
- Modal moderne et responsive
- Intégration Telegram directe
- Champs : nom, email, téléphone, description du projet
- Feedback utilisateur (succès/erreur)

### Navigation
- Header fixe avec logo, badge "1 slot disponible", liens de navigation
- Bouton LinkedIn intégré
- Responsive design (masquage des liens sur mobile)

### Analytics & Tracking
- Tracking en temps réel sur Telegram
- Localisation, appareil, source de trafic
- Durée de session et pages visitées
- Notifications instantanées

## 🔧 Installation & Déploiement

### Localement
```bash
# Cloner ou télécharger le projet
cd residual-labs-site

# Serveur local (Python)
python3 -m http.server 8000

# Ou avec Node.js
npx http-server
```

Puis ouvrir `http://localhost:8000` dans le navigateur.

### Options d'Hébergement Gratuit

#### 1. **GitHub Pages** (Recommandé)
```bash
# Initialiser un repo git
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/residual-labs-site.git
git push -u origin main
```
Puis activer GitHub Pages dans les paramètres du repo (branche `main`).
**URL** : `https://YOUR_USERNAME.github.io/residual-labs-site`

#### 2. **Netlify**
- Connecter le repo GitHub
- Déploiement automatique à chaque push
- Domaine gratuit : `your-site.netlify.app`

#### 3. **Vercel**
- Importer le projet depuis GitHub
- Déploiement automatique
- Domaine gratuit : `your-site.vercel.app`

#### 4. **Cloudflare Pages**
- Connecter le repo GitHub
- Déploiement automatique
- Domaine gratuit : `your-site.pages.dev`

#### 5. **Surge.sh**
```bash
npm install -g surge
surge
```

## 📧 Configuration Telegram

Le formulaire de contact et les analytics envoient les messages directement sur Telegram.

**Credentials utilisées** :
- Bot Token : `8523706065:AAGAC3mealnTsQpF4lDyK5AsznmHRhbjZMo`
- Chat ID : `6255000093`

Pour modifier :
1. Ouvrir `assets/js/global.js` (formulaire)
2. Ouvrir `assets/js/analytics.js` (tracking)
3. Chercher `TELEGRAM_BOT_TOKEN` et `TELEGRAM_CHAT_ID`
4. Remplacer par vos propres valeurs

## 🔍 SEO & Optimisation

### Sitemap XML
- Fichier `sitemap.xml` pour aider Google à indexer toutes les pages
- Priorités définies pour chaque page
- Fréquence de mise à jour spécifiée

### Robots.txt
- Fichier `robots.txt` pour diriger les crawlers
- Règles spécifiques pour Googlebot et Bingbot
- Référence au sitemap

### Optimisations On-Page
- Meta descriptions uniques pour chaque page
- Titres optimisés (50-60 caractères)
- Structure H1-H2-H3 hiérarchique
- Liens internes entre pages
- Mots-clés naturellement intégrés

### Performance
- CSS modulaire et optimisé
- JavaScript minimaliste (pas de frameworks)
- Animations GPU-accelerated
- Lazy loading prêt pour les images
- Temps de chargement < 3 secondes

## 📊 Améliorations Complétées

- ✅ Remplir la page Blog avec 5 articles SEO
- ✅ Compléter la page FAQ avec 30+ questions
- ✅ Ajouter une page Tarifs détaillée
- ✅ Documenter le processus complet en 6 étapes
- ✅ Créer sitemap.xml pour SEO
- ✅ Créer robots.txt pour les crawlers
- ✅ Optimiser les meta tags et descriptions
- ✅ Améliorer le système d'analytics

## 🎯 Prochaines Étapes

- [ ] Ajouter des images/illustrations pour les articles
- [ ] Créer des articles détaillés (2000+ mots chacun)
- [ ] Intégrer Google Analytics
- [ ] Ajouter un système de newsletter
- [ ] Créer des landing pages spécifiques
- [ ] Mettre en place des tests A/B
- [ ] Ajouter des témoignages clients
- [ ] Créer une API pour les tarifs dynamiques

## 📱 Responsive Design

Le site est entièrement responsive :
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ⚡ Performance

- CSS modulaire et optimisé
- JavaScript minimaliste (pas de frameworks)
- Animations GPU-accelerated
- Lazy loading prêt pour les images
- Pas de dépendances externes (sauf Google Fonts)

## 📄 Licence

© 2024 Residual Labs. Tous droits réservés.

## 🤝 Support

Pour toute question ou modification, contactez : contact@residuallabs.io

---

**Version** : 2.0 (Février 2024)
**Dernière mise à jour** : 24 février 2024
