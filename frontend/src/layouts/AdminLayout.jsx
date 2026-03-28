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
      />
      <main className="admin-main">
        <button
          className="admin-sidebar-toggle md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
