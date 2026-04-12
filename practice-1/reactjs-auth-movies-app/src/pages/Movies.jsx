import { useState, useEffect } from "react";
import { useOmdbApi } from "../hooks/useOmdbApi";
import { useFavorites } from "../contexts/FavoritesContext";
import styles from "./Movies.module.css";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { addFavorite, removeFavorite, favoriteIds } = useFavorites();

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, loading, error, fetchMovies } = useOmdbApi({
    query: debouncedSearch,
  });

  const movies = data?.Search || [];

  const toggleFavorite = (movie) => {
    if (favoriteIds.has(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <main className={styles.movies}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Movies</h1>
        <p className={styles.pageSubtitle}>
          Explore our collection of amazing movies
        </p>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search movies by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <p>⚠️ {error}</p>
        </div>
      )}

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading movies...</p>
        </div>
      )}

      {!loading && movies.length > 0 ? (
        <div className={styles.moviesGrid}>
          {movies.map((movie) => (
            <article
              key={movie.imdbID}
              className={styles.movieCard}
              style={{
                backgroundImage: `url('${movie.Poster}'), linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
              }}
            >
              <div className={styles.cardOverlay}></div>

              <button
                className={`${styles.favoriteButton} ${
                  favoriteIds.has(movie.imdbID) ? styles.favorited : ""
                }`}
                onClick={() => toggleFavorite(movie)}
                aria-label={
                  favoriteIds.has(movie.imdbID)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {favoriteIds.has(movie.imdbID) ? "❤️" : "🤍"}
              </button>

              <div className={styles.cardContent}>
                <h2 className={styles.movieTitle}>{movie.Title}</h2>
                <p className={styles.movieDescription}>
                  {movie.Year} • {movie.Type}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : !loading && debouncedSearch ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>
            No movies found for "{debouncedSearch}". Try a different search.
          </p>
        </div>
      ) : !loading && !debouncedSearch ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>
            Start searching to discover movies
          </p>
        </div>
      ) : null}
    </main>
  );
}

export default Movies;
