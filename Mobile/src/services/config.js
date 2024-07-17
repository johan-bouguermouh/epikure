import axios from 'axios';
import Config from 'react-native-config';


const instance = axios.create({
  baseURL: Config.API_BASE_URL, // URL de base de l'API
  timeout: parseInt(Config.TIMEOUT), // Temps d'attente maximal en millisecondes
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export default instance;