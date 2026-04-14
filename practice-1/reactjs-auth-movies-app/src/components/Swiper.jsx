// Carousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Optional modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Carousel() {
  // Dummy movie data
  const dummyMovies = [
    {
      title: "The Great Adventure",
      poster:
        "https://via.placeholder.com/300x400/FF0000/FFFFFF?text=The+Great+Adventure",
    },
    {
      title: "Mystery Island",
      poster:
        "https://via.placeholder.com/300x400/00FF00/FFFFFF?text=Mystery+Island",
    },
    {
      title: "Space Odyssey",
      poster:
        "https://via.placeholder.com/300x400/0000FF/FFFFFF?text=Space+Odyssey",
    },
  ];

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
      {dummyMovies.map((movie, index) => (
        <SwiperSlide key={index}>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "300px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ marginTop: "10px", color: "#fff" }}>{movie.title}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
