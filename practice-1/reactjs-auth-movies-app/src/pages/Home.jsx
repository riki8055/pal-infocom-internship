import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOmdbApi } from "../hooks/useOmdbApi";
import Carousel from "../components/Swiper";
import styles from "./Home.module.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Get last searched term from localStorage
  const lastSearchedTerm = localStorage.getItem("lastSearchedTerm");
  
  // Fetch movies using the last searched term
  const { data: searchResults, loading: loadingCarousel } = useOmdbApi({
    query: lastSearchedTerm || "",
  });

  const handleSearch = () => {
    navigate("/movies", { state: { search: searchTerm } });
  };

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1 className={styles.title}>Discover your next favorite movie.</h1>
          <p className={styles.subtitle}>
            Search top movies, browse curated collections, and keep track of
            your favorite releases—all from one sleek dashboard.
          </p>

          <div className={styles.searchPanel}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search by title, actor, or genre"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button
              className={styles.searchButton}
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className={styles.heroIllustration}>
          <Carousel movies={searchResults?.Search?.slice(0, 3) || []} loading={loadingCarousel} />
        </div>
      </section>

      <section className={styles.cardsGrid}>
        <article className={styles.card}>
          <p className={styles.cardTitle}>Trending Now</p>
          <p className={styles.cardValue}>24 Movies</p>
          <p className={styles.cardNote}>
            See the latest trending titles across all genres.
          </p>
        </article>

        <article className={styles.card}>
          <p className={styles.cardTitle}>Watchlist</p>
          <p className={styles.cardValue}>10 Items</p>
          <p className={styles.cardNote}>
            Movies saved for later viewing and recommendations.
          </p>
        </article>

        <article className={styles.card}>
          <p className={styles.cardTitle}>Favorites</p>
          <p className={styles.cardValue}>8 Stars</p>
          <p className={styles.cardNote}>
            Your top-rated movies and personal favorites.
          </p>
        </article>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Picks</h2>
          <a className={styles.viewAll} href="/movies">
            View all
          </a>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <div className={styles.featureMedia}>The Adventure Begins</div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureName}>Epic Voyage</h3>
              <p className={styles.featureDesc}>
                A high-energy action thriller with stunning visuals and
                unforgettable characters.
              </p>
            </div>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureMedia}>Critic’s Choice</div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureName}>Moonlight Drive</h3>
              <p className={styles.featureDesc}>
                An atmospheric drama that captivates from the first scene to the
                last.
              </p>
            </div>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureMedia}>Award Winner</div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureName}>Starlight Echoes</h3>
              <p className={styles.featureDesc}>
                A bold sci-fi adventure built around a powerful emotional
                journey.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
