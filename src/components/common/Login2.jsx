// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Login2 = () => {

    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    data.roleId = "67c533d47b8ab59db2464e12"; 

      const res = await axios.post("/user/login", data);
      console.log("Response:", res.data);
      
      if (res.status === 200) {
        // alert("Login successful!");
        toast.success('Login succesful!', {
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
        localStorage.setItem("id",res.data.data._id)
        localStorage.setItem("role",res.data.data.roleId.name)

        if(res.data.data.roleId.name === "USER"){
            setTimeout(()=>
                {navigate("/user")},3000)
            //check in app.js
          }

      } else {
        alert("Login failed! Check your credentials.");
      }
}
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
    
    <div className="d-flex justify-content-center align-items-center vh-100 overflow-hidden" style={{ backgroundColor: "#141414" }}>
      <div className="p-4 rounded text-white" style={{ width: "380px", backgroundColor: "#282828",boxShadow: "0px 0px 200px rgb(255,119, 0)"}}>
        <h5 className="text-center mb-4">Log In - Step Into the Light of Smarter Surveys</h5>

        <form onSubmit={handleSubmit(submitHandler)}>
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        />
          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              className={`form-control bg-transparent border border-white text-white ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              {...register("email", validationSchema.EmailValidator)}
            />
            {errors.email && <div className="text-danger mt-1">{errors.email.message}</div>}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control bg-transparent border border-white text-white ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              {...register("password", validationSchema.PasswordValidator)}
            />
            {errors.password && <div className="text-danger mt-1">{errors.password.message}</div>}
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
          <button type="submit" className="btn w-100 p-2 fw-bold" style={{ backgroundColor: "#FF7700", color: "black" }} disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signUp" className="text fw-bold" style={{ color: "#FF7700" }}>Sign Up</Link>
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
