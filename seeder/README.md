# Script d'exécution séquentielle des scripts

Ce script permet d'exécuter une série de scripts de manière séquentielle. Il est utile pour automatiser des tâches répétitives ou pour s'assurer que des scripts sont exécutés dans un ordre précis.

L'utilisation de ce script vous permettra en quelques seconde de remplir la base de donnée **Epikure**.

## Fonctionnement

Le script `runScripts.ts` fonctionne en lisant une liste de scripts à partir d'un objet `scriptMap`. Si une entité spécifique est fournie, seul le script correspondant à cette entité sera exécuté. Sinon, tous les scripts de `scriptMap` seront exécutés.

### Structure du code

- **scriptsToRun** : Détermine les scripts à exécuter en fonction de l'entité fournie.
- **runScriptsSequentially** : Fonction asynchrone qui exécute les scripts séquentiellement.
- **runScript** : Fonction qui exécute un script donné.

### Lancement & installation du service

Ce rendre sur le seeder

```bash
cd seeder
```

Installer les dépendence nécessaire avant le lancement

```
npm install
```

### Usage

#### Seed l'intégralité de la base de donnée

L'ordre d'insertion en base de donnée est très importante, pour facilité son usage, il est possible de lancer le scipt sans options. Le script lancera automatiquement toute les séquences dans l'ordre.

```
npm run seed
```

#### Seed une entité en particulier

Il est aussi possible de lancer un Seed sur un entité particulière. Attention cependant sur les contraintes liées aux entités. Si certaine entités sont déjà présente alors l'execution se termeinera avec un erreur.

```
npm run seed [entity_name]
```

##### Option d'entités possible

| Option d'entité | fichier exécuter         |
| --------------- | ------------------------ |
| role            | insertRole.ts            |
| categoryProduct | insertCategoryProduct.ts |
| product         | insertProducts.ts        |
| user            | insertUser.ts            |
| farmer          | insertFarmers.ts         |
| productFarmer   | updateProductFarmer.ts   |
| place           | insertPlaces.ts          |
| command         | insertCommand.ts         |

## Ressources supplémentaires

Un dossier data est présent et certain type de données difficiles à générée son disponnible dans les données afin de pouvoir les inserrées individuellement au besoin.

## Dépendances

Le projet utilise les dépendances suivantes :

- axios
- csvtojson
- dotenv
- fs
- openai _(optional)_

## Auteur

Ce script a été développé par l'équipe _Tech Pioneers _
