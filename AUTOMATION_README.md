# Infrastructure d'Automatisation - Residual Labs

Ce document explique l'infrastructure d'automatisation mise en place pour votre prospection LinkedIn, votre bot Discord et votre suivi des leads.

## 🏗️ Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                    RESIDUAL LABS AUTOMATION                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│  GitHub Actions      │         │   Discord Bot        │
│  (Scheduler H24)     │         │   (Contrôle)         │
│                      │         │                      │
│ - Prospection daily  │◄────────┤ /stats               │
│ - Logging            │         │ /leads               │
│ - Notifications      │         │ /prospecter          │
└──────────────────────┘         └──────────────────────┘
         │                                │
         │                                │
         ▼                                ▼
┌──────────────────────────────────────────────────────────┐
│         LinkedIn Prospection Agent (Python)              │
│                                                          │
│ 1. Apollo.io API → Recherche de leads                   │
│ 2. Groq/Cerebras → Génération de messages IA            │
│ 3. Logs locaux → Suivi des actions                      │
│ 4. Telegram → Notifications en temps réel               │
└──────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────┐
│              Base de Données Locale                      │
│                                                          │
│ - leads_YYYYMMDD_HHMMSS.json                            │
│ - logs_YYYYMMDD_HHMMSS.json                             │
│ - linkedin_agent.log                                    │
└──────────────────────────────────────────────────────────┘
```

## 📋 Composants Principaux

### 1. Agent LinkedIn (`agents/linkedin_prospector.py`)

**Fonctionnalité :** Automatise la prospection sur LinkedIn en trouvant des leads et en générant des messages personnalisés.

**Flux de travail :**
1. **Recherche** : Utilise Apollo.io pour trouver des leads selon des critères (Founders, CTOs, etc.)
2. **Génération IA** : Utilise Groq/Cerebras pour générer un message personnalisé pour chaque lead
3. **Stockage** : Enregistre les leads et les logs dans des fichiers JSON locaux
4. **Notification** : Envoie un rapport sur Telegram

**Exemple d'exécution :**
```bash
cd agents
python linkedin_prospector.py
```

**Sortie :**
- `leads_20240225_093000.json` : Liste des leads trouvés
- `logs_20240225_093000.json` : Logs d'activité détaillés
- `linkedin_agent.log` : Fichier de log complet

### 2. Bot Discord (`agents/discord_bot.py`)

**Fonctionnalité :** Interface de contrôle et de reporting pour les agents autonomes.

**Commandes disponibles :**

| Commande | Description | Exemple |
|----------|-------------|---------|
| `/stats` | Affiche les statistiques de prospection | `/stats` |
| `/leads [limit]` | Affiche les derniers leads | `/leads 10` |
| `/prospecter [keywords]` | Lance un cycle de prospection | `/prospecter Founder AI Startup France` |
| `/help` | Affiche l'aide | `/help` |

**Installation :**
```bash
pip install discord.py
python agents/discord_bot.py
```

### 3. GitHub Actions (`.github/workflows/linkedin_prospection.yml`)

**Fonctionnalité :** Exécute automatiquement l'agent LinkedIn tous les jours à 9h00 (UTC).

**Avantages :**
- ✅ Pas besoin de laisser votre PC allumé
- ✅ Exécution automatique et programmée
- ✅ Logs et résultats sauvegardés dans le repository
- ✅ Notifications Telegram en temps réel

**Configuration :**

Pour que GitHub Actions fonctionne, vous devez ajouter les secrets suivants à votre repository :

1. Allez sur votre repository GitHub
2. Cliquez sur "Settings" → "Secrets and variables" → "Actions"
3. Ajoutez les secrets suivants :

| Secret | Valeur |
|--------|--------|
| `APOLLO_API_KEY` | Votre clé Apollo.io |
| `GROQ_API_KEY` | Votre clé Groq |
| `CEREBRAS_API_KEY` | Votre clé Cerebras |
| `TELEGRAM_BOT_TOKEN` | Votre token Telegram |
| `TELEGRAM_CHAT_ID` | Votre Chat ID Telegram |
| `GITHUB_TOKEN` | Généré automatiquement (laisser par défaut) |

## 🔄 Flux de Prospection Complet

### Jour 1 : Configuration Initiale

```
1. Vous créez une intégration Notion (optionnel)
2. Vous configurez les secrets GitHub Actions
3. Vous lancez manuellement le premier cycle
```

### Jour 2+ : Automatisation H24

```
09:00 UTC (chaque jour)
    ↓
