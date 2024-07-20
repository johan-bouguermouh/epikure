import axiosService from "./database/axios.service";
import CommandBody from "./interfaces/command-body.interface";

console.log("\x1b[35m", "Insertion des commandes", "\x1b[0m");

const maxAttempts = 100;

axiosService
  .get("farmer")
  .catch((error) => {
    console.error("Error details:", error.response.data);
    process.exit(1);
  })
  .then((response) => {
    const farmers = response.data;
    const dateNow = new Date();
    const numberMounthNow = dateNow.getMonth() + 1;
    const farmerInfos = farmers.map((farmer: any) => {
      const farmerId = farmer.id;
      const productMoments = farmer.products.filter(
        (product: any) =>
          product.harvestStartMounth <= numberMounthNow &&
          product.harvestEndMounth >= numberMounthNow
      );

      const productIds: number[] = productMoments.map(
        (product: any) => product.id
      );

      const placeIds: number[] =
        farmer.places.length > 0
          ? farmer.places.map((place: any) => place.id)
          : [];

      return { farmerId, productIds, placeIds };
    });

    if (farmerInfos.length === 0) {
      //Message en rouge
      console.error(
        "\x1b[31m",
        "Aucun producteur n'a été trouvé, veuillez lancer la commande de création de farmers",
        "\x1b[0m"
      );
      process.exit(1);
    }

    //on créer les commandesBody pour chaque producteur
    const commandBody: CommandBody[] = [];

    farmerInfos.map((farmerInfo: any) => {
      const farmerId = farmerInfo.farmerId;
      const productIds = farmerInfo.productIds;
      const placeIds = farmerInfo.placeIds;

      // Si le farmerInfo n'a pas de produits ou de places on ne crée pas de commandes
      if (productIds.length === 0 || placeIds.length === 0) {
        return;
      }

      // On rendomise le nombre de commands qu'on va faire entre 7 a 20 commandes par farmers
      let numberOfCommands = Math.floor(Math.random() * 20);
      numberOfCommands =
        numberOfCommands < 7 ? numberOfCommands + 7 : numberOfCommands;

      for (let i = 0; i < numberOfCommands; i++) {
        //on s'assure que la date est en heure GMT de Paris
        const dateCommand = new Date();

        // on s'assure que la date de la commande est bien superieur a date now en lui ajoutant 3 heures
        dateCommand.setHours(dateCommand.getHours() + 3);

        // On rendomise le nombre de produits à commander entre 5 et 10
        let numberOfProducts = Math.floor(Math.random() * 20);
        numberOfProducts =
          numberOfProducts < 10 ? numberOfProducts + 10 : numberOfProducts;

        const productIdsCommand: number[] = [];
        let failedProductIds: boolean = false;

        for (let i = 0; i < numberOfProducts; i++) {
          let randomIndex = Math.floor(Math.random() * productIds.length);
          // On s'assure avant l'insertion qu'il n'y a pas de doublons de produits
          let attempts = 0;
          while (productIdsCommand.includes(productIds[randomIndex])) {
            randomIndex = Math.floor(Math.random() * productIds.length);
            attempts++;

            if (attempts >= maxAttempts) {
              failedProductIds = true;
              break;
            }
          }
          if (failedProductIds) {
            break;
          }

          productIdsCommand.push(productIds[randomIndex]);
        }

        // On rendomise le nombre de places à commander entre 1 et et le nombre de places du farmer
        let numberOfPlaces = Math.floor(Math.random() * placeIds.length);
        numberOfPlaces =
          numberOfPlaces < 1 ? numberOfPlaces + 1 : numberOfPlaces;

        const placeIdsCommand: number[] = [];
        for (let i = 0; i < numberOfPlaces; i++) {
          let randomIndex = Math.floor(Math.random() * placeIds.length);
          randomIndex = randomIndex < 0 ? 1 : randomIndex;
          let failedPlaceIds: boolean = false;
          // On s'assure avant l'insertion qu'il n'y a pas de doublons de places
          let attempts = 0;
          while (placeIdsCommand.includes(placeIds[randomIndex])) {
            randomIndex = Math.floor(Math.random() * placeIds.length);
            randomIndex = randomIndex < 0 ? 1 : randomIndex;
            attempts++;
            if (attempts >= maxAttempts) {
              failedPlaceIds = true;
              break;
            }
          }
          if (failedPlaceIds) {
            break;
          }
          placeIdsCommand.push(placeIds[randomIndex]);
        }

        if (placeIdsCommand.length === 0) {
          return;
        }

        if (productIdsCommand.length === 0) {
          return;
        }

        commandBody.push({
          farmerId,
          productIds: productIdsCommand,
          placeIds: placeIdsCommand,
          startedDate: dateCommand.toISOString(),
        });
      }
    });

    if (commandBody.length === 0) {
      //Message en rouge
      console.error(
        "\x1b[31m",
        "Aucune commande n'a été créée, veuillez vérifier les données des producteurs",
        "\x1b[0m"
      );
      process.exit(1);
    } else {
      console.log(
        `Création de`,
        "\x1b[32m",
        `${commandBody.length}`,
        "\x1b[0m",
        `commandes`
      );
    }

    for (const command of commandBody) {
      axiosService
        .post("command", command)
        .then((response) => {
          console.log(
            `La commande du producteur`,
            "\x1b[32m",
            ` ${command.farmerId}`,
            "\x1b[0m",
            `, a bien été créée`
          );
        })
        .catch((error) => {
          console.log("command", command);
          console.error(
            "Error details sur la command:",
            command,
            error.response.data
          );
        });
    }
  });
