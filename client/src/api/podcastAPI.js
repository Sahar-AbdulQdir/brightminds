// src/api/podcastAPI.js
import axios from "axios";

const API_URL = "https://listen-api.listennotes.com/api/v2";
const API_KEY = "25e0c86be7b84bdc9fd43238f7932ad2"; // replace with your own if needed

// Fetch top/best podcasts
export const fetchHotPodcasts = async () => {
  try {
    const response = await axios.get(`${API_URL}/best_podcasts`, {
      headers: { "X-ListenAPI-Key": API_KEY },
    });
    return response.data.podcasts; // array of podcast objects
  } catch (error) {
    console.error("Error fetching hot podcasts:", error);
    return [];
  }
};

// Search podcasts by query
export const fetchSearchPodcasts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      headers: { "X-ListenAPI-Key": API_KEY },
      params: { q: query, type: "podcast" },
    });
    return response.data.results; // array of podcast objects
  } catch (error) {
    console.error("Error searching podcasts:", error);
    return [];
  }
};

// Fetch episodes of a specific podcast
export const fetchPodcastEpisodes = async (podcastId) => {
  try {
    const response = await axios.get(`${API_URL}/podcasts/${podcastId}`, {
      headers: { "X-ListenAPI-Key": API_KEY },
    });

    // Map episodes to ensure they have required properties
    return response.data.episodes.map((ep) => ({
      id: ep.id,
      title: ep.title,
      audio: ep.audio,      // the actual audio URL
      description: ep.description,
      pubDate: ep.pub_date_ms,
      thumbnail: ep.thumbnail,
      podcastTitle: response.data.title,
    }));
  } catch (error) {
    console.error(`Error fetching episodes for podcast ${podcastId}:`, error);
    return [];
  }
};
