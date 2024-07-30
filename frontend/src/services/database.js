import axios from "axios";

class AxiosService {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/`,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Ajouter des interceptors pour gérer les erreurs globalement
    this.instance.interceptors.response.use(
      (response) => {
        // Traiter les réponses réussies
        return response;
      },
      (error) => {
        // Traiter les erreurs
        return this.handleResponseError(error);
      }
    );
  }

  // Méthode pour les requêtes GET
  get(url, config = {}) {
    console.log(`GET URL: ${this.endpoint}${url}`);
    return this.instance.get(`${this.endpoint}${url}`, config);
  }

  // Méthode pour les requêtes POST
  post(url, data, config = {}) {
    console.log(`GET URL: ${this.endpoint}${url}`);
    return this.instance.post(`${this.endpoint}${url}`, data, config);
  }

  // Méthode pour les requêtes PUT
  put(url, data, config = {}) {
    return this.instance.put(`${this.endpoint}${url}`, data, config);
  }

  // Méthode pour les requêtes DELETE
  delete(url, config = {}) {
    return this.instance.delete(`${this.endpoint}${url}`, config);
  }

  // Méthode pour gérer les erreurs de réponse
  handleResponseError(error, url) {
    console.group("Erreur de réponse de l'API");

    if (error.response) {
      console.error("Données de la réponse:", error.response.data);
      console.error("Statut de la réponse:", error.response.status);
      console.error("En-têtes de la réponse:", error.response.headers);
    } else if (error.request) {
      console.error(
        "Requête envoyée mais aucune réponse reçue:",
        error.request
      );

      // Ajout d'informations supplémentaires sur la requête
      if (error.config) {
        console.error("URL de la requête:", error.config.url);
        console.error("Méthode de la requête:", error.config.method);
        console.error("En-têtes de la requête:", error.config.headers);
        console.error("Données de la requête:", error.config.data);
      } else {
        console.error("Configuration de la requête: non disponible");
      }
    } else {
      console.error(
        "Erreur lors de la configuration de la requête:",
        error.message
      );

      // Vérification spécifique pour DOMException
      if (
        error instanceof DOMException &&
        error.message.includes("Failed to execute 'open' on 'XMLHttpRequest'")
      ) {
        const invalidUrl = error.config
          ? error.config.url
          : this.instance.defaults.baseURL + this.endpoint;
        console.error("URL invalide:", invalidUrl);
      }
    }

    if (error.config) {
      console.error("Configuration de la requête:", error.config);
    } else {
      console.error("Configuration de la requête: non disponible");
    }

    console.groupEnd();

    return Promise.reject(error);
  }
}

export default AxiosService;
