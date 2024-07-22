import axios from "axios";
import axiosService from "./database/axios.service";

console.log("\x1b[35m", "Insertion des producteurs", "\x1b[0m");

axiosService
  .get("user")
  .catch((error) => {
    console.error("Error details:", error);
    process.exit(1);
  })
  .then((response) => {
    let farmers = [
      {
        userId: 1,
        siretNumber: "68129252700012",
        sireneNumber: "681292527",
        socialReasonName: "LES PANIERS MARSEILLAIS 1",
        address: "Adresse 1 13001 MARSEILLE",
        zipCode: "13001",
        city: "MARSEILLE",
        isBio: true,
        managerLastName: "Sauveint",
        managerFirstName: "Alain",
        publicName: "Alain Sauveint",
        avatarUrl:
          "https://www.boredpanda.com/blog/wp-content/uploads/2018/12/ai-image-generation-fake-faces-people-nvidia-5c18b20b472c2__700.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription:
          "Je suis un passionné de la terre et du travail bien fait.",
        description:
          "Depuis mon enfance, j'ai toujours été fasciné par la nature. Mon amour pour le travail bien fait m'a conduit à embrasser le métier de maraîcher. Chaque jour, je me lève avec l'envie de cultiver la terre avec respect et passion, en veillant à préserver l'équilibre fragile de notre environnement.",
        latitude: 43.31,
        longitude: 5.4,
      },
      {
        userId: 2,
        siretNumber: "32458963700013",
        sireneNumber: "324589637",
        socialReasonName: "LES PANIERS MARSEILLAIS 2",
        address: "9 Avenue Arthur Rimbaud",
        zipCode: "13470",
        city: "Carnoux-en-Provence",
        isBio: false,
        managerLastName: "Dupont",
        managerFirstName: "Marie",
        publicName: "La Famille Dupont",
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription:
          "Ma passion pour l'agriculture m'a conduit à ce métier.",
        description:
          "Cultiver la terre est plus qu'un métier pour moi, c'est une vocation. Je m'efforce chaque jour de produire des légumes de qualité, tout en respectant la nature. Voir mes cultures grandir est une source de bonheur et de fierté inégalée.",
        latitude: 43.29,
        longitude: 5.36,
      },
      {
        userId: 3,
        siretNumber: "73984621500014",
        sireneNumber: "739846215",
        socialReasonName: "LES PANIERS MARSEILLAIS 3",
        address: "20 Boulevard Bourre",
        zipCode: "13008",
        city: "MARSEILLE",
        isBio: true,
        managerLastName: "Martin",
        managerFirstName: "Luc",
        publicName: "Martin Bio",
        avatarUrl: "https://randomuser.me/api/portraits/men/29.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription:
          "J'ai trouvé ma vocation dans l'agriculture biologique.",
        description:
          "Après des années à chercher ma voie, j'ai découvert que l'agriculture biologique était ma véritable passion. Travailler en harmonie avec la nature et offrir des produits sains à mes clients est ce qui me motive au quotidien.",
        latitude: 43.24198260997684,
        longitude: 5.3739154988569515,
      },
      {
        userId: 4,
        siretNumber: "15238469700015",
        sireneNumber: "152384697",
        socialReasonName: "LES PANIERS MARSEILLAIS 4",
        address: "34 Boulevard gilly",
        zipCode: "13011",
        city: "MARSEILLE",
        isBio: false,
        managerLastName: "Bernard",
        managerFirstName: "Sophie",
        publicName: "Sophie, 33 ans",
        avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription: "Le respect de la terre est au cœur de mon travail.",
        description:
          "Chaque jour, je mets un point d'honneur à respecter la terre que je cultive. Mon objectif est de produire des aliments sains tout en préservant l'écosystème. Cette philosophie guide chacune de mes actions dans les champs.",
        latitude: 43.284061444204944,
        longitude: 5.478533354505957,
      },
      {
        userId: 5,
        siretNumber: "62819537400016",
        sireneNumber: "628195374",
        socialReasonName: "LES PANIERS MARSEILLAIS 5",
        address: "14 Boulevard Joachim elie vezien",
        zipCode: "13008",
        city: "MARSEILLE",
        isBio: true,
        managerLastName: "Thomas",
        managerFirstName: "Alain",
        publicName: "Maraîcher Bio, Alain Thomas",
        avatarUrl: "https://randomuser.me/api/portraits/men/36.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription:
          "L'agriculture est une tradition familiale que je perpétue.",
        description:
          "Je suis fier de continuer la tradition agricole de ma famille. Chaque génération a contribué à cultiver cette terre avec amour et respect. Aujourd'hui, je poursuis cet héritage en mettant en avant des pratiques durables et respectueuses de l'environnement.",
        latitude: 43.2504832,
        longitude: 5.3805056,
      },
      {
        userId: 6,
        siretNumber: "58741326900017",
        sireneNumber: "587413269",
        socialReasonName: "LES PANIERS MARSEILLAIS 6",
        address: "4 Allée des Lauriers",
        zipCode: "13190",
        city: "Allauch",
        isBio: false,
        managerLastName: "Petit",
        managerFirstName: "Nathalie",
        publicName: "Le Petit Panier de Nathalie",
        avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription: "Pour moi, l'agriculture est une manière de vivre.",
        description:
          "Depuis que j'ai choisi de devenir maraîchère, chaque jour est une nouvelle aventure. Mon travail est dicté par le respect de la nature et la recherche de la qualité. Offrir des produits frais et sains à mes clients est ma plus grande satisfaction.",
        latitude: 43.327471984805314,
        longitude: 5.49445943226881,
      },
      {
        userId: 7,
        siretNumber: "91462853700018",
        sireneNumber: "914628537",
        socialReasonName: "LES PANIERS MARSEILLAIS 7",
        address: "Bastide De Toursainte, Chemin des Bessons",
        zipCode: "13014",
        city: "MARSEILLE",
        isBio: true,
        managerLastName: "Robert",
        managerFirstName: "Jean",
        publicName: "Jean Robert, heureux et passioné",
        avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription:
          "Mon engagement pour une agriculture durable me motive chaque jour.",
        description:
          "Mon parcours m'a mené à comprendre l'importance d'une agriculture durable. Je m'investis pleinement pour cultiver des produits de qualité, tout en respectant l'environnement. Chaque récolte est une victoire et une preuve de mon engagement.",
        latitude: 43.3463201846124,
        longitude: 5.39286203964362,
      },
      {
        userId: 8,
        siretNumber: "16283947500019",
        sireneNumber: "162839475",
        socialReasonName: "LES PANIERS MARSEILLAIS 8",
        address: "17b Traverse laurent maero",
        zipCode: "13013",
        city: "MARSEILLE",
        isBio: false,
        managerLastName: "Richard",
        managerFirstName: "Julie",
        publicName: "La Famille Richard",
        avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg",
        bannerUrl:
          "https://img.freepik.com/premium-photo/portrait-senior-hardworking-farmer-generator-by-ai_911060-48332.jpg",
        shortDescription:
          "Je suis motivée par l'amour de la terre et des produits sains.",
        description:
          "L'amour de la terre m'a conduit à devenir maraîchère. Chaque jour, je cultive avec passion et dévouement, en veillant à offrir des produits sains et de qualité. Mon respect pour la nature se reflète dans chaque légume que je récolte.",
        latitude: 43.33177887722685,
        longitude: 5.417300331383199,
      },
    ];

    const listIds: number[] = response.data.map((user: any) => user.id);

    if (farmers.length > 0) {
      farmers.forEach((farmer: any, index: number) => {
        farmer.userId = listIds[index];
      });
    }

    async function insertFarmers(farmer: any): Promise<void> {
      const url = "farmer";
      const response = await axiosService.post(url, farmer).catch((error) => {
        console.error("Error details:", error.response.data);
        console.log("Détail du producteur :", farmer);
        process.exit(1);
      });
      console.log("response:", response.data.publicName + " a bien été inséré");
    }

    for (const farmer of farmers) {
      insertFarmers(farmer);
    }
  });
