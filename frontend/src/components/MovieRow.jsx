import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  return (
    <div className="movie-row">
      <h1>{title}</h1>
      <div className="row">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
