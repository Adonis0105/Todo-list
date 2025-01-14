const champTache = document.getElementById("champTache");
const boutonAjouterTache = document.getElementById("boutonAjouterTache");
const listeTaches = document.getElementById("listeTaches");
const messageErreur = document.getElementById("messageErreur");

const boutonAfficherToutes = document.getElementById("afficherToutes");
const boutonAfficherTerminees = document.getElementById("afficherTerminees");
const boutonAfficherEnAttente = document.getElementById("afficherEnAttente");

let taches = JSON.parse(localStorage.getItem("taches")) || [];
let tachesSupprimees =
  JSON.parse(localStorage.getItem("tachesSupprimees")) || [];

function sauvegarderTaches() {
  localStorage.setItem("taches", JSON.stringify(taches));
}

function sauvegarderTachesSupprimees() {
  localStorage.setItem("tachesSupprimees", JSON.stringify(tachesSupprimees));
}

function afficherTaches(filtre = "toutes") {
  listeTaches.innerHTML = "";

  if (filtre === "terminees") {
    const toutesLesTaches = [
      ...taches.filter((tache) => tache.terminee),
      ...tachesSupprimees,
    ];
    toutesLesTaches.forEach((tache, index) => {
      const elementTache = document.createElement("li");
      elementTache.className = "tache terminee";
      elementTache.innerHTML = `<span>${tache.texte}</span>`;
      listeTaches.appendChild(elementTache);
    });
    return;
  }

  taches
    .filter((tache) => {
      if (filtre === "enAttente") return !tache.terminee;
      return true;
    })
    .forEach((tache, index) => {
      const elementTache = document.createElement("li");
      elementTache.className = `tache ${tache.terminee ? "terminee" : ""}`;
      elementTache.innerHTML = `
                        <span>${tache.texte}</span>
                        <button onclick="supprimerTache(${index})">Supprimer</button>
                    `;
      elementTache
        .querySelector("span")
        .addEventListener("click", () => basculerEtatTache(index));
      listeTaches.appendChild(elementTache);
    });
}

function ajouterTache() {
  const texteTache = champTache.value.trim();
  if (!texteTache) {
    messageErreur.style.display = "block";
    return;
  }
  messageErreur.style.display = "none";
  taches.push({ texte: texteTache, terminee: false });
  sauvegarderTaches();
  afficherTaches();
  champTache.value = "";
}

function supprimerTache(index) {
  const tacheSupprimee = taches.splice(index, 1)[0];
  tachesSupprimees.push(tacheSupprimee);
  sauvegarderTaches();
  sauvegarderTachesSupprimees();
  afficherTaches();
}

function basculerEtatTache(index) {
  taches[index].terminee = !taches[index].terminee;
  sauvegarderTaches();
  afficherTaches();
}

boutonAjouterTache.addEventListener("click", ajouterTache);

boutonAfficherToutes.addEventListener("click", () => afficherTaches("toutes"));
boutonAfficherTerminees.addEventListener("click", () =>
  afficherTaches("terminees"),
);
boutonAfficherEnAttente.addEventListener("click", () =>
  afficherTaches("enAttente"),
);

// Afficher les tâches au chargement de la page
afficherTaches();
