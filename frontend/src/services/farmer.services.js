import AxiosService from "./database";

// On formalise le service sous forme de classe pour pouvoir l'instancier
export default class FarmerService extends AxiosService {
  constructor() {
    super("farmer");
  }

  /**
   * Méthode pour récupérer tous les agriculteurs
   * @returns {Promise<Array>}
   */
  async getAll() {
    const response = await this.get("");
    return response.data;
  }

  /**
   * Méthode pour récupérer un agriculteur
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getOne(id) {
    const response = await this.get(`/${id}`);
    return response.data;
  }

  /**
   * Méthode pour ajouter un agriculteur
   * @param {{siretNumber: string,sireneNumber: string, socialReasonName: string, address: string, zipCode: string, city: string, isBio: boolean, managerLastName: string, managerFirstName: string, publicName: string, avatarUrl: string, bannerUrl: string, shortDescription: string, description: string, latitude: number, longitude: number}} farmer
   * @returns {Promise<Object>}
   */
  async add(farmer) {
    const response = await this.post("", farmer);
    return response.data;
  }

  /**
   * Méthode pour mettre à jour un agriculteur
   * @param {*} id
   * @param {*} farmer
   * @returns {Promise<Object>}
   */
  async update(id, farmer) {
    const response = await this.put(`${id}`, farmer);
    return response.data;
  }

  /**
   * Permet de supprimer un agriculteur
   * @param {*} id
   * @returns {Promise<Object>}
   */
  async delete(id) {
    const response = await this.delete(`${id}`);
    return response.data;
  }

  /**
   * Permets de récupérer les informations d'un agriculteur à partir de son SIRET ou SIREN
   * @param {{denomination : string ,siretorSiren : string}} siretOrSiren
   * @returns {Promise<Array>}
   */
  async getFarmerInfo(siretOrSiren) {
    const response = await this.post(`/info`, siretOrSiren);
    console.log(response);
    if (response.data[0]) {
      const firstFarmer = response.data[0];
      const {
        siren: sireneNumber,
        nom_complet: publicName,
        nom_raison_sociale: socialReasonName,
        siege: {
          adresse: address,
          code_postal: zipCode,
          libelle_commune: city,
          latitude,
          longitude,
          siret: siretNumber,
        },
        complements: { est_bio: isBio },
      } = firstFarmer;

      return {
        siretNumber,
        sireneNumber,
        socialReasonName,
        publicName,
        address,
        zipCode,
        city,
        isBio,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        managerFirstName: "",
        managerLastName: "",
        avatarUrl: "",
        bannerUrl: "",
        shortDescription: `Chez ${socialReasonName}, nous cultivons la terre avec passion et respect. Situé à ${city}, notre exploitation ${
          isBio ? "biologique" : ""
        } vous propose des produits frais et de qualité.`,
        description: `${socialReasonName} est une exploitation agricole familiale située à ${city}. Nous cultivons la terre avec passion et respect, dans le respect de l'environnement et des saisons. Notre objectif est de vous proposer des produits frais et de qualité, cultivés avec soin et amour. Venez découvrir nos produits et notre savoir-faire, et partagez avec nous la passion de la terre et de la nature.`,
      };
    }

    return null;
  }
}
