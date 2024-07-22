import axiosService from "./database/axios.service";
import axios from "axios";

console.log("\x1b[35m", "Insertion des catégories de produits", "\x1b[0m");

const categoryOfProduct = [
  { name: "Fruit" },
  { name: "Légume" },
  { name: "Viande" },
  { name: "Autre" },
];

async function insertProducts(category: any): Promise<void> {
  const url = "product/category";
  const response = await axiosService.post(url, category).catch((error) => {
    console.error("Error details:", error.response.data);
    console.log("Détail du produit :", category);
    process.exit(1);
  });
  console.log(
    "response:",
    "\x1b[32m",
    response.data.name,
    "\x1b[0m" + "a bien été inséré"
  );
}

for (const category of categoryOfProduct) {
  insertProducts(category);
}
