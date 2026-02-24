/**
 * Configuration Telegram
 * Les clés API sont maintenant gérées côté serveur via une fonction serverless
 * Cette approche sécurise vos credentials et respecte les bonnes pratiques
 */

// Modal functions
function openModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    const form = document.getElementById('contactForm');
    if (form) form.reset();
    const status = document.getElementById('formStatus');
    if (status) status.classList.remove('success', 'error');
  }
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'contactModal') closeModal();
    });
  }
});

// Form submission
async function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const project = document.getElementById('project').value;

  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.querySelector('.form-submit');

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    // Format message for Telegram
    const telegramMessage = `
📨 *Nouvelle demande de démo*

*Nom:* ${name}
*Email:* ${email}
${phone ? `*Téléphone:* ${phone}` : ''}

*Projet:*
${project}

---
Répondre à: ${email}
    `;

    // Appeler la fonction serverless au lieu de contacter directement l'API Telegram
    // Cela protège vos clés API sensibles
    const telegramResponse = await fetch('/.netlify/functions/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: telegramMessage,
        type: 'contact'
      })
    });

    if (!telegramResponse.ok) {
      const error = await telegramResponse.json();
      throw new Error(error.error || 'Erreur lors de l\'envoi');
    }

    // Success
    statusDiv.textContent = '✓ Demande envoyée ! Nous vous répondons sous 24h.';
    statusDiv.classList.add('success');
    statusDiv.classList.remove('error');

    setTimeout(() => {
      closeModal();
    }, 2000);

  } catch (error) {
    console.error('Erreur:', error);
    statusDiv.textContent = '✗ Erreur lors de l\'envoi. Veuillez réessayer.';
    statusDiv.classList.add('error');
    statusDiv.classList.remove('success');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer ma demande →';
  }
}

// FAQ toggle
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Stagger children in grids
  document.querySelectorAll('.services-grid, .pricing-grid, .cases-grid, .process-steps, .faq-list').forEach(grid => {
    grid.querySelectorAll('.fade-up').forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });
});
