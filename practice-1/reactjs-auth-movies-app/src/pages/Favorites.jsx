import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Favorites.module.css";

function Favorites() {
  const { favorites, loading, error, removeFavorite } = useFavorites();
  const { user } = useAuth();

  return (
    <main className={styles.favorites}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Your Favorites</h1>
          <p className={styles.pageSubtitle}>
            All your saved movies are stored here so you can revisit them
            anytime.
          </p>
        </div>
      </header>

      {!user ? (
        <div className={styles.emptyState}>
          <h2>Please log in</h2>
          <p>Log in to view your favorite movies.</p>
        </div>
      ) : loading ? (
        <div className={styles.emptyState}>
          <h2>Loading favorites...</h2>
          <p>Getting your saved movies from the server.</p>
        </div>
      ) : error ? (
        <div className={styles.emptyState}>
          <h2>Could not load favorites</h2>
          <p>{error}</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No favorites yet</h2>
          <p>
            Save movies from the Movies page to build your personal watchlist.
          </p>
        </div>
      ) : (
        <section className={styles.grid}>
          {favorites.map((fav) => (
            <article
              key={fav.movie.imdbID}
              className={styles.favoriteCard}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.9)), url('${fav.movie.Poster}')`,
              }}
            >
              <div className={styles.cardContent}>
                <p className={styles.movieType}>{fav.movie.Type}</p>
                <h2 className={styles.movieTitle}>{fav.movie.Title}</h2>
                <p className={styles.movieMeta}>{fav.movie.Year}</p>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeFavorite(fav.movie.imdbID)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Favorites;
