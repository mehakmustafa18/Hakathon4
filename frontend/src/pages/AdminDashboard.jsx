import { useState, useEffect } from "react";
import {
  FiUsers,
  FiVideo,
  FiDollarSign,
  FiActivity,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "../styles/Admin.css";
import api from "../context/api";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState([
    { name: "Total Users", value: "—", icon: FiUsers, color: "blue" },
    { name: "Total Videos", value: "—", icon: FiVideo, color: "green" },
    {
      name: "Active Subscriptions",
      value: "—",
      icon: FiActivity,
      color: "purple",
    },
    { name: "Monthly Revenue", value: "$—", icon: FiDollarSign, color: "red" },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, videosRes] = await Promise.all([
          api.get("/users"),
          api.get("/videos"),
        ]);

        const totalUsers = usersRes.data.length || 0;
        const totalVideos = videosRes.data.length || 0;
        const activeSubscriptions =
          usersRes.data.filter((user) => user.subscriptionPlan === "active")
            .length || 0;

        setStats([
          {
            name: "Total Users",
            value: totalUsers.toString(),
            icon: FiUsers,
            color: "blue",
          },
          {
            name: "Total Videos",
            value: totalVideos.toString(),
            icon: FiVideo,
            color: "green",
          },
          {
            name: "Active Subscriptions",
            value: activeSubscriptions.toString(),
            icon: FiActivity,
            color: "purple",
          },
          {
            name: "Monthly Revenue",
            value: `$${(activeSubscriptions * 12.99).toFixed(2)}`,
            icon: FiDollarSign,
            color: "red",
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Helper to close sidebar on link click (for mobile)
  const handleSidebarLinkClick = () => {
    if (window.innerWidth <= 768) setIsSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-icon">A</div>
          <span className="admin-sidebar-logo-text">Admin Panel</span>
        </div>
        <nav className="admin-sidebar-nav">
          <a
            href="/admin"
            className="admin-sidebar-link active"
            onClick={handleSidebarLinkClick}
          >
            <FiActivity size={20} /> Dashboard
          </a>
          <a
            href="/admin/users"
            className="admin-sidebar-link"
            onClick={handleSidebarLinkClick}
          >
            <FiUsers size={20} /> Users
          </a>
          <a
            href="/admin/videos"
            className="admin-sidebar-link"
            onClick={handleSidebarLinkClick}
          >
            <FiVideo size={20} /> Videos
          </a>
          <a
            href="/admin/subscriptions"
            className="admin-sidebar-link"
            onClick={handleSidebarLinkClick}
          >
            <FiDollarSign size={20} /> Subscriptions
          </a>
        </nav>
        <button className="admin-sidebar-logout">
          <FiActivity size={20} /> Logout
        </button>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Main content */}
      <main className="admin-main">
        {/* Hamburger button (visible only on mobile) */}
        <button className="admin-hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className="admin-page">
          <h1 className="admin-page-title">Dashboard Overview</h1>

          <div className="admin-stats-grid">
            {stats.map((stat) => (
              <div key={stat.name} className="admin-stat-card">
                <div>
                  <p className="admin-stat-label">{stat.name}</p>
                  <p className="admin-stat-value">{stat.value}</p>
                </div>
                <div className={`admin-stat-icon ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-charts-grid">
            <div className="admin-chart-placeholder">
              User Growth Chart Placeholder
            </div>
            <div className="admin-chart-placeholder">
              Revenue Chart Placeholder
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
