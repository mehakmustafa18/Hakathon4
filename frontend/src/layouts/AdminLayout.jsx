import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Admin.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar
        key={sidebarOpen ? "open" : "closed"}
        className={sidebarOpen ? "open" : ""}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="admin-main">
        <button
          className="admin-sidebar-toggle md:hidden"
          onClick={() => {
            alert("Hamburger clicked!");
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <FiMenu size={24} /> Menu
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
