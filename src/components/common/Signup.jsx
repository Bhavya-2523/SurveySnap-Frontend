import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Signup= () => {
  const navigate = useNavigate();
  const roles = [
    { id: "67c533d47b8ab59db2464e12", name: "User" },
    { id: "67c68a8f5e6040212de6457d", name: "Admin" }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const validationSchema = {
    UsernameValidator: {
      required: {
        value: true,
        message: "Username is required."
      },
      pattern: { 
        value: /^[a-zA-Z0-9_]{3,15}$/,
        message: "Username must be 3-15 characters (letters, numbers, underscores)."
      }
    },
    NameValidator: {
      required: {
        value: true,
        message: "Full name is required"
      },
      pattern: { 
        value: /^[A-Za-z\s]{3,}$/, 
        message: "Full Name must be at least 3 letters." 
      },
    },
    EmailValidator: {
      required: {
        value: true,
        message: "Email is required."
      },
      pattern: { 
        value: /^\S+@\S+\.\S+$/, 
        message: "Enter a valid email address."
      },
    },
    PhoneValidator: {
      required: {
        value: true,
        message: "Phone number is required."
      },
      pattern: { 
        value: /^[6-9]\d{9}$/, 
        message: "Enter a valid 10-digit Indian phone number (starting with 6-9)."
      },
    },
    RoleValidator: {
      required: {
        value: true,
        message: "Please select a role."
      },
    },
    PasswordValidator: {
      required: {
        value: true,
        message: "Password is required"
      },
      minLength: { 
        value: 8, 
        message: "Password must be at least 8 characters." 
      },
      pattern: { 
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Must include letters, numbers, and special characters." 
      },
    },
    ConfirmPasswordValidator: {
      required: {
        value: true,
        message: "Confirm Password is required."
      },
      validate: value => 
        value === watch('password') || "Passwords do not match"
    },
    AgreeToTermsValidator: {
      required: {
        value: true,
        message: "You must agree to the Terms & Conditions."
      },
    }
  };

  const submitHandler = async (data) => {
    try {
      // Set the roleId to the "User" role (as per the roles array)
      const userRoleId = roles.find(role => role.name === "User").id;
      const requestData = {
        ...data,
        roleId: userRoleId, // Automatically set role to "User"
      };

      const res = await axios.post("/user", requestData);
      if (res.status === 201) {
        toast.success('Registration Successful!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-center",
        theme: "dark"
      });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 form-page" style={{ backgroundColor: "#141414" }}>
      <div className="d-flex p-4 rounded text-white form-container overflow-hidden">
        <h5 className="text-center mb-4">Sign Up - Step Into the Light of Smarter Surveys</h5>

        <form onSubmit={handleSubmit(submitHandler)}>
          <ToastContainer
            position="top-center"
            autoClose={5000}
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
          <div className="form-scroll">
            <div className="mb-3">
              <input
                type="text"
                className={`form-control bg-transparent border border-white text-white ${errors.userName ? "is-invalid" : ""}`}
                placeholder="Username"
                {...register("userName", validationSchema.UsernameValidator)}
              />
              <span style={{color:"red"}}>{errors.userName?.message}</span>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className={`form-control bg-transparent border border-white text-white ${errors.fullName ? "is-invalid" : ""}`}
                placeholder="Full Name"
                {...register("fullName", validationSchema.NameValidator)}
              />
              <span style={{color:"red"}}>{errors.fullName?.message}</span>
            </div>

            <div className="mb-3">
              <input
                type="email"
                className={`form-control bg-transparent border border-white text-white ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email"
                {...register("email", validationSchema.EmailValidator)}
              />
              <span style={{color:"red"}}>{errors.email?.message}</span>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className={`form-control bg-transparent border border-white text-white ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Phone Number"
                {...register("phone", validationSchema.PhoneValidator)}
              />
              <span style={{color:"red"}}>{errors.phone?.message}</span>
            </div>

            {/* <div className="mb-3">
              <select
                {...register("roleId", validationSchema.RoleValidator)}
                className={`form-select custom-dropdown ${errors.roleId ? "is-invalid" : ""}`}
              >
                <option value="" disabled style={{backgroundColor:"#282828",color:"white"}}>
                  Select Role
                </option>
                {roles.map((role) => (
                  <option
                    key={role.id}
                    value={role.id}
                    style={{backgroundColor:"#282828",color:"white"}}
                  >
                    {role.name}
                  </option>
                ))}
              </select>
              <span style={{color:"red"}}>{errors.roleId?.message}</span>
            </div> */}

            <div className="mb-3">
              <input
                type="password"
                className={`form-control bg-transparent border border-white text-white ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
                {...register("password", validationSchema.PasswordValidator)}
              />
              <span style={{color:"red"}}>{errors.password?.message}</span>
            </div>

            <div className="mb-3">
              <input
                type="password"
                className={`form-control bg-transparent border border-white text-white ${errors.confirmPassword ? "is-invalid" : ""}`}
                placeholder="Confirm Password"
                {...register("confirmPassword", validationSchema.ConfirmPasswordValidator)}
              />
              <span style={{color:"red"}}>{errors.confirmPassword?.message}</span>
            </div>
          </div>

          <div className="form-footer">
            <div className="d-flex align-items-center mb-1">
              <input
                type="checkbox"
                className={`form-check-input me-2 bg-transparent ${errors.agreeToTerms ? "is-invalid" : ""}`}
                {...register("agreeToTerms", validationSchema.AgreeToTermsValidator)}
              />
              <label className="form-check-label mb-0">
                I agree to the Terms & Conditions
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100 p-2 fw-bold"
              style={{backgroundColor:"#FF7700",color:"black"}}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="text-center mt-2">
              <small className="text-white">
                Already a user?{" "}
                <Link to="/login" className="fw-bold" style={{color:"#FF7700"}}>
                  Log In
                </Link>
              </small>
            </div>
          </div>
        </form>
      </div>

      <style>
        {`
          html, body {
            overflow: hidden;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          ::placeholder { color: rgba(255, 255, 255, 0.6) !important; }
          input:focus, select:focus {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            border-color: white !important;
          }

          .form-container {
            width: 380px;
            background-color: #282828;
            box-shadow: 0px 0px 200px rgb(255,119, 0);
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .form-scroll {
            max-height: 50vh;
            overflow-y: auto;
            padding-right: 10px;
            margin-bottom: 10px;
          }

          .form-scroll::-webkit-scrollbar {
            width: 3px;
          }

          .form-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }

          .form-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
          }

          .custom-dropdown {
            background-color: transparent !important;
            border: 1px solid white;
            color: white !important;
          }

          .form-footer {
            position: sticky;
            bottom: 0;
            background: #282828;
            padding-top: 10px;
          }
        `}
      </style>
    </div>
  );
};