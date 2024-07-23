import instance from "./config";
import axios from "axios";

const endpoint = "/guest";

export const newGuest = async (guest) => {
    
  try {
    const response = await instance.post(endpoint , {
        uuid: guest
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
}