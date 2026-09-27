import { Link } from "react-router-dom";
function TVShowCard({ show }) {
  return (
    <Link to={`/tv-shows/${show.slug}`} className="tv-show-card">
      <div className="tv-show-poster">
        <img src={`http://localhost:8000${show.poster}`} alt={show.title} />
      </div>
      <div className="tv-show-info">
        <h3>{show.title}</h3>
        <p>
          ⭐️{show.rating} <span>•</span> {show.release_year}{" "}
        </p>
      </div>
    </Link>
  );
}

export default TVShowCard;
