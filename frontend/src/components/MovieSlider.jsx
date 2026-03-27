import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../styles/MovieSlider.css";

const MovieSlider = ({ title, children }) => {
  const contentRef = useRef(null);

  const onScroll = (direction) => {
    if (!contentRef.current) return;
    const card = contentRef.current.querySelector(".movie-poster-card");
    const cardWidth = card ? card.offsetWidth : 180;
    const gap = 12;
    const distance = cardWidth + gap;
    contentRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="movie-slider-container">
      <div className="movie-slider-header">
        <h2>{title}</h2>
        <div className="movie-slider-controls">
          <button className="slider-btn" onClick={() => onScroll("left")}>
            <FiChevronLeft />
          </button>
          <div className="slider-indicators">
            <div className="indicator active"></div>
            <div className="indicator"></div>
            <div className="indicator"></div>
            <div className="indicator"></div>
          </div>
          <button className="slider-btn" onClick={() => onScroll("right")}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="movie-slider-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default MovieSlider;
