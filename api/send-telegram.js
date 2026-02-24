/**
 * Fonction Serverless pour envoyer des messages Telegram
 * Compatible avec : Netlify Functions, Vercel Serverless Functions, Cloudflare Workers
 * 
 * Cette fonction remplace l'appel direct à l'API Telegram depuis le client,
 * protégeant ainsi les clés d'API sensibles.
 */

// Configuration - Les clés doivent être définies dans les variables d'environnement
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Valide que les variables d'environnement sont définies
 */
function validateConfig() {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Configuration Telegram manquante. Vérifiez les variables d\'environnement.');
  }
}

/**
 * Envoie un message Telegram
 * @param {string} message - Le contenu du message
 * @param {string} parseMode - 'Markdown' ou 'HTML'
 * @returns {Promise<Object>} Réponse de l'API Telegram
 */
async function sendTelegramMessage(message, parseMode = 'Markdown') {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: parseMode
    })
  });

  if (!response.ok) {
    throw new Error(`Erreur Telegram: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Handler pour Netlify Functions
 */
exports.handler = async (event, context) => {
  // Valider la méthode HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  try {
    validateConfig();

    // Parser le corps de la requête
    const body = JSON.parse(event.body);
    const { message, type = 'contact' } = body;

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message requis' })
      };
    }

    // Envoyer le message
    const result = await sendTelegramMessage(message, 'Markdown');

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Message envoyé avec succès',
        telegramId: result.result?.message_id
      })
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Erreur interne du serveur'
      })
    };
  }
};

/**
 * Handler pour Vercel Serverless Functions
 */
module.exports = exports.handler;
