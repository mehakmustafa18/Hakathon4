import { Link, useLocation } from "react-router-dom";
import { FiLayout, FiUsers, FiVideo, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: FiLayout },
    { name: "User Management", path: "/admin/users", icon: FiUsers },
    { name: "Video Management", path: "/admin/videos", icon: FiVideo },
  ];

  return (
    <div className="admin-sidebar">
      <Link to="/" className="admin-sidebar-logo">
        <div className="admin-sidebar-logo-icon">SV</div>
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
