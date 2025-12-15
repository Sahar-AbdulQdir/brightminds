import React, { useState } from "react";
import { fetchSearchPodcasts } from "../../api/podcastAPI";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchSearchPodcasts(query);
    setResults(data);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="flex justify-center">
        <input
          className="w-2/3 p-2 rounded-l-lg border focus:outline-none"
          placeholder="Search podcasts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-purple-500 text-white px-4 rounded-r-lg hover:bg-purple-600">
          Search
        </button>
      </form>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-lg shadow">
            <img src={r.image} alt={r.title_original} className="h-32 w-full object-cover rounded-md" />
            <h3 className="font-semibold mt-2">{r.title_original}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
