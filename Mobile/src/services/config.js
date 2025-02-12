import axios from "axios";
import Constants from "expo-constants";

// Modification de l'import Config ne fonctionne pas sur Expo
// const { expoConfig } = Constants;
// const { API_BASE_URL, TIMEOUT } = expoConfig.extra;

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: `${baseURL}:3000`, // URL de base de l'API
  timeout: 5000, // Temps d'attente maximal en millisecondes
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
