import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import TVShowCard from "../components/TVShowCard";

import "../styles/movies.css";
import "../styles/navbar.css";

function TVShows() {
  const [tvShows, setTVshows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTVShows() {
      try {
        const response = await api.get("/movies/tv-shows/");
        console.log("TV SHOWS FROM API:", response.data);
        setTVshows(response.data);
      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTVShows();
  }, []);
  return (
    <>
      <Navbar />

      <main className="movies-page">
        <div className="movies-header">
          <h1>TV Shows</h1>
        </div>

        {loading ? (
          <h2>Loading TV shows...</h2>
        ) : tvShows.length === 0 ? (
          <h2>No TV shows found.</h2>
        ) : (
          <div className="movies-grid">
            {tvShows.map((show) => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default TVShows;
