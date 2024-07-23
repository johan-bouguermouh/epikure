import instance from "./config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getUuid() {
  try {
    const value = await AsyncStorage.getItem("onBoarded");
    if (value) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
}

const endpoint = "/guest";

export const newGuest = async (guest) => {
  try {
    const response = await instance.post(endpoint, {
      uuid: guest,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while creating guest", error.response.data);
      throw error.response.data;
    }
    console.error("Error while creating guest", error);
    throw error;
  }
};

export const addFavoriteProduct = async (productId) => {
  const guest = await getUuid();
  try {
    const response = await instance.post(`${endpoint}/${guest}/products`, {
      productId: productId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while adding favorite product", error.response.data);
      throw error.response.data;
    }
    console.error("Error while adding favorite product", error);
    throw error;
  }
};

export const removeFavoriteProduct = async (productId) => {
  const guest = await getUuid();
  try {
    const response = await instance.delete(
      `${endpoint}/${guest}/products/${productId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error while removing favorite product",
        error.response.data
      );
      throw error.response.data;
    }
    console.error("Error while removing favorite product", error);
    throw error;
  }
};

export const getGuest = async () => {
  const guest = await getUuid();
  try {
    const response = await instance.get(`${endpoint}/${guest}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error while getting guest", error.response.data);
      throw error.response.data;
    }
    console.error("Error while getting guest", error);
    throw error;
  }
};