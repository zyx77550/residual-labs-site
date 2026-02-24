# Rapport d'Analyse : Projet `residual-labs-site`

**Date :** 24 février 2026
**Analyste :** Manus AI

## 1. Résumé Exécutif

Le projet **`residual-labs-site`** est un site web statique moderne et bien structuré, servant de vitrine pour le studio "Residual Labs". Il est développé en **HTML, CSS et JavaScript pur (vanilla)**, sans dépendre de frameworks lourds, ce qui est un atout pour la performance. Le projet présente une excellente documentation, une base de code propre et des fonctionnalités intéressantes comme le suivi analytique en temps réel via Telegram.

Cependant, l'analyse a révélé une **vulnérabilité de sécurité critique** : des clés d'API (credentials) sont exposées en clair dans le code JavaScript côté client. De plus, plusieurs problèmes de navigation, de SEO technique et d'accessibilité ont été identifiés. Ce rapport détaille ces points et propose des recommandations concrètes pour améliorer la sécurité, la robustesse et la visibilité du site.

## 2. Architecture et Qualité du Code

### 2.1. Structure du Projet

Le projet est logiquement organisé en répertoires distincts pour les pages, les styles (CSS), les scripts (JS) et les ressources. La taille totale du projet est d'environ **460 Ko**, ce qui est très léger.

| Élément | Technologie | Commentaire |
|---|---|---|
| **Structure** | HTML5 | Sémantique et bien structurée. |
| **Styling** | CSS3 | Modulaire, utilise des variables (`:root`) pour une maintenance aisée. |
| **Logique Client** | JavaScript (ES6+) | Code Vanilla, minimaliste et fonctionnel. |
| **Déploiement** | GitHub Actions | Un workflow est configuré pour un déploiement sur GitHub Pages via Jekyll, bien que le projet ne soit pas un site Jekyll. |

### 2.2. Qualité du Code

- **HTML** : Le balisage est propre. Cependant, l'attribut `lang="fr"` est présent sur toutes les pages, ce qui est une bonne pratique.
- **CSS** : Le code est bien organisé et utilise des techniques modernes. Les media queries sont présentes, assurant un design responsive de base.
- **JavaScript** : Le code est direct et fonctionnel. L'utilisation de `async/await` pour les appels `fetch` est une bonne pratique. Cependant, la présence de `console.log` et de credentials en dur sont des points négatifs majeurs.

## 3. Analyse de Sécurité

La principale préoccupation est la **fuite de credentials**. 

> **Vulnérabilité Critique : Exposition de Clés d'API**
> Les fichiers `assets/js/global.js` et `assets/js/analytics.js` contiennent le **token du bot Telegram** et le **Chat ID** en clair.
> 
> ```javascript
> // Fichier : assets/js/analytics.js
> const TELEGRAM_BOT_TOKEN = '8523706065:AAGAC3mealnTsQpF4lDyK5AsznmHRhbjZMo';
> const TELEGRAM_CHAT_ID = '6255000093';
> ```
> 
> **Risque :** N'importe qui peut utiliser ces clés pour envoyer des messages via votre bot Telegram, potentiellement pour du spam, du phishing ou pour épuiser les quotas de l'API. Un acteur malveillant pourrait également récupérer l'historique du chat si les permissions du bot le permettent.

**Recommandation Prioritaire :**
1.  **Révoquer immédiatement** le token de bot exposé sur Telegram.
2.  Créer un **nouveau token**.
3.  Déplacer la logique d'envoi de messages Telegram vers une **fonction serverless** (ex: Netlify Functions, Vercel Serverless Functions, ou Cloudflare Workers). Le code JavaScript côté client appellerait cette fonction serverless sans jamais exposer la clé d'API.

## 4. SEO et Performance

Le projet a une bonne base SEO, mais plusieurs optimisations techniques sont manquantes.

