//CREATION USER SERVICE
import AxiosService from "./database";

export default class UserService extends AxiosService {
  constructor() {
    super("user");
  }

  async getAll() {
    const response = await this.get("");
    return response.data;
  }

  async getOne(id) {
    const response = await this.get(`/${id}`);
    return response.data;
  }

  /**
   *
   * @param {*} user
   * @returns
   */
  async add(user) {
    const response = await this.post("", user);
    return response.data;
  }

  async update(id, user) {
    const response = await this.put(`${id}`, user);
    return response.data;
  }

  async delete(id) {
    const response = await this.delete(`${id}`);
    return response.data;
  }

  async login(user) {
    const response = await this.post("login", user);
    return response.data;
  }

  async register(user) {
    const response = await this.post("register", user);
    return response.data;
  }
}
