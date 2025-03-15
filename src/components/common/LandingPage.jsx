import React from "react";
import { Link } from "react-router-dom";
import "../../assets/surveysnap.css";

const LandingPage = () => {
  return (
    <div className="app-wrapper">
      <div className="hero_area">
        {/* Header Section */}
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand" href="/">
                <span>SurveySnap</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="s-1"></span>
                <span className="s-2"></span>
                <span className="s-3"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="quote_btn-container">
                  <div className="btn-box">
                    <Link to="/login" className="btn-1">Login</Link>
                    <Link to="/signup" className="btn-2">Sign Up</Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="slider_section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="detail_box">
                  <h1>Effortless Survey Creation & Analysis</h1>
                  <p>Create, share, and analyze surveys in minutes with SurveySnap. Gain valuable insights effortlessly.</p>
                  <div className="btn-box">
                    <Link to="/survey/addSurvey" className="btn-1">Create a Survey</Link>
                    <Link to="/browse-surveys" className="btn-2">Browse Surveys</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about_section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>About SurveySnap</h2>
                  </div>
                  <p>
                    SurveySnap is an intuitive survey management platform designed
                    to help businesses and researchers collect feedback efficiently.
                    Create customized surveys, analyze responses in real-time, and
                    make informed decisions effortlessly.
                  </p>
                  <Link to="/about">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer>
        &copy; {new Date().getFullYear()} SurveySnap. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
