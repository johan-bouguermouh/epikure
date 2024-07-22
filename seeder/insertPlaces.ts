import axiosService from "./database/axios.service";
import PLace from "./interfaces/places.interface";

axiosService
  .get("farmer")
  .catch((error) => {
    throw new Error(error.response.data);
  })
  .then((response) => {
    const farmers = response.data;
    const farmerIds = farmers.map((farmer: any) => farmer.id);

    if (farmerIds.length === 0) {
      throw new Error(
        "\x1b[31m" +
          "Aucun producteur n'a été trouvé, veuillez lancer la commande de création de farmers" +
          "\x1b[0m"
      );
    }

    let idAreNotValid = [];
    // on verfie que l'es id de 1 à 8 existe bien
    for (let i = 1; i <= 8; i++) {
      if (!farmerIds.includes(i)) {
        idAreNotValid.push(i);
      }
    }

    let places: PLace[] = [
      {
        placeId: "ChIJu7CCOKHByRIR-2iYQlLWZjs",
        farmerIds: [1, 2, 4, 7],
      },
      {
        placeId: "ChIJpyC2292_yRIRUxGJYAVAvss",
        farmerIds: [4, 8, 5, 6],
      },
      {
        placeId: "ChIJiQ_SebC_yRIRDGt6BA8Q5sk",
        farmerIds: [8, 5, 6, 7],
      },
      {
        placeId: "ChIJg-lvYi6_yRIRQgqUh6HRLBw",
        farmerIds: [4, 3, 2],
      },
      {
        placeId: "ChIJF2VVV3vAyRIRRp89Ox47fgo",
        farmerIds: [1, 2, 3, 4, 5, 6],
      },
      {
        placeId: "ChIJf-s9ORO_yRIRnpJGlj6A-js",
        farmerIds: [1, 8],
      },
      {
        placeId: "ChIJMwRjJTTByRIRs-GDVFv9o0w",
        farmerIds: [1, 2, 3],
      },
      {
        placeId: "ChIJB08VMpPAyRIREJb3MQnUJfw",
        farmerIds: [5, 4, 3, 7],
      },
    ];

    if (idAreNotValid.length > 0) {
      places.forEach((place) => {
        place.farmerIds.forEach((id) => {
          if (idAreNotValid.includes(id)) {
            //on échange l'id par un id valide n'étant pas déjà dans le tableau
            const idToChange = id;
            const idToChangeIndex = place.farmerIds.indexOf(idToChange);
            let newIds = farmerIds.filter(
              (id: number) => !idAreNotValid.includes(id)
            );
            let idsHasNotegal = newIds.filter(
              (id: number) => !place.farmerIds.includes(id)
            );
            // Avant de lancer la requête on choisit parmis les id disponnible, un au hasard pour remplacer l'id invalide
            const idHasNotegal =
              idsHasNotegal[Math.floor(Math.random() * idsHasNotegal.length)];
            place.farmerIds[idToChangeIndex] = idHasNotegal as number;
          }
        });
      });
    }

    axiosService
      .get("place")
      .catch((error) => {
        throw new Error(error.response.data);
      })
      .then((response) => {
        const placesInDb = response.data;
        //on verfie qui les places existante on un id différent de ceux qu'on veut insérer
        const controlExistingPlaces = placesInDb.filter((place: any) => {
          const { placeId } = place;
          const matchPlace = places.find(
            (place: any) => place.googlePlaceId === placeId
          );
          if (matchPlace) {
            return true;
          }
        });

        if (controlExistingPlaces.length === places.length) {
          // On fait un console error en rouge pour dire que les places existent déjà
          throw new Error(
            "\x1b[31m" +
              "Les places existent déjà, l'insertion ne peut pas être effectuée" +
              "\x1b[0m"
          );
        } else if (controlExistingPlaces.length > 0) {
          // Si les résultats sont juste partiels, on efface les places existantes dans places
          places = places.filter((place) => {
            const { placeId } = place;
            return !controlExistingPlaces.some(
              (p: any) => p.placeId === placeId
            );
          });
        }

        async function insertPlaces(place: any): Promise<void> {
          const url = "place";
          const response = await axiosService
            .post(url, place)
            .catch((error) => {
              console.error("Error details:", error.response.data);
              console.log("Détail du produit :", place);
              process.exit(1);
            });
          console.log(
            "response:",
            "\x1b[32m",
            response.data.name,
            "\x1b[0m",
            " a bien été inséré"
          );
        }

        //on ralentie la mise en place des données pour éviter le banne par l'api google
        const sleep = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));

        for (const place of places) {
          insertPlaces(place);
          sleep(10000);
        }
      });
  });
