import axios from "axios";
import { coreService } from "./general";

export const BASE_URL = "https://dummyjson.com";

export const loginAuthentication = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getAuthMe = async () => {
  const accessToken = coreService.getItem("accessToken");

  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
