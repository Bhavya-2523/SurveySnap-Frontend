import React from "react";
import "./Contact.css";
import { Link } from "react-router-dom";

export const ContactPage = () => {
  return (
    <div className="contactpage bg-dark text-white py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-3">Get in Touch</h1>
          <p className="lead text-secondary">
            We'd love to hear from you. Reach out with any questions or feedback.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <form className="bg-black p-4 rounded shadow">
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">Email</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  id="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label text-white">Message</label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  id="message"
                  rows="5"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <div className="d-flex gap-3 flex-wrap">
                <button type="submit" className="btn text-white" style={{ backgroundColor: "#ff7700" }}>
                  Send Message
                </button>
                <Link to="/home" className="btn border-0 text-white" style={{ backgroundColor: "#2c2c2c" }}>
                  <i className="bi bi-arrow-left" style={{ color: "#ff7700" }}></i> Back to Home
                </Link>
              </div>
            </form>
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="bg-black p-4 rounded shadow h-100">
              <h4 className="text-white mb-3">Contact Information</h4>
              <p className="text-secondary mb-2">
                <i className="bi bi-envelope-fill me-2" style={{ color: "#ff7700" }}></i>
                support@surveysnap.ai
              </p>
              <p className="text-secondary mb-2">
                <i className="bi bi-phone-fill me-2" style={{ color: "#ff7700" }}></i>
                +1 (800) 123-4567
              </p>
              <p className="text-secondary">
                <i className="bi bi-geo-alt-fill me-2" style={{ color: "#ff7700" }}></i>
                123 AI Avenue, San Francisco, CA
              </p>
              <hr className="border-secondary my-4" />
              <p className="text-secondary small">Available Monday to Friday, 9AM - 6PM PST.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
