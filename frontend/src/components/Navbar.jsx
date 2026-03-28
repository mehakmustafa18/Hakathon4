import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on location change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies & Shows", path: "/movies" },
    { name: "Support", path: "/support" },
    { name: "Subscriptions", path: "/subscriptions" },
  ];

  return (
    <nav className="navbar">
      {/* Logo with Vector Icon */}
      <Link to="/" className="navbar-logo">
        <img
          src="/Vector.png"
          alt=""
          className="w-8 h-8 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/32?text=V";
          }}
        />
        <span className="text-xl font-bold tracking-tight text-white">
          StreamVibe
        </span>
      </Link>

      {/* Nav Links - Desktop */}
      <div className="navbar-links">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar-link ${location.pathname === link.path ? "active" : ""}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="navbar-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Action Icons */}
      <div className="navbar-actions hidden md:flex">
        <button className="navbar-action">
          <FiSearch size={22} />
        </button>
        <button className="navbar-action">
          <FiBell size={22} />
        </button>

        {user ? (
          <div className="navbar-user-wrapper" ref={dropdownRef}>
            <div
              className={`navbar-user-btn ${isDropdownOpen ? "active" : ""}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FiUser size={20} />
            </div>

            {isDropdownOpen && (
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-header">
                  <p className="navbar-dropdown-name">{user.name}</p>
                  <p className="navbar-dropdown-role">
                    {user.role?.replace("_", " ") || "User"}
                  </p>
                </div>
                {user.role === "super_admin" && (
                  <Link to="/admin" className="navbar-dropdown-item">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="navbar-dropdown-item navbar-dropdown-logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button className="py-2 px-5 h-10 text-sm">Login</Button>
          </Link>
        )}
      </div>

      {/* Mobile Links */}
      <div className={`navbar-links-mobile ${isMobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar-link ${location.pathname === link.path ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
