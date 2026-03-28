import { Link, useLocation } from "react-router-dom";
import { FiLayout, FiUsers, FiVideo, FiLogOut, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = ({ className, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: FiLayout },
    { name: "User Management", path: "/admin/users", icon: FiUsers },
    { name: "Video Management", path: "/admin/videos", icon: FiVideo },
  ];

  return (
    <div className={`admin-sidebar ${className}`}>
      <button className="admin-sidebar-close md:hidden" onClick={onClose}>
        <FiX size={24} />
      </button>
      <Link to="/" className="admin-sidebar-logo">
        <div className="admin-sidebar-logo-icon">SV</div>
        <span className="admin-sidebar-logo-text">Admin Panel</span>
      </Link>

      <nav className="admin-sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`admin-sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <button className="admin-sidebar-logout" onClick={logout}>
        <FiLogOut size={20} />
        <span>Logout Admin</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
