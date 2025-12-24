const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchHotPodcasts = async () => {
  const res = await fetch(`${BASE_URL}/api/podcasts/hot`);
  if (!res.ok) throw new Error("Failed to load podcasts");
  return res.json();
};


export const fetchPodcastEpisodes = async (id) => {
  const res = await fetch(`${BASE_URL}/api/podcasts/${id}/episodes`);
  return res.json();
};
