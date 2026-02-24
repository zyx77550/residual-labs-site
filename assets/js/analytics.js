// ── ANALYTICS & TRACKING SYSTEM ──
// Envoie les données de visite en temps réel sur Telegram
// Les clés API sont maintenant gérées côté serveur via une fonction serverless
// Cette approche sécurise vos credentials et respecte les bonnes pratiques

// Classe pour gérer le tracking
class AnalyticsTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.pageViews = [];
    this.referrer = document.referrer || 'direct';
    this.userAgent = navigator.userAgent;
    this.language = navigator.language;
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    this.init();
  }

  generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  init() {
    // Envoyer la première visite
    this.trackPageView(window.location.pathname);
    
    // Tracker les changements de page
    window.addEventListener('popstate', () => {
      this.trackPageView(window.location.pathname);
    });

    // Tracker les clics sur les liens internes
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.href.includes(window.location.origin)) {
        const href = new URL(link.href).pathname;
        setTimeout(() => this.trackPageView(href), 100);
      }
    });

    // Envoyer les données avant de quitter
    window.addEventListener('beforeunload', () => {
      this.sendSessionData();
    });

    // Envoyer les données toutes les 30 secondes
    setInterval(() => this.sendSessionData(), 30000);
  }

  trackPageView(page) {
    this.pageViews.push({
      page,
      timestamp: new Date().toLocaleTimeString('fr-FR')
    });
  }

  async getLocationData() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        country: data.country_name || 'Inconnu',
        city: data.city || 'Inconnu',
        ip: data.ip || 'Inconnu',
        isp: data.org || 'Inconnu'
      };
    } catch (e) {
      return { country: 'Inconnu', city: 'Inconnu', ip: 'Inconnu', isp: 'Inconnu' };
    }
  }

  getDeviceInfo() {
    const ua = this.userAgent;
    let device = 'Desktop';
    let browser = 'Inconnu';
    let os = 'Inconnu';

    if (/mobile|android|iphone|ipad|phone/i.test(ua)) {
      device = /ipad/i.test(ua) ? 'Tablet' : 'Mobile';
    }

    if (/chrome/i.test(ua)) browser = 'Chrome';
    else if (/safari/i.test(ua)) browser = 'Safari';
    else if (/firefox/i.test(ua)) browser = 'Firefox';
    else if (/edge/i.test(ua)) browser = 'Edge';

    if (/windows/i.test(ua)) os = 'Windows';
    else if (/mac/i.test(ua)) os = 'macOS';
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/iphone|ipad/i.test(ua)) os = 'iOS';

    return { device, browser, os };
  }

  getSourceInfo() {
    const ref = this.referrer.toLowerCase();
    let source = 'Direct';

    if (ref.includes('linkedin')) source = 'LinkedIn';
    else if (ref.includes('twitter') || ref.includes('x.com')) source = 'X (Twitter)';
    else if (ref.includes('discord')) source = 'Discord';
    else if (ref.includes('facebook')) source = 'Facebook';
    else if (ref.includes('instagram')) source = 'Instagram';
    else if (ref.includes('google')) source = 'Google';
    else if (ref.includes('bing')) source = 'Bing';
    else if (ref.includes('reddit')) source = 'Reddit';
    else if (ref.includes('youtube')) source = 'YouTube';
    else if (ref) source = 'Autre: ' + new URL(this.referrer).hostname;

    return source;
  }

  getDurationSeconds() {
    return Math.round((Date.now() - this.startTime) / 1000);
  }

  async sendSessionData() {
    try {
      const location = await this.getLocationData();
      const device = this.getDeviceInfo();
      const source = this.getSourceInfo();
      const duration = this.getDurationSeconds();

      const message = this.formatTelegramMessage({
        location,
        device,
        source,
        duration,
        pageViews: this.pageViews
      });

      await this.sendToTelegram(message);
    } catch (e) {
      console.error('Analytics error:', e);
    }
  }

  formatTelegramMessage(data) {
    const { location, device, source, duration, pageViews } = data;
    const lastPage = pageViews[pageViews.length - 1]?.page || '/';
    const pageCount = pageViews.length;

    return `
📊 *NOUVELLE VISITE - RESIDUAL LABS*

🌍 *Localisation*
• Pays: ${location.country}
• Ville: ${location.city}
• IP: ${location.ip}
• ISP: ${location.isp}

📱 *Appareil*
• Type: ${device.device}
• OS: ${device.os}
• Navigateur: ${device.browser}

🔗 *Source de Trafic*
• Provenance: ${source}

📄 *Activité*
• Pages visitées: ${pageCount}
• Dernière page: ${lastPage}
• Durée: ${duration}s
• Langue: ${this.language}
• Fuseau horaire: ${this.timezone}

🕐 *Heure*: ${new Date().toLocaleString('fr-FR')}
    `;
  }

  async sendToTelegram(message) {
    try {
      // Appeler la fonction serverless au lieu de contacter directement l'API Telegram
      const response = await fetch('/.netlify/functions/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          type: 'analytics'
        })
      });

      if (!response.ok) {
        console.warn('Erreur lors de l\'envoi des analytics');
      }
    } catch (e) {
      console.error('Erreur analytics:', e);
    }
  }
}

// Initialiser le tracking au chargement
document.addEventListener('DOMContentLoaded', () => {
  window.analyticsTracker = new AnalyticsTracker();
});

// Fallback si DOMContentLoaded est déjà passé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.analyticsTracker = new AnalyticsTracker();
  });
} else {
  window.analyticsTracker = new AnalyticsTracker();
}
