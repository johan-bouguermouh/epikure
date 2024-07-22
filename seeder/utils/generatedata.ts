// A présent qu'on a le csv en json, on peut nettoyer les données. On va créer un fichier cleanData.js dans le dossier extractJs. Ce fichier va contenir une fonction qui prend en paramètre le fichier json et le fichier json nettoyé. On va supprimer les colonnes inutiles et les doublons. On va également transformer les données pour qu'elles soient plus lisibles. Voici le contenu du fichier cleanData.js:

import fs from "fs";
//importation de json en type script
import vegetableJSON from "../data/vegetables.json";
import categoryOfProduct from "../data/table/categoryProduct.json";
import thumbnails from "../data/table/thumbnail.json";
import harvestSeason from "../data/table/recolte.json";
/**
 * Exemple de l'objectif à obtenir
 * {
  "name": "tomate",
  "description": "Rond et savoureux, il fait partie des fruits et légumes d’été préférés des Français. Il se consomme aujourd’hui surtout comme un fruit, mais agrémente également des préparations salées.",
  "categoryProductId":  1,
  "harvestStartMounth": 6,
  "harvestEndMounth": 9,
  "thumbnail": "https://www.lesfruitsetlegumesfrais.com/media/lfm-media/Produits/Produit/Melon-descrip.jpg",
  "urlBannerImage": "https://www.lesfruitsetlegumesfrais.com/media/lfm-media/Produits/Produit/Melon-banniere.jpg",
  "conservationTime": 6,
  "nutriscore": [
    {
      "name": "Provitamine A Béta-carotène",
      "value": "2500 µg"
    },
    {
      "name": "Vitamine B9",
      "value": "58,90 µg"
    },
    {
      "name": "Potassium",
      "value": "380 mg"
    }
  ]
}*/

interface pushData {
  name: string;
  conservation: string;
}

console.log(vegetableJSON[0]);

//avant cela on récupère tout les nom des vegetables est on créer un fichier json avec les noms
const names: pushData[] = [];
vegetableJSON.forEach((vegetable: any) => {
  names.push({ name: vegetable.Nom, conservation: vegetable.Conservation_2 });
});
const namesJson = "../data/extraction/conservation-vegetables.json";
fs.writeFileSync(namesJson, JSON.stringify(names), "utf-8");

// const newData = [];
// vegetableJSON.forEach((vegetable) => {
//   const { Nom: name } = vegetable;
//   const descripton =
//     vegetable.Description_1 +
//     " " +
//     vegetable.Description_2 +
//     " " +
//     vegetable.Description_3;
//   const conservationToAggregate = vegetable.Conservation_2;
//   const harvestToAggregate = vegetable.Pleine_Saison;
//   const compositionToAggregate = vegetable.Tableau_Composition;
// });
