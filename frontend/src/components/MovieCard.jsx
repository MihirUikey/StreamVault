import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.slug}`} className="movie-card">
      <div className="movie-poster">
        <img src={`http://127.0.0.1:8000${movie.poster}`} alt={movie.title} />
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          ⭐ {movie.rating} <span>•</span> {movie.release_year}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;
