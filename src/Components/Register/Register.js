import React, { useState } from "react";
import "./Register.scss"; // Assuming you have a similar styling file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerCustomer } from "../../Services/apiservice"; // New function
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await registerCustomer(
        firstName,
        lastName,
        email,
        password
      );
      console.log("Registration response:", response);

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Registration error:", error.response.data.detail);
      setError(error);
    }
  };

  return (
    <div className="register-wrapper rounded-4 shadow">
      <h2 className="register-title font-fam">REGISTER</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="first_name"
            name="first_name"
            required
            placeholder="First Name *"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="last_name"
            name="last_name"
            required
            placeholder="Last Name *"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email Address *"
          />
        </div>
        <div className="form-group">
          <div className="password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Password *"
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                className="pass-eye"
                icon={passwordVisible ? faEyeSlash : faEye}
              />
            </span>
          </div>
        </div>
        <div className="form-group">
          <div className="password-field">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              required
              placeholder="Confirm Password *"
            />
            <span
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon
                className="pass-eye"
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
              />
            </span>
          </div>
        </div>
        {error && (
          <div className="text-center text-danger py-2">
            {error?.response?.data?.detail ||
              "An error occurred. Please try again."}
          </div>
        )}
        <button type="submit" className="register-button">
          Register
        </button>
        <div className="form-footer">
          <span>Already a member?</span>
          <br />
          <a href="#" className="login-link" onClick={() => navigate("/login")}>
            Log In
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
