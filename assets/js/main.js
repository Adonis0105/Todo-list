// Récupération des éléments HTML nécessaires
const champTache = document.getElementById("champTache"); // Champ de saisie pour ajouter une tâche
const boutonAjouterTache = document.getElementById("boutonAjouterTache"); // Bouton pour ajouter une tâche
const listeTaches = document.getElementById("listeTaches"); // Liste où les tâches seront affichées
const messageErreur = document.getElementById("messageErreur"); // Message d'erreur affiché si aucune tâche n'est saisie

// Boutons de filtrage des tâches
const boutonAfficherToutes = document.getElementById("afficherToutes"); // Bouton pour afficher toutes les tâches
const boutonAfficherTerminees = document.getElementById("afficherTerminees"); // Bouton pour afficher uniquement les tâches terminées
const boutonAfficherEnAttente = document.getElementById("afficherEnAttente"); // Bouton pour afficher uniquement les tâches en attente

// Initialisation des listes de tâches et des tâches supprimées depuis le localStorage
let taches = JSON.parse(localStorage.getItem("taches")) || []; // Liste des tâches (chargée depuis le localStorage)
let tachesSupprimees =
  JSON.parse(localStorage.getItem("tachesSupprimees")) || []; // Liste des tâches supprimées (chargée depuis le localStorage)

// Sauvegarde des tâches dans le localStorage
function sauvegarderTaches() {
  localStorage.setItem("taches", JSON.stringify(taches)); // Enregistrement des tâches actuelles
}

// Sauvegarde des tâches supprimées dans le localStorage
function sauvegarderTachesSupprimees() {
  localStorage.setItem("tachesSupprimees", JSON.stringify(tachesSupprimees)); // Enregistrement des tâches supprimées
}

// Affichage des tâches avec un filtre optionnel (toutes, terminées, ou en attente)
function afficherTaches(filtre = "toutes") {
  listeTaches.innerHTML = ""; // Réinitialisation de la liste affichée

  if (filtre === "terminees") {
    // Si le filtre est "terminées", afficher les tâches terminées et supprimées
    const toutesLesTaches = [
      ...taches.filter((tache) => tache.terminee), // Tâches terminées
      ...tachesSupprimees, // Tâches supprimées
    ];
    toutesLesTaches.forEach((tache, index) => {
      const elementTache = document.createElement("li"); // Créer un élément de liste
      elementTache.className = "tache terminee"; // Appliquer une classe spécifique
      elementTache.innerHTML = `<span>${tache.texte}</span>`; // Ajouter le texte de la tâche
      listeTaches.appendChild(elementTache); // Ajouter l'élément à la liste
    });
    return;
  }

  // Affichage des tâches selon le filtre "enAttente" ou "toutes"
  taches
    .filter((tache) => {
      if (filtre === "enAttente") return !tache.terminee; // Afficher les tâches non terminées
      return true; // Afficher toutes les tâches
    })
    .forEach((tache, index) => {
      const elementTache = document.createElement("li"); // Créer un élément de liste
      elementTache.className = `tache ${tache.terminee ? "terminee" : ""}`; // Ajouter une classe selon l'état de la tâche
      elementTache.innerHTML = `
                        <span>${tache.texte}</span>
                        <button onclick="supprimerTache(${index})">Supprimer</button>
                    `; // Contenu de l'élément avec un bouton pour supprimer la tâche
      elementTache
        .querySelector("span")
        .addEventListener("click", () => basculerEtatTache(index)); // Ajouter un événement pour basculer l'état
      listeTaches.appendChild(elementTache); // Ajouter l'élément à la liste
    });
}

// Ajouter une nouvelle tâche
function ajouterTache() {
  const texteTache = champTache.value.trim(); // Récupérer le texte de la tâche
  if (!texteTache) {
    // Si le champ est vide, afficher un message d'erreur
    messageErreur.style.display = "block";
    return;
  }
  messageErreur.style.display = "none"; // Cacher le message d'erreur si le champ est rempli
  taches.push({ texte: texteTache, terminee: false }); // Ajouter la tâche avec son état initial
  sauvegarderTaches(); // Sauvegarder les tâches dans le localStorage
  afficherTaches(); // Actualiser l'affichage des tâches
  champTache.value = ""; // Réinitialiser le champ de saisie
}

// Supprimer une tâche et l'ajouter à la liste des tâches supprimées
function supprimerTache(index) {
  const tacheSupprimee = taches.splice(index, 1)[0]; // Retirer la tâche de la liste
  tachesSupprimees.push(tacheSupprimee); // Ajouter la tâche à la liste des tâches supprimées
  sauvegarderTaches(); // Sauvegarder les tâches dans le localStorage
  sauvegarderTachesSupprimees(); // Sauvegarder les tâches supprimées
  afficherTaches(); // Actualiser l'affichage des tâches
}

// Basculer l'état d'une tâche entre terminée et en attente
function basculerEtatTache(index) {
  taches[index].terminee = !taches[index].terminee; // Inverser l'état de la tâche
  sauvegarderTaches(); // Sauvegarder les tâches dans le localStorage
  afficherTaches(); // Actualiser l'affichage des tâches
}

// Ajouter des écouteurs d'événements pour les boutons
boutonAjouterTache.addEventListener("click", ajouterTache); // Ajouter une tâche au clic du bouton

boutonAfficherToutes.addEventListener("click", () => afficherTaches("toutes")); // Afficher toutes les tâches
boutonAfficherTerminees.addEventListener("click", () =>
  afficherTaches("terminees"),
); // Afficher uniquement les tâches terminées
boutonAfficherEnAttente.addEventListener("click", () =>
  afficherTaches("enAttente"),
); // Afficher uniquement les tâches en attente

// Afficher les tâches au chargement de la page
afficherTaches();
