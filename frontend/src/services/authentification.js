//Service d'authentification
import AxiosService from "./database";

export default class AuthService extends AxiosService {
  constructor() {
    super("auth");

    //on en profite pour mettre en place des intercepteurs on ret
  }

  /**
   * Méthode pour s'authentifier
   * @param {{email: string, password: string}} credentials
   * @returns {Promise<Object>}
   */
  async login(credentials) {
    const response = await this.post("/login", credentials);
    return response.data;
  }

  /**
   * Méthode pour s'inscrire
   * @param {{email: string, password: string, lastName: string, firstName: string}} credentials
   * @returns {Promise<Object>}
   */
  async register(credentials) {
    const response = await this.post("/register", credentials);
    return response.data;
  }
}
