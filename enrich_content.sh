#!/bin/bash

# Enrichissement de la page Blog
cat > pages/blog.html << 'BLOG_EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog & Insights - Residual Labs</title>
  <link rel="stylesheet" href="../assets/css/global.css?v=2.1" />
</head>
<body>
  <header class="header">
    <nav class="navbar">
      <a href="../index.html" class="nav-logo">RESIDUAL<span>.</span>LABS</a>
      <div class="nav-ctas">
        <a href="services.html" class="nav-link">Services</a>
        <a href="portfolio.html" class="nav-link">Portfolio</a>
        <a href="blog.html" class="nav-link">Blog</a>
        <button onclick="openModal()" class="nav-cta">Démarrer →</button>
      </div>
    </nav>
  </header>

  <section class="section-pad" style="margin-top: 80px;">
    <div class="container">
      <div class="section-label">// Blog & Insights</div>
      <h1 class="section-title">Veille technologique et automatisation.</h1>
      
      <div class="grid grid-2 mt-4">
        <article class="card fade-up">
          <div class="badge">IA & Agents</div>
          <h3>L'essor des agents autonomes en 2026</h3>
          <p>Comment les architectures multi-agents transforment la productivité des entreprises tech.</p>
          <a href="#" class="btn-secondary">Lire l'article →</a>
        </article>
        <article class="card fade-up">
          <div class="badge">Scraping</div>
          <h3>Contourner Cloudflare en 2026</h3>
          <p>Les nouvelles techniques de reverse engineering pour l'extraction de données complexe.</p>
          <a href="#" class="btn-secondary">Lire l'article →</a>
        </article>
        <article class="card fade-up">
          <div class="badge">Fintech</div>
          <h3>Backends haute performance</h3>
          <p>Architecture d'un système capable de gérer 50 000 transactions par seconde.</p>
          <a href="#" class="btn-secondary">Lire l'article →</a>
        </article>
        <article class="card fade-up">
          <div class="badge">Automation</div>
          <h3>Le futur de la prospection LinkedIn</h3>
          <p>Pourquoi l'automatisation discrète et intelligente surpasse le spam traditionnel.</p>
          <a href="#" class="btn-secondary">Lire l'article →</a>
        </article>
      </div>
    </div>
  </section>

  <script src="../assets/js/global.js?v=2.1"></script>
  <script src="../assets/js/analytics.js?v=2.1"></script>
</body>
</html>
BLOG_EOF

# Enrichissement de la page FAQ
cat > pages/faq.html << 'FAQ_EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FAQ - Residual Labs</title>
  <link rel="stylesheet" href="../assets/css/global.css?v=2.1" />
</head>
<body>
  <header class="header">
    <nav class="navbar">
      <a href="../index.html" class="nav-logo">RESIDUAL<span>.</span>LABS</a>
      <div class="nav-ctas">
        <a href="services.html" class="nav-link">Services</a>
        <a href="faq.html" class="nav-link">FAQ</a>
        <button onclick="openModal()" class="nav-cta">Démarrer →</button>
      </div>
    </nav>
  </header>

  <section class="section-pad" style="margin-top: 80px;">
    <div class="container">
      <div class="section-label">// FAQ</div>
      <h1 class="section-title">Questions fréquentes.</h1>
      
      <div class="faq-list mt-4">
        <div class="card mb-2">
          <h3>Comment fonctionne le paiement ?</h3>
          <p>Nous travaillons au prix fixe. Un acompte de 500€ est requis pour la démo technique, puis le reste est divisé en jalons de livraison.</p>
        </div>
        <div class="card mb-2">
          <h3>Quels sont vos délais ?</h3>
          <p>La plupart des projets sont livrés entre 2 et 6 semaines, selon la complexité technique.</p>
        </div>
        <div class="card mb-2">
          <h3>Le code m'appartient-il ?</h3>
          <p>Oui, 100% du code source vous est livré avec une licence complète d'utilisation et de modification.</p>
        </div>
        <div class="card mb-2">
          <h3>Pouvez-vous contourner n'importe quelle protection ?</h3>
          <p>Nous avons une expertise poussée en reverse engineering. Jusqu'à présent, aucun système n'a résisté à nos agents de scraping.</p>
        </div>
      </div>
    </div>
  </section>

  <script src="../assets/js/global.js?v=2.1"></script>
  <script src="../assets/js/analytics.js?v=2.1"></script>
</body>
</html>
FAQ_EOF

echo "Contenu enrichi avec succès !"
