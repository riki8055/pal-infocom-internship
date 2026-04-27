// Carousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Optional modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Carousel({ movies = [], loading = false }) {
  // Dummy movie data as fallback
  const dummyMovies = [
    {
      Title: "The Great Adventure",
      Poster:
        "https://via.placeholder.com/300x400/FF0000/FFFFFF?text=The+Great+Adventure",
    },
    {
      Title: "Mystery Island",
      Poster:
        "https://via.placeholder.com/300x400/00FF00/FFFFFF?text=Mystery+Island",
    },
    {
      Title: "Space Odyssey",
      Poster:
        "https://via.placeholder.com/300x400/0000FF/FFFFFF?text=Space+Odyssey",
    },
  ];

  // Use actual movies if available, fallback to dummy data
  const moviesToDisplay = movies.length > 0 ? movies : dummyMovies;

  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px", color: "#fff" }}>Loading movies...</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {moviesToDisplay.map((movie, index) => (
        <SwiperSlide key={index}>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400?text=No+Poster"}
              alt={movie.Title}
              style={{
                width: "300px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ marginTop: "10px", color: "#fff" }}>{movie.Title}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
