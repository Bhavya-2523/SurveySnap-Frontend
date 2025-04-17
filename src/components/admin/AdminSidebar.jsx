import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";

export const AdminSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} />

      {/* Sidebar and Main Content */}
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        {/* Sidebar */}
        <aside
          className={`app-sidebar shadow ${isSidebarOpen ? "open" : "d-none"}`}
          style={{
            width: "250px",
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#282828", // Dark gray background
            color: "#ff7700", // Orange text color
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          
          <div
            style={{
              marginRight: "-16px",
              marginBottom: "-16px",
              marginLeft: 0,
              top: "-8px",
              right: "auto",
              left: "-8px",
              width: "calc(100% + 16px)",
              padding: 8,
            }}
          >
            <nav className="mt-2">
              <ul
                className="nav sidebar-menu flex-column"
                data-lte-toggle="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item menu-open">
                  <Link to="/admin/profile" className="nav-link active" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-speedometer" />
                    <p>
                      Profile
                    </p>
                  </Link>
                  <Link to="/admin/dashboard" className="nav-link active" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-speedometer" />
                    <p>
                      Dashboard
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/admin/UserManage" className="nav-link active" style={{ color: "#ff7700" }}>
                        <i className="nav-icon bi bi-speedometer" />
                        <p>
                          User Management
                        </p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/admin/SurveyManage" className="nav-link" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-box-seam-fill" />
                    <p>
                      Survey Management 
                      
                    </p>
                  </Link>
                  </li>
                <li className="nav-item">
                  <Link to="/admin/analytics" className="nav-link" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-box-seam-fill" />
                    <p>
                      Analytics
                    </p>
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
    overflowY: "auto",
    padding: "0px",
    backgroundColor: "black",  // Darker orange that pairs with #ff7700
  }}
>
  <Outlet />
</main>

      </div>
    </div>
  );
};