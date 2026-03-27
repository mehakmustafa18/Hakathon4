import { useState, useEffect } from "react";
import { FiPlay, FiPlus, FiThumbsUp, FiVolume2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import api from "../context/api";
import Button from "../components/Button";
import MovieSlider from "../components/MovieSlider";
import FreeTrial from "../components/FreeTrial";
import "../styles/Movies.css";

const Movies = () => {
  const navigate = useNavigate();
  const [dbVideos, setDbVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await api.get("/videos");
        setDbVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos");
      }
    };
    fetchVideos();
  }, []);

  const genres = [
    {
      name: "Action",
      images: [
        "/Image (8).png",
        "/Image (9).png",
        "/Image (10).png",
        "/Image (11).png",
      ],
    },
    {
      name: "Adventure",
      images: [
        "/Image.png",
        "/Image (1).png",
        "/Image (2).png",
        "/Image (3).png",
      ],
    },
    {
      name: "Comedy",
      images: [
        "/Image (4).png",
        "/Image (5).png",
        "/Image (7).png",
        "/Image (6).png",
      ],
    },
    {
      name: "Drama",
      images: [
        "/Image (8).png",
        "/Image (9).png",
        "/Image (10).png",
        "/Image (11).png",
      ],
    },
    {
      name: "Horror",
      images: [
        "/Image (12).png",
        "/Image (13).png",
        "/Image (14).png",
        "/Image (15).png",
      ],
    },
  ];

  return (
    <div className="movies-page">
      {/* Movies Hero Section */}
      <section className="movies-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            {dbVideos.length > 0
              ? dbVideos[dbVideos.length - 1].title
              : "Avengers : Endgame"}
          </h1>
          <p>
            {dbVideos.length > 0
              ? dbVideos[dbVideos.length - 1].description
              : "With the help of remaining allies, the Avengers must assemble once more..."}
          </p>
          <div className="hero-actions">
            <Button
              variant="primary"
              onClick={() =>
                navigate(
                  dbVideos.length > 0
                    ? `/movie/${dbVideos[dbVideos.length - 1]._id}`
                    : "#",
                )
              }
            >
              <FiPlay style={{ marginRight: "8px" }} /> Play Now
            </Button>
            <div className="icon-actions">
              <button className="icon-btn">
                <FiPlus />
              </button>
              <button className="icon-btn">
                <FiThumbsUp />
              </button>
              <button className="icon-btn">
                <FiVolume2 />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sliders Area */}
      <div className="movie-sections-wrapper">
        <div className="movies-tag">Movies</div>

        {/* Popular Top 10 */}
        {dbVideos.length > 0 && (
          <MovieSlider title="Popular Top 10 in Genres">
            {dbVideos.slice(0, 5).map((movie) => (
              <Link
                to={`/movie/${movie._id}`}
                key={movie._id}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="movie-poster-card"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <div className="poster-img-box">
                    <img
                      src={movie.thumbnailUrl || "/Image (32).png"}
                      alt={movie.title}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="movie-meta">
                    <span className="meta-badge">
                      {movie.duration || "2h 10m"}
                    </span>
                    <span
                      className="meta-info"
                      style={{ color: "#fff", fontWeight: 600 }}
                    >
                      {movie.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </MovieSlider>
        )}

        {/* Our Genres */}
        <MovieSlider title="Our Genres">
          {genres.map((genre) => (
            <div key={genre.name} className="genre-card">
              <div className="genre-images-grid">
                {genre.images.map((imgSrc, i) => (
                  <div key={i} className="genre-img-box">
                    <img src={imgSrc} alt="" />
                  </div>
                ))}
              </div>
              <div className="genre-footer">
                <span>{genre.name}</span>
                <img src="/Icon (11).png" alt="" className="arrow-img" />
              </div>
            </div>
          ))}
        </MovieSlider>

        {/* Trending Now */}
        {dbVideos.length > 5 && (
          <MovieSlider title="Trending Now">
            {dbVideos.slice(5, 10).map((movie) => (
              <Link
                to={`/movie/${movie._id}`}
                key={movie._id}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="movie-poster-card"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <div className="poster-img-box">
                    <img
                      src={movie.thumbnailUrl || "/Image (32).png"}
                      alt={movie.title}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="movie-meta">
                    <span className="meta-badge">
                      {movie.duration || "2h 10m"}
                    </span>
                    <span
                      className="meta-info"
                      style={{ color: "#fff", fontWeight: 600 }}
                    >
                      {movie.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </MovieSlider>
        )}

        {/* New Releases */}
        {dbVideos.length > 10 && (
          <MovieSlider title="New Releases">
            {dbVideos.slice(10, 15).map((movie) => (
              <Link
                to={`/movie/${movie._id}`}
                key={movie._id}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="movie-poster-card"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <div className="poster-img-box">
                    <img
                      src={movie.thumbnailUrl || "/Image (32).png"}
                      alt={movie.title}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="movie-meta">
                    <span className="meta-badge">
                      {movie.duration || "2h 10m"}
                    </span>
                    <span
                      className="meta-info"
                      style={{ color: "#fff", fontWeight: 600 }}
                    >
                      {movie.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </MovieSlider>
        )}

        {/* Must Watch Movies */}
        {dbVideos.length > 15 && (
          <MovieSlider title="Must - Watch Movies">
            {dbVideos.slice(15, 20).map((movie) => (
              <Link
                to={`/movie/${movie._id}`}
                key={movie._id}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="movie-poster-card"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <div className="poster-img-box">
                    <img
                      src={movie.thumbnailUrl || "/Image (32).png"}
                      alt={movie.title}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="movie-meta">
                    <span className="meta-badge">
                      {movie.duration || "2h 10m"}
                    </span>
                    <span
                      className="meta-info"
                      style={{ color: "#fff", fontWeight: 600 }}
                    >
                      {movie.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </MovieSlider>
        )}
      </div>

      <div className="container">
        <FreeTrial />
      </div>
    </div>
  );
};

export default Movies;
