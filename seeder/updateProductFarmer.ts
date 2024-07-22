import axiosService from "./database/axios.service";

interface UpdateProductFarmerBody {
  farmerId: number;
  productIds: number[];
}

axiosService
  .get("farmer")
  .catch((error) => {
    console.error("Error details:", error.response.data);
    process.exit(1);
  })
  .then((response) => {
    const farmers = response.data;
    const farmerIds = farmers.map((farmer: any) => farmer.id);

    if (farmerIds.length === 0) {
      //Message en rouge
      console.error(
        "\x1b[31m",
        "Aucun producteur n'a été trouvé, veuillez lancer la commande de création de farmers",
        "\x1b[0m"
      );
      process.exit(1);
    }
    axiosService
      .get("product")
      .catch((error) => {
        console.error("Error details:", error.response.data);
        process.exit(1);
      })
      .then((response) => {
        const products = response.data;
        const productIds = products.map((product: any) => product.id);
        if (productIds.length === 0) {
          //Message en rouge
          console.error(
            "\x1b[31m",
            "Aucun produit n'a été trouvé, veuillez lancer la commande de création de produits",
            "\x1b[0m"
          );
          process.exit(1);
        }

        const productsFarmerBody: UpdateProductFarmerBody[] = farmerIds.map(
          (farmerId: number) => {
            // On randomise le nombre de produits à ajouter entre 10 et productIds.length
            let numberOfProducts = Math.floor(
              Math.random() * productIds.length
            );
            numberOfProducts =
              numberOfProducts < 10 ? numberOfProducts + 10 : numberOfProducts;
            // On randomise les produits à ajouter
            let newProducts: number[] = [];
            for (let i = 0; i < numberOfProducts; i++) {
              let randomIndex = Math.floor(Math.random() * productIds.length);
              // On s'assure avant l'insertion qu'il n'y a pas de doublons de produits
              while (newProducts.includes(productIds[randomIndex])) {
                randomIndex = Math.floor(Math.random() * productIds.length);
              }

              newProducts.push(productIds[randomIndex]);
            }

            return {
              farmerId: farmerId,
              productIds: newProducts,
            };
          }
        );

        for (const productFarmerBody of productsFarmerBody) {
          axiosService
            .put("farmer/products", productFarmerBody)
            .then((response) => {
              console.log(
                `Les produits du producteur`,
                "\x1b[32m",
                ` ${productFarmerBody.farmerId}`,
                "\x1b[0m",
                `, ont bien été mis à jour`
              );
            })
            .catch((error) => {
              console.log("Détail du produit :", productFarmerBody);
              console.error("\x1b[31m", "Error details:", error.response.data);
              process.exit(1);
            });
        }
      });
  });
