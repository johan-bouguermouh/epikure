import instance from "./config";
import axios from "axios";

const endpoint = "/product";

export const getProducts = async (month = null) => {
  const query = month ? `?month=${month}` : "";
  try {
    const response = await instance.get(`${endpoint}/season`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while fetching products", error.response.data);
      throw error.response.data;
    }
    console.error("Error while fetching products", error);
    throw error;
  }
};

export const getProduct = async (productId, location) => {
  const { latitude, longitude } = location;
  try {
    const response = await instance.get(`${endpoint}/${productId}`, {
      params: { latitude, longitude },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while fetching product", error.response.data);
      throw error.response.data;
    }
    console.error("Error while fetching product", error);
    throw error;
  }
};
