import React, { useState } from "react";
import "./Login.scss";
import "../Styles/Styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../Services/apiservice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null); // Add the error state

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const role = "customer";

    loginUser(username, password, role)
      .then((response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.user.role);

        navigate("/CustomerDashboard");
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError(error); // Set the error state
      });
  };

  return (
    <div className="login-wrapper shadow rounded-4">
      <h2 className="login-title font-fam">Sign In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Username or Email Address *"
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
          <div className="d-flex justify-content-end pt-1">
            <a
              href="#"
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </a>
          </div>
        </div>

        {/* Display error message if error exists */}
        {error && (
          <div className="text-center text-danger">
            {error?.response?.data?.detail ||
              "An error occurred. Please try again."}
          </div>
        )}

        <div className="form-group form-remember">
          <input type="checkbox" id="remember-me" name="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
        <div className="form-footer">
          <span>Not a member yet?</span>
          <br />
          <a
            href="#"
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Signup now
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
