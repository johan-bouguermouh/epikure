//on fait un fihcier qui permet d'extraire les données d'un fichier csv en json
//on utilise la librairie
import csvToJson from "csvtojson";
const dataCsv = "./data/vegetable.csv";
const dataJson = "./data/vegetables.json";
import fs from "fs";

//on crée une fonction qui prend en paramètre le fichier csv et le fichier json
function extractCsvToJson(csvFilePath: string, jsonFilePath: string) {
  //on utilise la méthode fromFile pour lire le fichier csv
  csvToJson()
    .fromFile(csvFilePath)
    //on récupère les données en json
    .then((jsonObj) => {
      //on écrit les données dans le fichier json
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj), "utf-8");
    });
}

//on run la fonction
extractCsvToJson(dataCsv, dataJson);
