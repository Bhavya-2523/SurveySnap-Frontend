import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[@$!%*?&]/.test(formData.password)) {
      newErrors.password = "Password must include letters, numbers, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      console.log("Login Data:", formData);
      setTimeout(() => {
        setLoading(false);
        alert("Login successful!");
      }, 2000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 overflow-hidden" style={{ backgroundColor: "#141414" }}>
      <div className="p-4 rounded text-white" style={{ width: "380px", backgroundColor: "#282828", boxShadow: "0px 0px 200px rgb(255,119, 0)" }}>
        <h5 className="text-center mb-4">Log In - Step Into the Light of Smarter Surveys</h5>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className={`form-control bg-transparent border border-white text-white ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ height: "38px" }}
            />
            {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className={`form-control bg-transparent border border-white text-white ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{ height: "38px", paddingRight: "40px" }}
            />
            {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" className="form-check-input bg-transparent border border-white" id="rememberMe" />
              <label className="ms-2">Remember Me</label>
            </div>
            <Link to="/forgotPassword" className="text-white">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn w-100 p-2 fw-bold" style={{ backgroundColor: "#FF7700", color: "black" }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup" className="text fw-bold" style={{color:"#FF7700"}}>Sign Up</Link>
        </p>
      </div>

      {/* Additional CSS for Styling */}
      <style>
        {`
          ::placeholder {
            color: rgba(255, 255, 255, 0.6) !important;
          }
          input:focus {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            border-color: white !important;
          }
          body {
            overflow: hidden !important;
          }
        `}
      </style>
    </div>
  );
};
