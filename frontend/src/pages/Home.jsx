import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";

import "../styles/navbar.css";
import "../styles/moviecard.css";
import "../styles/movierow.css";
import "../styles/hero.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await api.get("movies/", {
          params: {
            search: searchQuery,
          },
        });

        console.log("MOVIES FROM API:", response.data);

        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchMovies();
  }, [searchQuery]);

  const trendingMovies = movies.filter((movie) =>
    movie.collections.includes("Trending Now"),
  );

  const topRatedMovies = movies.filter((movie) =>
    movie.collections.includes("Top Rated"),
  );

  const popularMovies = movies.filter((movie) =>
    movie.collections.includes("Popular"),
  );

  const newReleases = movies.filter((movie) =>
    movie.collections.includes("New Releases"),
  );

  const isSearching = searchQuery.trim() !== "";

  return (
    <>
      <Navbar onSearch={setSearchQuery} />

      {isSearching ? (
        <main className="search-results-page">
          <h1>Search Results</h1>

          <p>
            Results for: <strong>{searchQuery}</strong>
          </p>

          {movies.length === 0 ? (
            <h2>No movies found.</h2>
          ) : (
            <MovieRow title="" movies={movies} />
          )}
        </main>
      ) : (
        <>
          <HeroBanner movie={movies[0]} />

          <MovieRow title="Trending Now" movies={trendingMovies} />

          <MovieRow title="Top Rated" movies={topRatedMovies} />

          <MovieRow title="Popular" movies={popularMovies} />

          <MovieRow title="New Releases" movies={newReleases} />
        </>
      )}
    </>
  );
}

export default Home;
