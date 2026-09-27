function HeroBanner({ movie }) {
  if (!movie) return null;
  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(http://127.0.0.1:8000${movie.banner})`,
      }}
    >
      <div className="hero-content">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <div className="hero-buttons">
          <button className="play-btn">▶ Play</button>
          <button className="list-btn">+ My List</button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