GitHub Actions déclenche le workflow
    ↓
Agent LinkedIn recherche des leads (Apollo)
    ↓
Agent génère des messages personnalisés (Groq)
    ↓
Résultats sauvegardés localement
    ↓
Rapport envoyé sur Telegram
    ↓
Résultats poussés sur GitHub
```

## 📊 Format des Données

### Structure d'un Lead (`leads_*.json`)

```json
{
  "id": 1,
  "name": "Jean Dupont",
  "company": "Tech Solutions",
  "title": "CTO",
  "email": "jean.dupont@techsolutions.com",
  "linkedin_url": "https://linkedin.com/in/jeandupont",
  "message": "Bonjour Jean, j'ai vu que vous développiez une plateforme SaaS...",
  "status": "Nouveau",
  "source": "LinkedIn (Apollo)",
  "date_added": "2024-02-25T09:30:00",
  "last_activity": "2024-02-25T09:30:00"
}
```

### Structure d'un Log (`logs_*.json`)

```json
{
  "id": 1,
  "action": "Search Apollo",
  "status": "Succès",
  "details": "Trouvé 15 leads avec les mots-clés: Founder AI Startup France",
  "timestamp": "2024-02-25T09:30:00",
  "session_id": "20240225_093000"
}
```

## 🔐 Sécurité

### Bonnes Pratiques

1. **Ne jamais partager vos clés API en clair** - Utilisez toujours les secrets GitHub Actions
2. **Fichier `.env` local** - Utilisez uniquement pour le développement local
3. **Logs sensibles** - Les fichiers de logs contiennent des données sensibles, à protéger
4. **Rate Limiting** - L'agent respecte les limites de taux des APIs (délais aléatoires entre les actions)

### Limites de Taux

| Service | Limite | Délai Respecté |
|---------|--------|----------------|
| Apollo.io | 100 req/min | 2 secondes entre les leads |
| Groq | 30 req/min | Automatique |
| LinkedIn | 20-30 actions/jour | Respecté par l'agent |

## 🚀 Prochaines Étapes

### Phase 1 : Configuration (Aujourd'hui)
- ✅ Créer l'agent LinkedIn
- ✅ Créer le bot Discord
- ✅ Configurer GitHub Actions
- [ ] Ajouter les secrets GitHub

### Phase 2 : Intégration Notion (Demain)
- [ ] Créer une intégration Notion interne
- [ ] Connecter l'agent aux bases de données Notion
- [ ] Afficher les leads dans Notion en temps réel

### Phase 3 : Agents Supplémentaires (Semaine Prochaine)
- [ ] Agent Discord (prospection directe)
- [ ] Agent X/Twitter (veille et engagement)
- [ ] Agent Email (suivi automatique)

### Phase 4 : Analytics & Optimisation (Mois Prochain)
- [ ] Dashboard de performance
- [ ] Taux de conversion par source
- [ ] A/B testing des messages

## 📞 Support & Dépannage

### Erreur : "Apollo API Key invalid"
**Solution :** Vérifiez que votre clé Apollo est correcte et ajoutée aux secrets GitHub.

### Erreur : "Groq API rate limit exceeded"
**Solution :** L'agent respecte les limites. Attendez quelques minutes avant de relancer.

### Pas de notification Telegram
**Solution :** Vérifiez que le `TELEGRAM_BOT_TOKEN` et le `TELEGRAM_CHAT_ID` sont corrects.

### Logs vides
**Solution :** Vérifiez que l'agent s'est exécuté correctement en consultant les logs GitHub Actions.

## 📚 Ressources Utiles

- [Apollo.io API Documentation](https://docs.apollo.io/)
- [Groq API Documentation](https://console.groq.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Discord.py Documentation](https://discordpy.readthedocs.io/)

---

**Version :** 1.0
**Dernière mise à jour :** 25 février 2024
**Auteur :** Manus AI
