import AxiosService from "./database";

// On formalise le service sous forme de classe pour pouvoir l'instancier
export default class FarmerService extends AxiosService {
  constructor() {
    super("farmer");
  }

  // Méthode pour récupérer tous les agriculteurs
  async getAll() {
    const response = await this.get("");
    return response.data;
  }

  // Méthode pour récupérer un agriculteur
  async getOne(id) {
    const response = await this.get(`/${id}`);
    return response.data;
  }

  // Méthode pour ajouter un agriculteur
  async add(farmer) {
    const response = await this.post("", farmer);
    return response.data;
  }

  // Méthode pour modifier un agriculteur
  async update(id, farmer) {
    const response = await this.put(`${id}`, farmer);
    return response.data;
  }

  // Méthode pour supprimer un agriculteur
  async delete(id) {
    const response = await this.delete(`${id}`);
    return response.data;
  }
}
