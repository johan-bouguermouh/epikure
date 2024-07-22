import axios from "axios";
import Constants from "expo-constants";

// Modification de l'import Config ne fonctionne pas sur Expo
// const { expoConfig } = Constants;
// const { API_BASE_URL, TIMEOUT } = expoConfig.extra;

const instance = axios.create({
  baseURL: "http://192.168.1.27:3000", // URL de base de l'API
  timeout: 5000, // Temps d'attente maximal en millisecondes
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
