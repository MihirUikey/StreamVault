import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    onSearch(search.trim());
  };

  return (
    <nav className="navbar">
      <h1 className="logo">STREAMVAULT</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">🔍</button>
      </form>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/tv-shows">TV Shows</Link>
        </li>
        <li>
          <Link to="/my-list">My List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
