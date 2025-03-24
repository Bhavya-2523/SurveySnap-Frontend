import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams();  // Extract token from URL
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/user/resetpassword", {
        token: token,
        password: data.password,
      });

      setMessage(response.data.message || "Password reset successful. You can now login.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#141414" }}>
      <div className="p-4 rounded text-white" style={{ width: "380px", backgroundColor: "#282828", boxShadow: "0px 0px 200px rgb(255,119, 0)" }}>
        <h3 className="text-center mb-4">Reset Password</h3>
        <p className="text-center">Enter a new password for your account.</p>

        {message && <p className="text-center text-warning">{message}</p>}

        <form onSubmit={handleSubmit(submitHandler)}>
          {/* New Password Input */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control p-3 bg-light"
              placeholder="Enter new password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: {
                  value: /^(?=.*\d)(?=.*[!@#$%^&*])/,
                  message: "Must include at least one number and one special character"
                }
              })}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-100 p-3" style={{ backgroundColor: "#FF7700", color: "#1A1A2E" }} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center mt-3">
          <Link to="/login" className="text-white fw-bold">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
