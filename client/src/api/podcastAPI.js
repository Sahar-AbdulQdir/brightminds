const BASE_URL = import.meta.env.VITE_API_URL || "https://lexiaminds-private-test.onrender.com";

export const fetchHotPodcasts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/podcasts/hot`);
    if (!res.ok) throw new Error(`Failed to load podcasts: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Error fetching hot podcasts:", err);
    throw err;
  }
};

export const fetchPodcastEpisodes = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/podcasts/${id}/episodes`);
    if (!res.ok) throw new Error(`Failed to load episodes: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(`Error fetching episodes for podcast ${id}:`, err);
    throw err;
  }
};
