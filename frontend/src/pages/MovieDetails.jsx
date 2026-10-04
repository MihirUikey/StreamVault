import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/moviedetails.css";

function MovieDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [myListItem, setMyListItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);

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

  useEffect(() => {
    async function checkMyList() {
      if (!isAuthenticated || !movie) {
        setMyListItem(null);
        return;
      }

      try {
        const response = await api.get("movies/my-list/");

        const existingItem = response.data.find(
          (item) => item.movie && item.movie.id === movie.id,
        );

        setMyListItem(existingItem || null);
      } catch (error) {
        console.error("Failed to check My List:", error);
      }
    }

    checkMyList();
  }, [movie, isAuthenticated]);

  async function handleMyList() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setListLoading(true);

    try {
      if (myListItem) {
        await api.delete(`movies/my-list/${myListItem.id}/`);

        setMyListItem(null);
      } else {
        const response = await api.post("movies/my-list/", { movie: movie.id });

        setMyListItem(response.data);
      }
    } catch (error) {
      console.error("Failed to update My List:", error);

      if (error.response?.data?.detail) {
        console.error(error.response.data.detail);
      }
    } finally {
      setListLoading(false);
    }
  }

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

              <button
                className="list-button"
                onClick={handleMyList}
                disabled={listLoading}
              >
                {listLoading
                  ? "Updating..."
                  : myListItem
                    ? "✓ In My List"
                    : "+ My List"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
