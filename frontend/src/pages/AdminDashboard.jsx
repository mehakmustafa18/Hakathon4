import { useState, useEffect } from "react";
import { FiUsers, FiVideo, FiDollarSign, FiActivity } from "react-icons/fi";
import api from "../context/api";

const AdminDashboard = () => {
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
        // Fetch users and videos in parallel
        const [usersRes, videosRes] = await Promise.all([
          api.get("/users"),
          api.get("/videos"),
        ]);

        const totalUsers = usersRes.data.length || 0;
        const totalVideos = videosRes.data.length || 0;

        // Calculate active subscriptions (users with active subscription)
        const activeSubscriptions =
          usersRes.data.filter((user) => user.subscriptionPlan === "active")
            .length || 0;

        // Update stats with real data
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

  return (
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
        <div className="admin-chart-placeholder">Revenue Chart Placeholder</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