| Point d'Analyse | Statut | Recommandation |
|---|---|---|
| **Sitemap** | ✅ (`sitemap.xml`) | Le fichier existe, mais il est bloqué par le `robots.txt`. |
| **Robots.txt** | ⚠️ (Problème) | La règle `Disallow: /*.xml$` empêche les moteurs de recherche de lire le `sitemap.xml`. Il faut la supprimer. |
| **Balises Meta** | ✅ (Partiel) | `title` et `description` sont bien utilisées sur la page d'accueil. À vérifier pour les autres pages. |
| **Liens Canoniques** | ❌ (Manquant) | Aucune balise `rel="canonical"` n'a été trouvée. Essentiel pour éviter le contenu dupliqué. |
| **Données Structurées** | ❌ (Manquant) | Pas de balisage `Schema.org` (ex: `application/ld+json`) pour enrichir les résultats de recherche. |
| **Favicon** | ❌ (Manquant) | Aucune icône de site n'est définie. |

## 5. Navigation et Expérience Utilisateur

L'analyse a révélé des problèmes significatifs dans la navigation qui peuvent frustrer les utilisateurs et nuire au référencement.

- **Liens Brisés :** Les chemins relatifs des liens de navigation sont incohérents. Par exemple, depuis une page dans le dossier `/pages/`, un lien vers `services.html` ne fonctionnera pas car il devrait être `../pages/services.html` ou un chemin absolu. Cela affecte toute la navigation principale entre les pages.
- **Liens Inactifs :** Sur la page de blog, les boutons "Lire l'article" pointent vers `href="#"`. Ce sont des liens morts.
- **Accessibilité :** Aucune image (`<img>`) n'a été trouvée, mais si des images sont ajoutées, elles devront impérativement avoir des attributs `alt`. De plus, aucun attribut `aria-*` n'est utilisé pour améliorer l'accessibilité pour les lecteurs d'écran.

## 6. Points Forts

- **Documentation Complète :** Les fichiers `README.md`, `DEPLOYMENT.md` et `ANALYTICS.md` sont excellents et très détaillés.
- **Légèreté et Performance :** L'absence de frameworks lourds garantit un temps de chargement rapide.
- **Code Propre :** Malgré les problèmes, la structure générale du code est claire et facile à comprendre.
- **Fonctionnalités Uniques :** Le système de tracking via Telegram est une idée créative (malgré son implémentation non sécurisée).

## 7. Recommandations Priorisées

1.  **(Critique) Sécuriser les Clés d'API :** Révocation du token Telegram et migration de la logique d'envoi vers une fonction serverless.
2.  **(Haut) Corriger la Navigation :** Uniformiser tous les chemins de liens pour qu'ils soient fonctionnels. Utiliser des chemins relatifs corrects (ex: `../index.html`) ou des chemins absolus à partir de la racine (ex: `/pages/services.html`).
3.  **(Haut) Corriger `robots.txt` :** Supprimer la ligne `Disallow: /*.xml$` pour permettre l'indexation du sitemap.
4.  **(Moyen) Améliorer le SEO Technique :**
    - Ajouter des balises `rel="canonical"` sur chaque page.
    - Implémenter un balisage `Schema.org` (au minimum `Organization` et `WebSite`).
    - Ajouter un `favicon`.
5.  **(Moyen) Améliorer l'Accessibilité :**
    - Si des images sont utilisées, ajouter des attributs `alt` descriptifs.
    - Utiliser des attributs `aria` sur les éléments interactifs (modales, accordéons) si nécessaire.
6.  **(Bas) Nettoyer le Code :** Supprimer les `console.log`, `console.warn` et `console.error` du code de production.

## 8. Conclusion

`residual-labs-site` est un projet avec un fort potentiel, une base de code saine et une excellente documentation. En adressant la faille de sécurité critique et en corrigeant les problèmes de navigation et de SEO, ce site peut devenir une vitrine professionnelle, performante et sécurisée. Les recommandations ci-dessus fournissent une feuille de route claire pour atteindre cet objectif.
