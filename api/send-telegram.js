// Fonction serverless sécurisée pour envoyer des messages Telegram
// Les clés API sont stockées dans les variables d'environnement de Netlify

exports.handler = async (event) => {
  // Vérifier la méthode HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, type = 'contact' } = JSON.parse(event.body);

    // Récupérer les clés depuis les variables d'environnement (Netlify)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Clés Telegram manquantes dans les variables d\'environnement');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuration manquante' })
      };
    }

    // Construire le message formaté
    let formattedMessage = message;
    if (type === 'contact' && typeof message === 'object') {
      formattedMessage = `
📧 *Nouveau Contact*
━━━━━━━━━━━━━━━━━━━
👤 *Nom:* ${message.name}
📧 *Email:* ${message.email}
📱 *Téléphone:* ${message.phone || 'Non fourni'}
💬 *Message:* ${message.project}
━━━━━━━━━━━━━━━━━━━
🕐 ${new Date().toLocaleString('fr-FR')}
      `;
    }

    // Envoyer le message via l'API Telegram
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Message envoyé avec succès',
        messageId: result.result.message_id
      })
    };

  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
