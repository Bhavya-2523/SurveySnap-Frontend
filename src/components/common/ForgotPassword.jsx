import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/user/forgotpassword", { email });
      setMessage(response.data.message || "If an account exists, a reset link has been sent.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#141414" }}>
      <div className="p-4 rounded text-white " style={{ width: "380px", backgroundColor: "#282828", boxShadow: "0px 0px 200px rgb(255,119, 0)" }}>
        <h3 className="text-center mb-4">Forgot Password?</h3>
        <p className="text-center">Enter your email and we'll send you a reset link.</p>

        {message && <p className="text-center text-warning">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-3 bg-light"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 p-3" style={{ backgroundColor: "#FF7700",color:"#1A1A2E" }} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center mt-3">
          <Link to="/login" className="text-white fw-bold">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
