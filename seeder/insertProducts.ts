/** IMPORTATION SERVICE */
import fs from "fs";
import axiosService from "./database/axios.service";
import axios from "axios";
/** IMPORTATION SCRYPT */
import vegetableJSON from "./data/vegetables.json";
import categoryOfProduct from "./data/table/categoryProduct.json";
import thumbnails from "./data/table/thumbnail.json";
import harvestSeason from "./data/table/recolte.json";
import conservation from "./data/table/conservationTime.json";
import { etractNutriscore } from "./utils/extractNutriscore";
/** IMPORTANTION INTERFACE */
import Vegetable from "./interfaces/vegetable.interface";
import CategoryProduct from "./interfaces/category-product.interface";
import Thumbnail from "./interfaces/thumbnail.interface";
import Harvest from "./interfaces/harvest.interface";
import Conservation from "./interfaces/conservation.interface";
import Product from "./interfaces/product.interface";
import { promises } from "dns";

console.log("\x1b[35m", "Insertion des produits");

axiosService
  .get("product/category")
  .catch((error) => {
    console.error("Error details:", error.response.data);
    process.exit(1);
  })
  .then((response) => {
    console.log("response:", response.data);

    const { id: idFruits } = response.data.find(
      (category: any) => category.name === "Fruit"
    );
    const { id: idLegumes } = response.data.find(
      (category: any) => category.name === "Légume"
    );

    function setProduct(
      vegetable: Vegetable,
      categoryProduct: CategoryProduct,
      thumbnail: Thumbnail,
      harvest: Harvest,
      conservation: Conservation
    ): Product {
      const {
        Nom: name,
        Description_1,
        Description_2,
        Description_3,
      } = vegetable;
      const description = `${Description_1} ${Description_2} ${Description_3}`;
      const { categoryProductId } = categoryProduct;
      const { thumbnail: thumbnailUrl } = thumbnail;
      const { harvestStartMounth, harvestEndMounth } = harvest;
      const { conservationTime } = conservation;
      const nutriscore = etractNutriscore(vegetable.Tableau_Composition);

      return {
        name,
        description,
        categoryProductId,
        thumbnail: thumbnailUrl,
        harvestStartMounth,
        harvestEndMounth,
        conservationTime,
        nutriscore,
        urlBannerImage: "",
      };
    }

    async function insertProducts(product: Product): Promise<void> {
      const url = "product";
      const response = await axiosService.post(url, product).catch((error) => {
        console.error("Error details:", error.response.data);
        console.log("Détail du produit :", product);
        process.exit(1);
      });
      console.log(
        "response:",
        "\x1b[32m",
        response.data.name + "\x1b[0m" + " a bien été inséré"
      );
    }

    const products: Product[] = vegetableJSON.map((vegetable, index) => {
      const { Nom: name } = vegetable;
      const categoryProduct = categoryOfProduct.find(
        (category) => category.name === name
      );
      const thumbnail: Thumbnail | undefined = thumbnails.find(
        (thumbnail: Thumbnail) => thumbnail.name === name
      );
      const harvest: Harvest | undefined = harvestSeason.find(
        (harvest: Harvest) => harvest.name === name
      );
      const conservationDay: Conservation | undefined = conservation.find(
        (conservation: Conservation) => conservation.name === name
      );

      if (!categoryProduct || !thumbnail || !harvest || !conservationDay) {
        throw new Error(`Missing data for product ${vegetable.Nom}`);
      }

      return setProduct(
        vegetable,
        categoryProduct,
        thumbnail,
        harvest,
        conservationDay
      );
    });

    if (products.length === 0) {
      throw new Error("No products to insert");
    }

    if (idFruits !== 1 && idLegumes !== 2) {
      products.forEach((product: Product, index: number) => {
        if (product.categoryProductId === 1) {
          product.categoryProductId = idFruits;
        } else {
          product.categoryProductId = idLegumes;
        }
      });
    }

    //on fait un jolie console log avec des couleur pour dire que tout c'est bien passé
    //on met à jours les produits dans extractJs\data\entities\productData.json
    try {
      fs.writeFileSync(
        "./data/entities/productData.json",
        JSON.stringify(products)
      );
      console.log(
        "\x1b[32m%s\x1b[0m",
        "Sauvegarde des produits dans le fichier productData.json réussi",
        "\x1b[0m"
      );
      //lines vers productData.json
      console.log(
        "\x1b[32m%s\x1b[0m",
        "lien vers productData.json: ./data/entities/productData.json",
        "\x1b[0m"
      );
    } catch (error) {
      console.error("Error details:", error);
      //on affiche une erreur si il y a un problème et on arrête le programme
      throw new Error(`Error saving products: ${error}`);
    }

    for (const product of products) {
      insertProducts(product);
    }
  });
