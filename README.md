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

Pour démarrer, clonez ce repo et lancer `npm ci` pour installer toutes les dépendances.

Pour tester que tout se passe correctement, lancez :

 * le front -> `npm run start` (l'application tourne sous le port 4209)
 * le serveur -> `npm run start-server`  (le back tourne sous le port 8080)
 
 Ou `npm run start-all` pour lancer les deux.


Il va maintenant falloir installer Cypress sur le projet : `npm i cypress --save-dev` 

Une fois que c'est fait vous pouvez lancer : `npm run cy:open` :tada:

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

Contenu de votre premier test :

- [ ] Naviguez vers la page d'accueil de l'application
- [ ] Vérifiez la valeur de l'élément contenant le total du panier.
    Attention il y a un piège : un _espace insécable_ entre le montant et la devise. Code unicode _\u00a0_

### 2 - Liste de produits

 Pour compléter le premier test sur les produits, nous allons écrire 2 autres tests :
 
- [ ] Vérifiez que les titres des produits sont bien présentés dans l'ordre alphabétique lors de l'affichage.
- [ ] Vérifiez que la liste propose 4 produits et qu'ils ne s'affichent pas en tant que dernier examplaire du stock (voir css).
  
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

Utilisez *cy.request* avant chaque test pour partir sur une 'base clean'.

Ensuite écrire les tests pour :

- [ ] Vérifier que lorsqu'on ajoute un produit, le total du panier est bien mis à jour
- [ ] Vérifier que lorsque qu'il ne reste plus qu'un exemplaire d'un produit, il soit bien présenté d'une manière différente. (Le stock initial de chaque produit est de 2)
- [ ] Vérifier qu'un produit qui n'est plus en stock, ne s'affiche pas.

Il est possible de créer des commandes sous Cypress, en gros des fonctions que vous pourrez réutiliser dans tous vos tests Cypress.

Essayez de créer une commande *cy.resetServer()* utilisable dans votre fichier *.spec.js.

Vous trouverez des examples dans le fichier *support/command.js*.

> *FACULTATIF* -> Enfin, il est peut être temps de refactorer vos tests, si vous avez dù créér et dupliquer une routine pour ajouter un produit au panier, 
crééz une fonction `addProduct(productName)` et utilisez-la.

### 4 - Remplir un formulaire

Pour le premier test : 
- [ ] Ajoutez un produit puis naviguez vers le panier. 
- [ ] Remplissez le formulaire  puis vérifiez que le bouton de validation soit clickable sans encore cliquer dessus.

Ensuite : 
- [ ] Ajoutez deux produits identiques, ajoutez un autre produit (3 en tout) puis naviguer vers le panier.
- [ ] Vérifiez que les `list-group-item` apparaissent 3 fois et que le premier ou dernier item est bien celui que vous avez  ajouté au préalable.

Il peut être sympa de créer une fonction pour remplir automatiquement le formulaire.

### 5 - Valider la commmande

Pour cette dernière partie vous allez tester le scénario complet : ajouter des produits au panier, remplir le formulaire et commander.


En s'appuyant sur le test précédent : 
- [ ] Vérifiez que lors du click sur le bouton de validation (le formulaire doit être correctement rempli), l'url appelée ensuite est bien `http://localhost:4209/confirmation'`
- [ ] Le message 'Commande confirmée' doit apparaitre dans l'application.

Pour le dernier test :
- [ ] Videz le stock d'un produit
- [ ] Naviguez vers la page de commande puis remplissez le formulaire
- [ ] Validez la commande
- [ ] Revenez sur la page d'accueil
- [ ] Vérifiez que le produit que vous avez commandé n'est plus disponible dans la page et que le total du panier est égale à 0



