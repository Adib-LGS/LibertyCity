# LibertyCity
JAVASCRIPT-OOP/APIJCDecaux/APIWebStorage/Leafleft/CSS

JavaScript-OOP/APIJCDecaux/APIWebStorage/Leafleft/CSS

Code source du Projet 3 de la formation Développeur Web Junior d'OpenClassrooms, intitulé "Concevez une carte interactive de location de vélos" Version 1.0 Le projet

Réservez votre vélo en libre service à LibertyCity ! Grâce à cette application web, baséee sur l'API JCDecaux, simulez une réservation de vélo sur la ville de LibertyCity. Cette single page application est développée en JavaScript ES6 et s'articule autour de l'architecture de la Programmation Orientée Objet. Modalités

L'application s'organise autour de plusieurs étapes :

Un diaporama interactif, qui défile toutes les 5 secondes (possibilités de l'arrêter, de le mettre en pause, de revenir en arrière, en avant, grâce aux boutons et au clavier).
Une carte interactive affichant par le biais de marqueurs l'ensemble des stations desservies.
Ces marqueurs sont représentés par un code couleur qui indique leurs disponibilités. 
Un clic sur le marqueur déclenche l'ouverture d'un encart CSS affichant l'ensemble des informations de la station choisie.
L'utilisateur peut ainsi (ou non, si la station n'a plus de vélos disponibles) réserver son vélo en renseignant ses identifiants dans un formulaire.
L'utilisateur doit ensuite apposer sa signature dans le champ libre (qui fait appel à l'API Canvas) qui s'ouvre suite à la validation du formulaire.
Grâce à l'utilisation de l'API WebStorage qui a enregistré les identifiants et les paramètres de réservation, 
Un message de confirmation, accompagné d'un décompte de 20 minutes, annonce la confirmation de la réservation. 
À la fin du décompte de 20min, la réservation s'annule.

La signature numérique est valide sur ordinateur et sur mobile.
Application web de location de vélos Environnement

HTML
CSS
JavaScript
API Canvas
API WebStorage
API JCDecaux
API Leaflet
API OpenStreetMap
