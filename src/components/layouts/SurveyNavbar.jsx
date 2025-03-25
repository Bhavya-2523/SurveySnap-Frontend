import React from "react";
import { useNavigate } from "react-router-dom";

export const SurveyNavbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
  // localStorage.removeItem("authToken");
  // localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  sessionStorage.clear();
  navigate("/login"); 
  };


  return (
    <nav
      className="app-header navbar navbar-expand"
      style={{
        backgroundColor: "#282828",
        color: "#ff7700",
      }}
    >
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              role="button"
              style={{
                color: "#ff7700", // Orange text color
                padding: "2.5px 2px",
                backgroundColor: "#282828", // Dark gray background
              }}
              onClick={toggleSidebar}
            >
              {/* Hamburger Menu Icon */}
              <i
                className="bi bi-list"
                style={{ fontSize: "25px", color: "#ff7700" }}
              />
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a
              href="#"
              className="nav-link"
              style={{
                color: "#ff7700",
                // fontFamily: "'Micro 5', sans-serif",
                fontFamily: "'Cinzel', serif", 
                fontSize: "1.5rem", // Larger font size
                // fontWeight: "bold", // Bold text
                textTransform: "uppercase", // Uppercase text
                marginTop: "-6.5px", // Adjust vertical alignment
                
              }}
            >
              SurveySnap
            </a>
          </li>
        </ul>

        {/* Move "Home" and "Contact" to the right corner */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link" style={{ color: "#ff7700" }}>
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link" style={{ color: "#ff7700" }}>
              Contact
            </a>
          </li>
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
              style={{ color: "#ff7700" }}
            >
              <i className="bi bi-search" />
            </a>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-danger"
              onClick = {handleLogout}

              style={{
                backgroundColor: "#ff7700", // Orange background
                color: "#282828", // Dark gray text
                border: "none",
              }}
            >
             LOGOUT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};