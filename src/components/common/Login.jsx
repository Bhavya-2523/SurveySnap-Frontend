import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberFlag = localStorage.getItem("rememberMe");

    if (rememberedEmail && rememberFlag === "true") {
      setSavedEmail(rememberedEmail);
      setRememberMe(true);
      setValue("email", rememberedEmail); // Pre-fill email field
    }
  }, [setValue]);

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log("Response:", res.data);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.setItem("rememberMe", "false");
      }

      if (res.status === 200) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        const userData = res.data.data;
        const role = userData.roleId?.name;

        // Store user session info
        localStorage.setItem("id", userData._id);
        localStorage.setItem("role", role);

        // Navigate based on role
        setTimeout(() => {
          switch (role) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "user":
              navigate("/user");
              break;
           
            default:
              navigate("/dashboard");
          }
        }, 3000);
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg === "Invalid password") {
        toast.error("Please enter a valid password.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
      } else if (msg === "Email not found") {
        toast.error("Email not found.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error("Login failed! Try again.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  const validationSchema = {
    EmailValidator: {
      required: {
        value: true,
        message: "Email is required.",
      },
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Enter a valid email address.",
      },
    },
    PasswordValidator: {
      required: {
        value: true,
        message: "Password is required.",
      },
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters.",
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        message: "Password must include letters, numbers, and a special character.",
      },
    },
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 overflow-hidden"
      style={{ backgroundColor: "#141414" }}
    >
      <div
        className="p-4 rounded text-white"
        style={{
          width: "380px",
          backgroundColor: "#282828",
          boxShadow: "0px 0px 200px rgb(255,119, 0)",
        }}
      >
        <h5 className="text-center mb-4">
          Log In - Step Into the Light of Smarter Surveys
        </h5>

        <form onSubmit={handleSubmit(submitHandler)}>
          <ToastContainer />

          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              defaultValue={savedEmail}
              className={`form-control bg-transparent border border-white text-white ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              {...register("email", validationSchema.EmailValidator)}
            />
            {errors.email && (
              <div className="text-danger mt-1">{errors.email.message}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control bg-transparent border border-white text-white ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              {...register("password", validationSchema.PasswordValidator)}
            />
            {errors.password && (
              <div className="text-danger mt-1">{errors.password.message}</div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input
                type="checkbox"
                className="form-check-input bg-transparent border border-white"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="ms-2" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <Link to="/forgotPassword" className="text-white">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100 p-2 fw-bold"
            style={{ backgroundColor: "#FF7700", color: "black" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signUp" className="text fw-bold" style={{ color: "#FF7700" }}>
            Sign Up
          </Link>
        </p>
      </div>

      {/* Inline Styling */}
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
