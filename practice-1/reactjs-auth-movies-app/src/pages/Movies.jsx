import { useState } from "react";
import styles from "./Movies.module.css";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());

  // Sample movie data
  const allMovies = [
    {
      id: 1,
      title: "The Midnight Sky",
      description:
        "A scientist struggles to stop an event that will have catastrophic consequences for the universe.",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Soul",
      description:
        "After getting the opportunity of a lifetime, a New York jazz musician is accidentally sent to the afterlife.",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "The Trial",
      description:
        "A man is accused of a crime he doesn't understand in a nightmarish legal system.",
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Dune",
      description:
        "Paul Atreides, a brilliant young man, must travel to the most dangerous planet to ensure the future of his family.",
      image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: 5,
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    },
    {
      id: 6,
      title: "Inception",
      description:
        "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
      image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
    {
      id: 7,
      title: "The Prestige",
      description:
        "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion.",
      image: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
    },
    {
      id: 8,
      title: "Tenet",
      description:
        "Armed with only one word, a skilled operative must prevent an armed conflict set in the world of international espionage.",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  ];

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleFavorite = (movieId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
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

      {filteredMovies.length > 0 ? (
        <div className={styles.moviesGrid}>
          {filteredMovies.map((movie) => (
            <article
              key={movie.id}
              className={styles.movieCard}
              style={{ backgroundImage: `${movie.image}` }}
            >
              <div className={styles.cardOverlay}></div>

              <button
                className={`${styles.favoriteButton} ${
                  favorites.has(movie.id) ? styles.favorited : ""
                }`}
                onClick={() => toggleFavorite(movie.id)}
                aria-label={
                  favorites.has(movie.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {favorites.has(movie.id) ? "❤️" : "🤍"}
              </button>

              <div className={styles.cardContent}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <p className={styles.movieDescription}>{movie.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>
            No movies found for "{searchTerm}". Try a different search.
          </p>
        </div>
      )}
    </main>
  );
}

export default Movies;
