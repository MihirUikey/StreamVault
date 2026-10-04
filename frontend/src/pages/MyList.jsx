import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import api from "../services/api";
import "../styles/movies.css";
import "../styles/navbar.css";

function MyList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyList() {
      try {
        const response = await api.get("movies/my-list/");

        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch My List:", error);
        setError("Failed to load your list.");
      } finally {
        setLoading(false);
      }
    }

    fetchMyList();
  }, []);

  return (
    <>
      <Navbar />

      <main className="movies-page">
        <div className="movies-header">
          <h1>My List</h1>
        </div>

        {loading && <h2>Loading your list...</h2>}

        {!loading && error && <h2>{error}</h2>}

        {!loading && !error && items.length === 0 && (
          <h2>Your list is empty.</h2>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="my-list-grid">
            {items.map((item) => {
              if (item.movie) {
                return (
                  <MovieCard key={`movie-${item.id}`} movie={item.movie} />
                );
              }

              if (item.tv_show) {
                return <TVShowCard key={`tv-${item.id}`} show={item.tv_show} />;
              }

              return null;
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default MyList;
