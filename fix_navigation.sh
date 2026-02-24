#!/bin/bash

# Script pour corriger les chemins de navigation dans les pages

# Pour les pages dans /pages/, les liens internes doivent utiliser des chemins relatifs corrects
# ou des chemins absolus à partir de la racine

for file in pages/*.html; do
  echo "Traitement de $file..."
  
  # Remplacer les liens de navigation pour les pages dans /pages/
  # Les liens vers les autres pages doivent rester relatifs (services.html, blog.html, etc.)
  # Les liens vers la page d'accueil doivent utiliser ../index.html
  # Les liens vers les fichiers CSS doivent utiliser ../assets/...
  # Les liens vers les scripts doivent utiliser ../assets/...
  
  # Vérifier que les chemins CSS et JS sont corrects
  sed -i 's|href="assets/css/|href="../assets/css/|g' "$file"
  sed -i 's|src="assets/js/|src="../assets/js/|g' "$file"
  
  # Les liens de navigation internes (services.html, blog.html, etc.) restent inchangés
  # car ils sont déjà relatifs et corrects
done

echo "Navigation corrigée !"
