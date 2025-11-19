import axios from "axios";

const API_URL = "https://listen-api.listennotes.com/api/v2";
const API_KEY = "25e0c86be7b84bdc9fd43238f7932ad2"; // get from listennotes.com/api

export const fetchHotPodcasts = async () => {
  const response = await axios.get(`${API_URL}/best_podcasts`, {
    headers: { "X-ListenAPI-Key": API_KEY },
  });
  return response.data.podcasts;
};

export const fetchSearchPodcasts = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    headers: { "X-ListenAPI-Key": API_KEY },
    params: { q: query, type: "podcast" },
  });
  return response.data.results;
};
