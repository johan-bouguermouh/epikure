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

export const getPlace = async (id) => {
  try {
    const response = await instance.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while fetching place", error.response.data);
      throw error.response.data;
    }
    console.error("Error while fetching place", error);
    throw error;
  }
};

export const getMap = async (location) => {
  const { latitude, longitude } = location;
  try {
    const response = await instance.get(`${endpoint}/map`, {
      params: {
        latitude,
        longitude,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while fetching map", error.response.data);
      throw error.response.data;
    }
    console.error("Error while fetching map", error);
    throw error;
  }
};
