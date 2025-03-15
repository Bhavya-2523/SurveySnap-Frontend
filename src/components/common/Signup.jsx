import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const Signup= () => {

   

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const validationSchema={
    UsernameValidator:{
        required:{
            value:true,
            message : "Username is required."
              
        },pattern: { 
            value: /^[a-zA-Z0-9_]{3,15}$/,
            message: "Username must be 3-15 characters (letters, numbers, underscores)."
         }
    },
    NameValidator:{
        required:{
            value: true,
            message:"Full name is required"
        },
        pattern: { 
            value: /^[A-Za-z\s]{3,}$/, 
            message: "Full Name must be at least 3 letters." 
        },
    },
    EmailValidator:{
        required:{
            value: true,
            message:"Email is required."
        },
        pattern: { 
            value: /^\S+@\S+\.\S+$/, 
            message: "Enter a valid email address."
        },
    },
    PhoneValidator:{
        required:{
            value: true,
            message:"Phone number is required."
        },
        pattern: { 
            value: /^[6-9]\d{9}$/, 
            message: "Enter a valid 10-digit Indian phone number (starting with 6-9)."
        },
    },
    RoleValidator:{
        required:{
            value: true,
            message:"Please select a role."
        },
    },
    PasswordValidator:{
        required:{
            value:true,
            message:"Password is required"
        },
        minLength: { 
            value: 8, 
            message: "Password must be at least 8 characters." 
        },
        pattern: { 
            value: /[A-Za-z]/ && /[0-9]/ && /[@$!%*?&]/, 
            message: "Password must include letters, numbers, and a special character." 
        },
    },
    ConfirmPasswordValidator:{
        required:{
            value: true,
            message:"Confirm Password is required."
        },
    },
    AgreeToTermsValidator:{
        required:{
            value: true,
            message:"You must agree to the Terms & Conditions."
        },
    }
};

const onSubmit = (data) => {
    console.log("Sign-Up Data:", data);
    setTimeout(() => {
      alert("Sign-up successful!");
    }, 2000);
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 form-page" style={{ backgroundColor: "#141414" }}>
      <div className="d-flex p-4 rounded text-white form-container overflow-hidden ">
        <h5 className="text-center mb-4">Sign Up - Step Into the Light of Smarter Surveys</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-scroll">
            <div className="mb-3">
              <input
                type="text"
                name="username"
                className={`form-control bg-transparent border border-white text-white ${errors.username ? "is-invalid" : ""}`}
                placeholder="Username"
                {...register("username",validationSchema.UsernameValidator)}
              />
                <span style={{color:"red"}}>
                    {
                        errors.username?.message
                    }
                </span>            
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="fullname"
                className={`form-control bg-transparent border border-white text-white ${errors.fullname ? "is-invalid" : ""}`}
                placeholder="Full Name"
                {...register("fullname",validationSchema.NameValidator)}
              />
                <span style={{color:"red"}}>
                    {
                        errors.fullname?.message
                    }
                </span> 
                        </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className={`form-control bg-transparent border border-white text-white ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email"
                {...register("email",validationSchema.EmailValidator)}
              />
              <span style={{color:"red"}}>
                    {
                        errors.email?.message
                    }
                </span> 
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="phone"
                className={`form-control bg-transparent border border-white text-white ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Phone Number"
                {...register("phone",validationSchema.PhoneValidator)}
              />
              <span style={{color:"red"}}>
                    {
                        errors.phone?.message
                    }
                </span> 
            </div>

            <div className="mb-3">
              <select {...register("role",validationSchema.RoleValidator)} className={`form-select custom-dropdown  ${errors.role ? "is-invalid" : ""}`} >
                <option value="" disabled  style={{backgroundColor:"#282828",color:"white"}}>Select Role</option>
                <option value="admin" style={{backgroundColor:"#282828",color:"white"}}>Admin</option>
                <option value="creator"  style={{backgroundColor:"#282828",color:"white"}}>Survey Creator</option>
                <option value="respondent" style={{backgroundColor:"#282828",color:"white"}}>Respondent</option>
              </select>
              <span style={{color:"red"}}>
                    {
                        errors.role?.message
                    }
                </span> 
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className={`form-control bg-transparent border border-white text-white ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
                {...register("password",validationSchema.PasswordValidator)}
              />
              <span style={{color:"red"}}>
                    {
                        errors.password?.message
                    }
                </span> 
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                className={`form-control bg-transparent border border-white text-white ${errors.confirmPassword ? "is-invalid" : ""}`}
                {...register("confirmPassword", validationSchema.ConfirmPasswordValidator)}
                placeholder="Confirm Password"
              />
              <span style={{color:"red"}}>
                    {
                        errors.confirmPassword?.message
                    }
                </span> 
            </div>
          </div>

          <div className="form-footer">
                <div className="d-flex align-items-center mb-1">
                <input 
                type="checkbox" 
                name="agreeToTerms" 
                {...register("agreeToTerms",validationSchema.AgreeToTermsValidator)}
                className={`form-check-input me-2 bg-transparent ${errors.agreeToTerms ? "is-invalid" : ""}`} />
                <label htmlFor="agreeToTerms" className="form-check-label mb-0">
                I agree to the Terms & Conditions
                </label>
                {/* <span style={{color:"red"}}>
                        {
                            errors.agreeToTerms?.message
                        }
                    </span>  */}
                </div>

                <button type="submit" className="btn w-100 p-2 fw-bold " style={{backgroundColor:"#FF7700",color:"black"}}  disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>

                <div className="text-center ">
                <small className="text-white">
                Already a user? <a href="/login" className="text fw-bold" style={{color:"#FF7700"}}>Log In</a>
                </small>
                </div>
          </div>
        </form>
      </div>

      <style>
        {`
          /* Hide scrollbar for the entire page */
          html, body {
            overflow: hidden;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          ::placeholder { color: rgba(255, 255, 255, 0.6) !important; }
          input:focus, select:focus { box-shadow: 0 0 5px rgba(255, 255, 255, 0.8); border-color: white !important; }

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

          .form-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.8);
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

          .submit-btn {
            background-color: #FF7700;
            color: black;
          }
        `}
      </style>
    </div>
  );
};
