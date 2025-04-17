import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";

export const AdminSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden", // 🚫 No scrollbars on the whole layout
      }}
    >
      {/* Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} />

      {/* Sidebar and Main Content */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden", // 🚫 No scrollbars on layout area
        }}
      >
        {/* Sidebar */}
        <aside
          className={`app-sidebar shadow ${isSidebarOpen ? "open" : "d-none"}`}
          style={{
            width: "250px",
            backgroundColor: "#282828",
            color: "#ff7700",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            flexShrink: 0,
            overflow: "hidden", // 🚫 No scrollbars in sidebar
          }}
        >
          <div style={{ padding: "8px" }}>
            <nav className="mt-2">
              <ul className="nav sidebar-menu flex-column" role="menu">
                <li className="nav-item menu-open">
                  <Link to="/admin/profile" className="nav-link active" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-speedometer" />
                    <p>Profile</p>
                  </Link>
                  <Link to="/admin/dashboard" className="nav-link active" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-speedometer" />
                    <p>Dashboard</p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/admin/UserManage" className="nav-link active" style={{ color: "#ff7700" }}>
                        <i className="nav-icon bi bi-speedometer" />
                        <p>User Management</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/admin/SurveyManage" className="nav-link" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-box-seam-fill" />
                    <p>Survey Management</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/analytics" className="nav-link" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-box-seam-fill" />
                    <p>Analytics</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="app-main"
          style={{
            flex: 1,
            backgroundColor: "black",
            overflow: "hidden", // 🚫 No scrollbars in main content
            padding: 0,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
