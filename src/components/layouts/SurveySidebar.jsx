import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SurveyNavbar } from "./SurveyNavbar";

export const SurveySidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <SurveyNavbar toggleSidebar={toggleSidebar} />

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
                  <Link to="/survey/addSurvey" className="nav-link active" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-speedometer" />
                    <p>
                      Add Survey
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/survey/mysurveys" className="nav-link active" style={{ color: "#ff7700" }}>
                        <i className="nav-icon bi bi-speedometer" />
                        <p>
                          View My Survey
                          <i className="nav-arrow bi bi-chevron-right" />
                        </p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link" style={{ color: "#ff7700" }}>
                    <i className="nav-icon bi bi-box-seam-fill" />
                    <p>
                      Widgets
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./widgets/small-box.html" className="nav-link" style={{ color: "#ff7700" }}>
                        <i className="nav-icon bi bi-circle" />
                        <p>Small Box</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./widgets/info-box.html" className="nav-link" style={{ color: "#ff7700" }}>
                        <i className="nav-icon bi bi-circle" />
                        <p>info Box</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./widgets/cards.html" className="nav-link" style={{ color: "#ff7700" }}>
                        <i className="nav-icon bi bi-circle" />
                        <p>Cards</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="app-main"
          style={{ flex: 1, overflowY: "auto", padding: "0px" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};