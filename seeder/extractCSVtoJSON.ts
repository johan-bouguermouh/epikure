//on extrait le CSV pour récupère un object json qui se limite au champs Nom et Banner_image
import fs from "fs";
import csvToJson from "csvtojson";

csvToJson()
  .fromFile("./data/natives/heroBanner.csv")
  .then((result) => {
    const products = result.map((vegetable) => {
      const { Nom, Banner_image } = vegetable;
      return {
        Nom,
        Banner_image,
      };
    });

    if (products.length === 0) {
      throw new Error("No products to insert");
    } else {
      console.log(products);
      //un fois que c'est fait on sauvegarde le fichier dans seeder\data\table\heroBanner.json
      try {
        fs.writeFileSync(
          "./data/table/heroBanner.json",
          JSON.stringify(products)
        );
        console.log(
          "\x1b[32m%s\x1b[0m",
          "Sauvegarde des produits dans le fichier heroBanner.json réussi"
        );
      } catch (error) {
        console.error("Error writing products to file", error);
      }
    }
  });
