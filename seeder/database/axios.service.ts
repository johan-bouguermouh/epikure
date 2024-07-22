import axios from "axios";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

//creation du service axios pour les requetes
const axiosService = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosService;
