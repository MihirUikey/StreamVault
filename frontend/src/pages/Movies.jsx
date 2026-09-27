import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import "../styles/movies.css";
import "../styles/navbar.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch genres
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await api.get("movies/genres/");
        setGenres(response.data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    }

    fetchGenres();
  }, []);

  // Fetch movies
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);

        const response = await api.get("movies/", {
          params: {
            search: searchQuery,
            genre: genre,
          },
        });

        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchQuery, genre]);

  return (
    <>
      <Navbar onSearch={setSearchQuery} />

      <main className="movies-page">
        <div className="movies-header">
          <h1>Movies</h1>

          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">All Genres</option>

            {genres.map((genreItem) => (
              <option key={genreItem.id} value={genreItem.name}>
                {genreItem.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <h2>Loading movies...</h2>
        ) : movies.length === 0 ? (
          <h2>No movies found.</h2>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Movies;
