import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            MovieApp
          </Link>
        </div>

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
              <Link to="/login" className={styles.authLink}>
                Login
              </Link>
              <Link to="/signup" className={styles.authLink}>
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;