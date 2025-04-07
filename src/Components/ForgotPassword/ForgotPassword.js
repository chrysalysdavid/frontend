import React, { useState } from "react";
import "./ForgotPassword.scss";
import { forgotPassword } from "../../Services/apiservice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = { email };
      const response = await forgotPassword(data);
      setMessage(response.message);
      setLoading(false);
    } catch (error) {
      setMessage("An error occurred while requesting the password reset.");
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-wrapper shadow rounded-4">
      <h2 className="forgot-password-title font-fam">Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button
          type="submit"
          className="forgot-password-button"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <div className="form-footer my-2">
        <span>Remember your password? </span> <br />
        <a href="#" className="login-link" onClick={() => navigate("/login")}>
          Log In
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
