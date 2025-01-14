Liste de Tâches Interactive

Description

Ce projet est une application web simple et interactive permettant de gérer une liste de tâches. Elle offre plusieurs fonctionnalités pour ajouter, afficher, marquer comme terminées, supprimer et filtrer les tâches. L'interface est responsive, s'adaptant automatiquement aux différentes tailles d'écran (mobile, tablette, PC).

Fonctionnalités

Ajouter une tâche :

L'utilisateur peut entrer une tâche dans un champ de texte et cliquer sur "Ajouter une Tâche".

Si aucune tâche n'est saisie, un message d'erreur s'affiche.

Supprimer une tâche :

Chaque tâche a un bouton "Supprimer" pour la retirer de la liste.

Les tâches supprimées sont conservées dans une liste séparée et peuvent être consultées dans les "Tâches Terminées".

Marquer une tâche comme terminée :

Cliquer sur une tâche change son état en "terminée" (ligne barrée et grisée).

Filtrer les tâches :

Trois boutons permettent de filtrer les tâches :

Toutes les Tâches : Affiche toutes les tâches.

Tâches Terminées : Affiche les tâches terminées et supprimées.

Tâches en Attente : Affiche les tâches non terminées.

Sauvegarde locale :

Les tâches et les tâches supprimées sont sauvegardées dans le localStorage.

Les données persistent même après un rechargement de la page.

Responsive Design :

L'application s'adapte aux smartphones, tablettes et ordinateurs de bureau grâce à des media queries CSS.

Technologies utilisées

HTML5 : Structure de l'application.

CSS3 : Styles et design responsif.

JavaScript : Logique et interactivité (manipulation DOM, gestion des événements, utilisation de localStorage).

Structure du projet

project-folder/
index.html # Page principale de l'application
assets/
css/
global.css # Styles généraux
responsive.css # Styles responsifs
js/
main.js # Logique JavaScript

Installation et utilisation

Clonez le projet ou téléchargez les fichiers.

Ouvrez le fichier index.html dans un navigateur web.

Profitez des fonctionnalités interactives pour gérer vos tâches !

Instructions pour le développement

Ajout de styles :

Modifiez assets/css/global.css pour changer les styles globaux.

Ajoutez ou ajustez les media queries dans assets/css/responsive.css.

Ajout de fonctionnalités :

Mettez à jour la logique dans assets/js/main.js pour ajouter de nouvelles fonctionnalités (exemple : modification des tâches, recherche par mots-clés, etc.).

Media Queries (Responsivité)

Smartphones (max-width: 480px) :

Le champ de saisie et les boutons occupent toute la largeur de l'écran.

Les tâches s'affichent verticalement.

Tablettes (481px à 768px) :

Largeur des champs ajustée.

Espacement optimisé pour une meilleure lisibilité.

Ordinateurs (769px à 1024px et plus) :

Affichage optimisé avec des marges et paddings plus importants.

Design aéré pour une meilleure expérience utilisateur.

Démonstration

Ajoutez une tâche : Saisissez une tâche et cliquez sur le bouton.

Supprimez une tâche : Cliquez sur le bouton "Supprimer".

Marquez comme terminée : Cliquez directement sur la tâche.

Filtrez : Utilisez les boutons "Toutes", "Terminées" ou "En Attente" pour filtrer les tâches.
