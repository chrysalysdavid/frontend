import "../Styles/Styles.scss";
import React, { useState } from "react";
import "./ArtistPortal.scss";
import { registerUser, loginUser } from "../../Services/apiservice";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ArtistPortal() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    loginEmail: "",
    loginPassword: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    registerPasswordVisible: false,
    loginPasswordVisible: false,
  });

  const [messages, setMessages] = useState({
    error: "",
    success: "",
    loginError: "",
    loginSuccess: "",
  });

  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  const toggleRegisterPasswordVisibility = () => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      registerPasswordVisible: !prevState.registerPasswordVisible,
    }));
  };

  const toggleLoginPasswordVisibility = () => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      loginPasswordVisible: !prevState.loginPasswordVisible,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    try {
      await registerUser(formData.email, formData.password);
      setMessages({ error: "", success: "Registration successful!" });
    } catch (error) {
      setMessages({
        error: error?.response?.data?.detail,
        success: "",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const data = await loginUser(formData.loginEmail, formData.loginPassword);

      if (data.user.is_active) {
        setMessages({
          loginError: "",
          loginSuccess: "Login successful! Redirecting...",
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: data.user.id,
            email: data.user.email,
            name: data.user.username,
          })
        );

        navigate("/ArtistDashboard/ManageArtwork");
      } else {
        setMessages({
          loginError: "Your account is not active.",
          loginSuccess: "",
        });
      }
    } catch (error) {
      setMessages({
        loginError: error?.response?.data?.detail,
        loginSuccess: "",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <div className="bg-banner">
        <div className="headingPosition">
          <h1 className="text-white font-fam titleSizeA">
            ARTIST REGISTRATION
          </h1>
        </div>
      </div>
      <div className="register_econ">
        {/* Register Form */}
        <div className="register-form shadow">
          <h2 className="hradlinen font-fam">REGISTER AS AN ARTIST</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                required
                placeholder="First Name *"
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                required
                placeholder="Last Name *"
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email Address *"
                onChange={handleInputChange}
                required
              />
              <div className="password-field">
                <input
                  type={
                    passwordVisibility.registerPasswordVisible
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  placeholder="Password *"
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={toggleRegisterPasswordVisibility}
                >
                  <FontAwesomeIcon
                    className="pass-eye"
                    icon={
                      passwordVisibility.registerPasswordVisible
                        ? faEyeSlash
                        : faEye
                    }
                  />
                </span>
              </div>
              <div className="password-field">
                <input
                  type={
                    passwordVisibility.registerPasswordVisible
                      ? "text"
                      : "password"
                  }
                  name="confirm_password"
                  value={formData.confirm_password}
                  placeholder="Confirm Password *"
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={toggleRegisterPasswordVisibility}
                >
                  <FontAwesomeIcon
                    className="pass-eye"
                    icon={
                      passwordVisibility.registerPasswordVisible
                        ? faEyeSlash
                        : faEye
                    }
                  />
                </span>
              </div>
            </div>
            {messages.error && <p className="text-danger ">{messages.error}</p>}
            {messages.success && (
              <p className="text-success">{messages.success}</p>
            )}
            <button type="submit" className="btn-register py-2" disabled={registerLoading}>
              {registerLoading ? "Loading..." : "REGISTER"}
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="login-form shadow">
          <h2 className="hradline font-fam">LOGIN IF YOU ALREADY REGISTERED</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                name="loginEmail"
                value={formData.loginEmail}
                placeholder="Email Address *"
                onChange={handleInputChange}
                required
              />
              <div className="password-field">
                <input
                  type={
                    passwordVisibility.loginPasswordVisible
                      ? "text"
                      : "password"
                  }
                  name="loginPassword"
                  value={formData.loginPassword}
                  placeholder="Password *"
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={toggleLoginPasswordVisibility}
                >
                  <FontAwesomeIcon
                    className="pass-eye"
                    icon={
                      passwordVisibility.loginPasswordVisible
                        ? faEyeSlash
                        : faEye
                    }
                  />
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <div className="gap-2 d-flex align-items-center pb-4">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            {messages.loginError && (
              <p className="text-danger">{messages.loginError}</p>
            )}
            {messages.loginSuccess && (
              <p className="text-success">{messages.loginSuccess}</p>
            )}
            <button type="submit" className="btn-login py-2" disabled={loginLoading}>
              {loginLoading ? "Loading..." : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
