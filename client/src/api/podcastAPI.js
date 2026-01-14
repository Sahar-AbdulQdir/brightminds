// Base URL for API requests, using environment variable if available
const BASE_URL = import.meta.env.VITE_API_URL || "https://lexiaminds-private-test.onrender.com";

// Function to fetch trending or "hot" podcasts
export const fetchHotPodcasts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/podcasts/hot`);
    if (!res.ok) throw new Error(`Failed to load podcasts: ${res.status}`);
    return res.json(); // Return the JSON data from response
  } catch (err) {
    console.error("Error fetching hot podcasts:", err); // Log any errors
    throw err; // Re-throw error for caller to handle
  }
};

// Function to fetch episodes for a specific podcast by its ID
export const fetchPodcastEpisodes = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/podcasts/${id}/episodes`);
    if (!res.ok) throw new Error(`Failed to load episodes: ${res.status}`);
    return res.json(); // Return the JSON data from response
  } catch (err) {
    console.error(`Error fetching episodes for podcast ${id}:`, err); // Log errors with podcast ID
    throw err; // Re-throw error for caller to handle
  }
};
