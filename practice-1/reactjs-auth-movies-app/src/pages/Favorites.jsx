import { useFavorites } from "../contexts/FavoritesContext";
import styles from "./Favorites.module.css";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

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

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No favorites yet</h2>
          <p>
            Save movies from the Movies page to build your personal watchlist.
          </p>
        </div>
      ) : (
        <section className={styles.grid}>
          {favorites.map((movie) => (
            <article
              key={movie.imdbID}
              className={styles.favoriteCard}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.9)), url('${movie.Poster}')`,
              }}
            >
              <div className={styles.cardContent}>
                <p className={styles.movieType}>{movie.Type}</p>
                <h2 className={styles.movieTitle}>{movie.Title}</h2>
                <p className={styles.movieMeta}>{movie.Year}</p>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeFavorite(movie.imdbID)}
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
