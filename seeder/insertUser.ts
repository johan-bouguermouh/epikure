import axios from "axios";
import axiosService from "./database/axios.service";

console.log("\x1b[35m", "Insertion des utilisateurs", "\x1b[0m");

const users = [
  {
    email: "user1@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
  {
    email: "user2@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
  {
    email: "user3@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
  {
    email: "user4@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
  {
    email: "user5@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
  {
    email: "user6@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
  {
    email: "user7@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
  {
    email: "user8@mail.fr",
    password: "User1234!test",
    isFarmer: true,
  },
];

axiosService
  .get("user")
  .catch((error) => {
    throw new Error(error.response.data);
  })
  .then((response) => {
    const usersInDb = response.data;
    const controlExistingUsers = usersInDb.filter((user: any) => {
      const { email } = user;
      const matchUser = users.find((user: any) => user.email === email);
      if (matchUser) {
        return true;
      }
    });

    if (controlExistingUsers.length > 0) {
      //on fait un console error en rouge pour dire que les utilisateurs existent déjà
      throw new Error(
        "\x1b[31m" +
          "Les utilisateurs existent déjà, l'insertion ne peut pas être effectuée" +
          "\x1b[0m"
      );
    }

    async function insertUsers(user: any): Promise<void> {
      const url = "user";
      const result = await axiosService.post(url, user).catch((error) => {
        console.error("Error details:", error.response.data);
        console.log("Détail de l'utilisateur :", user);
        throw new Error(error.response.data);
      });

      console.log(
        "response:",
        "\x1b[32m",
        result.data.email,
        "\x1b[0m",
        " a bien été inséré"
      );
    }

    for (const user of users) {
      insertUsers(user);
    }
  });
