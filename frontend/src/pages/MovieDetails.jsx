import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import "../styles/moviedetails.css";

function MovieDetails() {
  const { slug } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await api.get(`movies/${slug}/`);
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [slug]);

  if (loading) {
    return <div className="movie-details-loading">Loading...</div>;
  }

  if (!movie) {
    return <div className="movie-details-loading">Movie not found</div>;
  }

  return (
    <div className="movie-details">
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(http://127.0.0.1:8000${movie.banner})`,
        }}
      >
        <div className="movie-backdrop-overlay" />

        <div className="movie-info">
          <img
            className="movie-poster"
            src={`http://127.0.0.1:8000${movie.poster}`}
            alt={movie.title}
          />

          <div className="movie-content">
            <h1>{movie.title}</h1>

            <div className="movie-meta">
              <span>⭐ {movie.rating}</span>
              <span>{movie.release_year}</span>
              <span>{movie.maturity_rating}</span>
              <span>{movie.language}</span>
            </div>

            <p className="movie-description">{movie.description}</p>

            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>

            <div className="movie-actions">
              <button className="play-button">▶ Play</button>

              <button className="list-button">+ My List</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
