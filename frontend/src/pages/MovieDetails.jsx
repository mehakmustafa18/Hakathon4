import { useState, useEffect } from "react";
import {
  FiPlay,
  FiPlus,
  FiThumbsUp,
  FiVolume2,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiGlobe,
  FiX,
} from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../context/api";
import Button from "../components/Button";
import FreeTrial from "../components/FreeTrial";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    try {
      const { data } = await api.post(`/videos/${id}/reviews`, newReview);
      setReviews(data.reviews);
      setNewReview({ name: "", text: "", rating: 5 });
      setShowReviewForm(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error adding review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const { data } = await api.delete(`/videos/${id}/reviews/${reviewId}`);
        setReviews(data.reviews);
      } catch (error) {
        alert(error.response?.data?.message || "Error deleting review");
      }
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/videos/${id}`);
        setMovie(data);
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handlePlay = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!user.subscriptionPlan || user.subscriptionPlan === "none") {
      setAccessDenied(true);
      return;
    }
    setShowPlayer(true);
  };

  if (loading) {
    return (
      <div
        className="pt-24 pb-10"
        style={{
          textAlign: "center",
          paddingTop: "12rem",
          color: "var(--brand-text)",
        }}
      >
        Loading movie details...
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        className="pt-24 pb-10"
        style={{
          textAlign: "center",
          paddingTop: "12rem",
          color: "var(--brand-text)",
        }}
      >
        Movie not found
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "40px" }}>
      {/* Video Player Overlay */}
      {showPlayer && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <button
            onClick={() => setShowPlayer(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "0.75rem",
              borderRadius: "50%",
              zIndex: 10,
            }}
          >
            <FiX size={24} />
          </button>
          <video
            controls
            autoPlay
            style={{ width: "100%", maxWidth: "1000px", borderRadius: "1rem" }}
            src={movie.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Access Denied Modal */}
      {accessDenied && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "var(--brand-gray)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "1.25rem",
              padding: "2.5rem",
              maxWidth: "420px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "#fff",
              }}
            >
              Subscription Required
            </h2>
            <p
              style={{
                color: "var(--brand-text)",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              You need an active subscription to watch this content. Choose a
              plan that works for you.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => setAccessDenied(false)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "rgba(255,255,255,0.06)",
                  color: "var(--brand-text)",
                  border: "none",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/subscriptions")}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "var(--brand-red)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section
        className="px-4 md:px-12 lg:px-20 mb-12"
        style={{ padding: "0 5%", marginBottom: "3rem" }}
      >
        <div
          style={{
            position: "relative",
            height: "60vh",
            borderRadius: "1.5rem",
            overflow: "hidden",
          }}
        >
          <img
            src={
              movie.thumbnailUrl ||
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop"
            }
            alt={movie.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, var(--brand-dark) 0%, rgba(15,15,15,0.3) 50%, transparent 100%)",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: 0,
              right: 0,
              textAlign: "center",
              padding: "0 1.5rem",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "#fff",
              }}
            >
              {movie.title}
            </h1>
            <p
              style={{
                color: "var(--brand-text)",
                fontSize: "0.95rem",
                marginBottom: "2rem",
                maxWidth: "700px",
                margin: "0 auto 2rem",
              }}
            >
              {movie.description}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Button onClick={handlePlay}>
                <FiPlay style={{ fill: "currentColor" }} /> Play Now
              </Button>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  style={{
                    padding: "0.75rem",
                    background: "rgba(15,15,15,0.6)",
                    border: "1px solid var(--brand-gray)",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <FiPlus size={20} />
                </button>
                <button
                  style={{
                    padding: "0.75rem",
                    background: "rgba(15,15,15,0.6)",
                    border: "1px solid var(--brand-gray)",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <FiThumbsUp size={20} />
                </button>
                <button
                  style={{
                    padding: "0.75rem",
                    background: "rgba(15,15,15,0.6)",
                    border: "1px solid var(--brand-gray)",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <FiVolume2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section
        style={{
          padding: "0 5%",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          marginBottom: "4rem",
        }}
      >
        {/* Left */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Description */}
          <div
            style={{
              background: "rgba(26,26,26,0.45)",
              padding: "2rem",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h2
              style={{
                color: "var(--brand-text)",
                fontWeight: 500,
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              Description
            </h2>
            <p style={{ color: "#fff", lineHeight: 1.7 }}>
              {movie.description}
            </p>
          </div>

          {/* Reviews */}
          <div
            style={{
              background: "rgba(26,26,26,0.45)",
              padding: "2rem",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  color: "var(--brand-text)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                Reviews
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                style={{
                  background: "#1A1A1A",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                <FiPlus size={16} /> Add Your Review
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleAddReview}
                style={{
                  marginBottom: "2rem",
                  background: "#111",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
                >
                  <input
                    required
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    style={{
                      flex: 1,
                      background: "#1A1A1A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <select
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: Number(e.target.value),
                      })
                    }
                    style={{
                      background: "#1A1A1A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <textarea
                  required
                  placeholder="Write your review here..."
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  rows="3"
                  style={{
                    width: "100%",
                    background: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    marginBottom: "1rem",
                    resize: "vertical",
                  }}
                ></textarea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "0.75rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    style={{
                      background: "transparent",
                      color: "var(--brand-text)",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: "var(--brand-red)",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}

            {/* Reviews Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review._id}
                  style={{
                    background: "#0F0F0F",
                    padding: "1.5rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h4 style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
                        {review.name}
                      </h4>
                      <div
                        style={{
                          color: "var(--brand-text)",
                          fontSize: "0.8rem",
                          marginTop: "0.2rem",
                        }}
                      >
                        From {review.location}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          background: "#1A1A1A",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "1rem",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            size={12}
                            fill={
                              i < Math.floor(review.rating)
                                ? "var(--brand-red)"
                                : "transparent"
                            }
                            color={
                              i < Math.floor(review.rating)
                                ? "var(--brand-red)"
                                : "var(--brand-gray)"
                            }
                          />
                        ))}
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "0.8rem",
                            marginLeft: "0.25rem",
                            fontWeight: 500,
                          }}
                        >
                          {review.rating}
                        </span>
                      </div>
                      {user && user.role === "super_admin" && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          style={{
                            background: "transparent",
                            color: "var(--brand-red)",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p
                    style={{
                      color: "var(--brand-text)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination/Slider Indicators (Mock) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <button
                style={{
                  background: "#1A1A1A",
                  border: "none",
                  color: "#fff",
                  padding: "0.4rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <FiChevronLeft size={16} />
              </button>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                <div
                  style={{
                    height: "4px",
                    width: "16px",
                    borderRadius: "2px",
                    background: "var(--brand-red)",
                  }}
                ></div>
                <div
                  style={{
                    height: "4px",
                    width: "16px",
                    borderRadius: "2px",
                    background: "#333",
                  }}
                ></div>
                <div
                  style={{
                    height: "4px",
                    width: "16px",
                    borderRadius: "2px",
                    background: "#333",
                  }}
                ></div>
              </div>
              <button
                style={{
                  background: "#1A1A1A",
                  border: "none",
                  color: "#fff",
                  padding: "0.4rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div
            style={{
              background: "rgba(26,26,26,0.45)",
              padding: "2rem",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Year */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--brand-text)",
                  marginBottom: "0.5rem",
                  fontSize: "0.85rem",
                }}
              >
                <FiCalendar /> Released Year
              </div>
              <div
                style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}
              >
                {movie.releaseYear || "N/A"}
              </div>
            </div>

            {/* Duration */}
            <div>
              <div
                style={{
                  color: "var(--brand-text)",
                  marginBottom: "0.5rem",
                  fontSize: "0.85rem",
                }}
              >
                Duration
              </div>
              <div style={{ fontWeight: 600, color: "#fff" }}>
                {movie.duration || "N/A"}
              </div>
            </div>

            {/* Genre */}
            <div>
              <div
                style={{
                  color: "var(--brand-text)",
                  marginBottom: "0.5rem",
                  fontSize: "0.85rem",
                }}
              >
                Genre
              </div>
              <span
                style={{
                  background: "var(--brand-dark)",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--brand-gray)",
                  fontSize: "0.8rem",
                  color: "#fff",
                }}
              >
                {movie.genre || movie.category}
              </span>
            </div>

            {/* Category */}
            <div>
              <div
                style={{
                  color: "var(--brand-text)",
                  marginBottom: "0.5rem",
                  fontSize: "0.85rem",
                }}
              >
                Category
              </div>
              <span
                style={{
                  background: "var(--brand-dark)",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--brand-gray)",
                  fontSize: "0.8rem",
                  color: "#fff",
                }}
              >
                {movie.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: "0 5%" }}>
        <FreeTrial />
      </div>
    </div>
  );
};

export default MovieDetails;
