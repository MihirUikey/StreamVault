import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/moviedetails.css";

function TVShowDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [tvShow, setTVShow] = useState(null);
  const [myListItem, setMyListItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    async function fetchTVShow() {
      try {
        const response = await api.get(`movies/tv-shows/${slug}/`);
        setTVShow(response.data);
      } catch (error) {
        console.error("Failed to fetch TV show:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTVShow();
  }, [slug]);
  useEffect(() => {
    async function checkMyList() {
      if (!isAuthenticated || !tvShow) {
        setMyListItem(null);
        return;
      }
      try {
        const response = await api.get("movies/my-list/");
        const existingItem = response.data.find(
          (item) => item.tv_show && item.tv_show.id === tvShow.id,
        );
        setMyListItem(existingItem || null);
      } catch (error) {
        console.error("Failed to check my list:", error);
      }
    }
    checkMyList();
  }, [isAuthenticated, tvShow]);

  async function handleAddToMyList() {
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
        const response = await api.post("movies/my-list/", {
          tv_show: tvShow.id,
        });
        setMyListItem(response.data);
      }
    } catch (error) {
      console.error("Failed to update My List:", error);
    } finally {
      setListLoading(false);
    }
  }
  if (loading) {
    return <div className="movie-details-loading">Loading...</div>;
  }

  if (!tvShow) {
    return <div className="movie-details-loading">TV show not found</div>;
  }

  return (
    <div className="movie-details">
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(http://127.0.0.1:8000${tvShow.banner})`,
        }}
      >
        <div className="movie-backdrop-overlay" />

        <div className="movie-info">
          <img
            className="movie-poster"
            src={`http://127.0.0.1:8000${tvShow.poster}`}
            alt={tvShow.title}
          />

          <div className="movie-content">
            <h1>{tvShow.title}</h1>
            <div className="movie-meta">
              <span>⭐ {tvShow.rating}</span>
              <span>{tvShow.release_year}</span>
              <span>{tvShow.maturity_rating}</span>
              <span>{tvShow.language}</span>
            </div>
            <p className="movie-description">{tvShow.description}</p>
            <div className="movie-genres">
              {tvShow.genres.map((genre) => (
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
            x
          </div>
        </div>
      </div>
    </div>
  );
}

export default TVShowDetails;
