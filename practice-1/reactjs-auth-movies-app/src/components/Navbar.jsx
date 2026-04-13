import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

function Navbar({ onAuthReset }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink} onClick={closeMenu}>
            MovieApp
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Navigation */}
        <div className={styles.tabs}>
          <Link to="/" className={styles.tab}>
            Home
          </Link>
          <Link to="/movies" className={styles.tab}>
            Movies
          </Link>
          <Link to="/favorites" className={styles.tab}>
            Favorites
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className={styles.auth}>
          {user ? (
            <div className={styles.userSection}>
              <span className={styles.username}>Welcome, {user.name}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link
            to="/login"
            className={styles.authLink}
            onClick={() => onAuthReset?.()}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={styles.authLink}
            onClick={() => onAuthReset?.()}
          >
            Signup
          </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileTab} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/movies" className={styles.mobileTab} onClick={closeMenu}>
            Movies
          </Link>
          <Link
            to="/favorites"
            className={styles.mobileTab}
            onClick={closeMenu}
          >
            Favorites
          </Link>
          <div className={styles.mobileDivider}></div>
          {user ? (
            <div className={styles.mobileAuth}>
              <span className={styles.mobileUsername}>
                Welcome, {user.name}
              </span>
              <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuthLinks}>
              <Link
                to="/login"
                className={styles.mobileAuthLink}
                onClick={() => {
                  onAuthReset?.();
                  closeMenu();
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={styles.mobileAuthLink}
                onClick={() => {
                  onAuthReset?.();
                  closeMenu();
                }}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
