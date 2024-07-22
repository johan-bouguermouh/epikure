import axios from "axios";
import axiosService from "./database/axios.service";

console.log("\x1b[35m", "Insertion des roles", "\x1b[0m");

const roles = [
  { name: "SUPER" },
  { name: "ADMIN" },
  { name: "FARMER" },
  { name: "USER" },
];

axiosService
  .get("user/role")
  .catch((error) => {
    console.error("Error details:", error.response.data);
    process.exit(1);
  })
  .then((response) => {
    const rolesInDb = response.data;
    if (rolesInDb.length > 0) {
      //on fait un console error en rouge pour dire que les roles existent déjà
      throw new Error(
        "\x1b[31m" +
          "Les roles existent déjà, l'insertion ne peut pas être effectuée" +
          "\x1b[0m"
      );
    }

    async function insertProducts(role: any): Promise<void> {
      const url = "user/role";
      const response = await axiosService.post(url, role).catch((error) => {
        console.error("Error details:", error.response.data);
        console.log("Détail du produit :", role);
        process.exit(1);
      });
      console.log(
        "response:",
        "\x1b[32m",
        response.data.name,
        "\x1b[0m" + "a bien été inséré"
      );
    }

    for (const role of roles) {
      insertProducts(role);
    }
  });
