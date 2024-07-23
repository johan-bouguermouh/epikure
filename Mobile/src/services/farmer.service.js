import instance from "./config";
import axios from "axios";

const endpoint = "/farmer";

/**
 *
 * @param {number} farmerId
 * @param {
 * latitude: number,
 * longitude: number
 * } location
 * @returns
 */
export async function getFarmers(farmerId, location) {
  const { latitude, longitude } = location;
  try {
    const response = await instance.get(`${endpoint}/public/${farmerId}`, {
      params: {
        latitude,
        longitude,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response);
    }
    console.error(error);
    return error;
  }
}
