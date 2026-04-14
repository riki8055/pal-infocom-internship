// Carousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Optional modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Carousel() {
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
      <SwiperSlide>
        <div style={{ background: "#111", color: "#fff", padding: "50px" }}>
          Slide 1
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div style={{ background: "#333", color: "#fff", padding: "50px" }}>
          Slide 2
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div style={{ background: "#555", color: "#fff", padding: "50px" }}>
          Slide 3
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Carousel;
