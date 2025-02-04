// Import Link dari React Router
import { Link } from "react-router-dom";

// Import Routes
import Routes from "./routes";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Brand/Home Link */}
          <Link to="/" className="navbar-brand fw-bold">
            HOME
          </Link>

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/games" className="nav-link">
                  GAMES
                </Link>
              </li>
            </ul>

            {/* Instagram Button */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  href="https://instagram.com/hilmygoodboy_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success fw-semibold px-3"
                  style={{ transition: "0.3s" }}
                >
                  My Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes />
    </>
  );
}
