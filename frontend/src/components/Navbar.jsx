import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    if (onSearch) {
      onSearch(search.trim());
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
      state: null,
    });
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

        {isAuthenticated ? (
          <li>
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
