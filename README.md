# Nightclass : Angular-cypress

#### Cypress playground

### Abstract

Le projet est un site d'ecommerce.
C'est un projet Angular dans lequel les outils pour faire du 2e2 ont été supprimés.

Vous allez devoir installer, configurer et écrire des tests e2e avec un framework JS : Cypress


 > Il est important de noter que la plupart des tests qui vont vous être demander d'écrire dans l'atelier pourraient et même <u>devraient</u> être écrit en tant que <u>tests unitaires</u> mais le but ici est de manipuler **Cypress** :sunglasses: 
 
 
### Pré - requis

 - Une version de Npm à jour (> 6.10)
 - git 
 
### Configuration du projet

Pour démarrer, il va falloir installer Cypress sur le projet :

`npm i cypress --save-dev` ou `yarn add cypress --dev` *(nous continuerons avec npm pour la suite)*

Voila c'est fait !

Pour tester que tout se passe correctement, lancez :

 * le front -> `npm run start` (l'application tourne sous le port 4209)
 * le serveur -> `npm run start-server`  (le back tourne sous le port 8080)
 
 Ou `npm run start-all` pour lancer les deux.
 
 Puis vous pouvez lancer : `npm run cy:open`

Cypress va lancer son *Test Runner*  et vous créer un répertoire contenant des examples. 
Vous pouvez manipuler l'interface pour découvrir le produit.

### 1 - Créér son premier test Cypress

Placez vous dans le répertoire à la racine du projet "cypress/integration", créér un fichier "product.spec.js"
Le fichier sera automatiquement découvert par Cypress (vous pouvez le voir dans l'interface apparaitre). 

Voici un template de départ.
```
describe('Actions on product page', () => {
    describe('Products list', () => {
        it('should have an empty basket', ()=> {
            // code
        })
    })
})

```

Vous devez naviguer vers la page d'accueil de l'application et vérifié la valeur de l'élement contenant le total du panier.

### 2 - Liste de produits

 Pour compléter le premier test sur les produits, nous allons écrire 2 autres tests :
 
  * Vérifiez que les titres des produits sont bien présentés dans l'ordre alphabétique lors de l'affichage.
  * Vérifiez que la liste propose 4 produits et qu'ils ne s'affichent pas en tant que dernier examplaire du stock (voir css).
  
### 3 - Ajouter un produit au panier

Avant de continuer, vous avez probablement vu un peu de 'redondance' apparaitre lors de l'écriture des tests (appel systématique à la page d'accueil).
Si ce n'est déjà fait, créez un *hook* il vous sera utile pour la suite et déplacer la/les commande(s) de navigation récurrente.

```
beforeEach(() => {
})
```

> *FACULTATIF*  -> Vous pouvez ajouter des variables de configuration dans le fichier *cypress.json* à la racine du projet. 

> Ajoutez : `  
"baseUrl": "http://localhost:4209"
` 

> Maintenant, le *contextPath* de votre application est '/'

Créer un nouveau test décrivant l'ajout d'un produit au panier :

```
describe('Adding a product to basket', () => {
...
})
```

Vous allez certainement avoir des problèmes pour lancer un test ou plusieurs et garder une intégrité entre les différents appels serveur et l'IHM.
Une API est disponible pour resetter les produits et le panier :
`{serverUrl}/rest/reset'`

Utiliser *cy.request* avant chaque test pour partir sur une 'base clean'.

Ensuite écrire les tests pour :

 * Vérifier la bonne mise à jour du total lorsqu'on ajoute un produit.
 * Vérifier que lorsque que le stock d'un produit est bien le dernier affiché, il soit bien présenté d'une manière différente.
 * Vérifier si un produit n'est plus en stock, il ne soit pas présenté.
 * Un peu plus compliqué, vérifier que la quantité de produit ajouté dans le panier soit bien visible dans la page lié au panier (une quantité == 1 ligne affichée).

Il est possible de donner créer des commandes sous Cypress, en gros des fontions que Cypress pourra interpréter au sein d'un wrapper.

Essayer de créer une commande *cy.resetServer()* utilisable dans votre fichier *.spec.js.

Vous trouverez des examples dans le fichier *support/command.js*.

> *FACULTATIF* -> Enfin, il est peut être temps de refactorer vos tests, si vous avez dù créér et dupliquer une routine pour ajouter un produit au panier, 
crééz une fonction `addProduct(productName)` et utilisez la.

### 4 - Remplir un formulaire

...

### 5 - Valider la commmande

... 
