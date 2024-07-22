import instance from "./config";
import axios from "axios";

const endpoint = "/place";

export const getPlaces = async () => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while fetching places", error.response.data);
      throw error.response.data;
    }
    console.error("Error while fetching places", error);
    throw error;
  }
};
