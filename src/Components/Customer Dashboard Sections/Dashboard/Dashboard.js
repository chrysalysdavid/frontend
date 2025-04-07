import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div>
      <div className="content bg-white p-2 rounded">
        <p>
          Hello{" "}
          <strong className="font-fam">
            {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
          </strong>{" "}
          (not{" "}
          <strong className="font-fam">
            {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
          </strong>
          ?{" "}
          <a href="#" onClick={handleLogout}>
            Log out
          </a>
          )
        </p>
        <p>
          From your account dashboard you can view your
          <a href="https://chrysalys.art/my-account/orders"> recent orders</a>,
          manage your{" "}
          <a href="https://chrysalys.art/my-account/edit-address">
            shipping and billing addresses
          </a>
          , and{" "}
          <a href="https://chrysalys.art/my-account/edit-account">
            edit your password and account details
          </a>
          .
        </p>
      </div>
    </div>
  );
}
