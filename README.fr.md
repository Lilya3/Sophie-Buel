# Portfolio-architecte-sophie-bluel
![Badge](https://img.shields.io/badge/status-validé-green)

Code du projet 6 d’intégrateur web (OpenClassrooms).

## Contexte du projet

Vous travaillez comme développeur front-end pour l’agence ArchiWebos.
Votre mission : participer à la conception du site portfolio de Sophie Bluel, architecte d’intérieur.

Objectifs :
* Créer une **galerie dynamique** alimentée par une API.
* Développer une **interface d’administration sécurisée**.
* Mettre en place une **fenêtre modale** pour la gestion des projets (ajout / suppression).

Liens :

 [Cahier des charges Notion](https://openclassrooms.notion.site/da3bb5863a554b34ba1a8df90d4c99af?v=df7f8dcccd9f4917a664a559f00b7ccb&p=c10173024288498295c67b9625cf437f&pm=s)
 
 [Design Figma](https://www.figma.com/design/kfKHknHySoTibZfdolGAX6/Sophie-Bluel---Desktop?node-id=0-1)

## Architecture
Ce repo git contient les 2 briques logicielles du projet :

* **Frontend**
* **Backend**

## Pour lancer le code

### Backend

1. Ouvrir le dossier Backend.
2. Lire le fichier README.md du dossier.
3. Installer les dépendances avec :
`npm install`
4. Lancer le serveur avec :
`npm start`

L’API est accessible par défaut sur http://localhost:5678/api/

### Frontend

1. Ouvrir le dossier `Frontend`.
2. Lancer le fichier `index.html` avec le Live Server de votre IDE (ex : VSCode).

> ## **Astuce** :  
> Si vous désirez afficher le code du backend et du frontend en parallèle, ouvrez-les dans 2 instances différentes de VSCode afin d’éviter tout problème.

## Missions principales
1. Création de la **page de présentation des travaux** (à partir du HTML fourni).
2. Développement de la **page de connexion administrateur** (from scratch).
3. Implémentation de la **modale d’upload et de gestion des médias** (from scratch).

## Étapes de développement
### Étape 0 : Installation de l’environnement de développement
* Cloner le repo.
* Installer les dépendances backend.
* Vérifier le bon fonctionnement de l’API.

### Étape 1.1 : Récupération des travaux depuis le backend
* Utiliser `fetch()` pour récupérer les projets depuis l’API.
* Injecter dynamiquement les travaux dans la galerie.

### Étape 1.2 : Filtrage des travaux
* Créer les boutons de filtre par catégorie.
* Implémenter le filtrage dynamique côté frontend.

### Étape 2.1 : Intégration du design de la page de connexion
* Créer la page `login.html`.
* Respecter le design Figma.

### Étape 2.2 : Authentification de l’utilisateur
* Envoyer les identifiants à l’API.
* Stocker le **token JWT** dans le `localStorage`.
* Rediriger l’utilisateur connecté.
* Gérer les erreurs d’authentification.

### Étape 3.1 : Ajout de la fenêtre modale – Création et gestion de son apparition/disparition
* Créer une modale pour gérer les projets.
* Gérer son ouverture et sa fermeture en JS.
* Afficher les projets existants dans la modale.

### Étape 3.2 : Suppression d’un projet
* Ajouter un bouton de suppression sur chaque projet.
* Appeler l’API `(DELETE /works/{id})`.
* Mettre à jour l’affichage dynamiquement.

### Étape 3.3 : Ajout d’un nouveau projet
* Créer le formulaire d’upload (image, titre, catégorie).
* Envoyer les données via `POST /works` avec `FormData`.

### Étape 3.4 : Mise à jour après ajout
* Mettre à jour la galerie et la modale **sans rechargement de page**.

### Étape 4 : Vérification et gestion des erreurs
* Vérifier l’ensemble des fonctionnalités : login, galerie, suppression, ajout.
* Afficher des messages d’erreurs clairs pour l’utilisateur.

## Suivi du projet (Kanban)

Un Kanban (Trello) a été utilisé pour suivre les tâches :
* **À faire** : récupération API, filtres, login, modale, upload.
* **En cours** : intégration progressive des étapes.
* **Fait** : validation des fonctionnalités une par une.

## Auteur
Projet réalisé par Lilya (@Lilya3) dans le cadre de la formation **Intégrateur Web – OpenClassrooms**. 
