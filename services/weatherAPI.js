import axios from "axios";

const API_KEY = "399792b6219a2762c349b5e4f68e5080";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
    return data;
  } catch (error) {
    console.error("Error fetching current weather:", error.message);
    throw new Error("Failed to fetch current weather");
  }
};

export const getForecast = async (city) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
    return data;
  } catch (error) {
    console.error("Error fetching forecast:", error.message);
    throw new Error("Failed to fetch forecast");
  }
};
