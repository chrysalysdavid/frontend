import React, { useState, useEffect } from "react";
import "./CustomerDash.scss";
import Dashboard from "../Customer Dashboard Sections/Dashboard/Dashboard";
import Order from "../Customer Dashboard Sections/Orders/Order";
import Download from "../Customer Dashboard Sections/Download/download";
import Address from "../Customer Dashboard Sections/Addresses/Address";
import Payment from "../Customer Dashboard Sections/Payment Methods/Payment";
import AccountDetail from "../Customer Dashboard Sections/Account Detail/Account";
import { useNavigate } from "react-router-dom";

import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingCart,
  MdOutlineCloudDownload,
  MdOutlineLocationOn,
  MdPayment,
  MdOutlinePerson,
  MdOutlineLogout,
} from "react-icons/md";
import { fetchCustomerAccount } from "../../Services/apiservice"; // Assuming this API exists

export default function CustomerDash() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState(null); // State to hold user info
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard /> },
    { id: "orders", label: "Orders", icon: <MdOutlineShoppingCart /> },
    { id: "downloads", label: "Downloads", icon: <MdOutlineCloudDownload /> },
    { id: "addresses", label: "Addresses", icon: <MdOutlineLocationOn /> },
    { id: "payment", label: "Payment methods", icon: <MdPayment /> },
    { id: "account", label: "Account details", icon: <MdOutlinePerson /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const customerData = JSON.parse(localStorage.getItem("customer"));
  const username = customerData?.user?.username;

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard user={user} />;
      case "orders":
        return <Order />;
      case "downloads":
        return <Download />;
      case "addresses":
        return <Address />;
      case "payment":
        return <Payment />;
      case "account":
        return <AccountDetail />;
      default:
        return <Dashboard user={user} />;
    }
  };

  // Fetch customer account on component mount
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const headers = {
          Authorization: `Token ${localStorage.getItem("token")}`,
        };

        const accountResponse = await fetchCustomerAccount(headers);
        setUser(accountResponse.data); // Assuming the API returns user data in `data`
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccount();
  }, []);

  return (
    <div className="container my-5 py-2">
      <div className="d-flex gap-1 justify-content-start">
        {/* Sidebar */}
        <div className=" sidebar shadow rounded-3 p-3 w-25">
          <div className="rounded">
            <div className="user-info d-flex align-items-center gap-2 mb-4">
              {/* Display user avatar and name */}
              <img
                className="rounded-circle"
                src={
                  user ? "/assets/placeholder.png" : "/assets/placeholder.png"
                } // Use default avatar if no user
                alt="User Avatar"
                width="45px"
                height="45px"
              />
              <span className="fw-bold ">
                <span className="text-color-success font-fam ">
                  {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                </span>
              </span>
            </div>
            <ul className="nav flex-column">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item w-100 ${
                    activeSection === item.id
                      ? "rounded bg-light shadow-sm"
                      : ""
                  }`}
                  style={{
                    border:
                      activeSection !== item.id ? "1px solid #dee2e6" : "none",
                    marginBottom: "0.5rem",
                    borderRadius: "0.375rem",
                  }}
                >
                  <a
                    className={`nav-link ${
                      activeSection === item.id
                        ? "active text-white bg-success"
                        : ""
                    }`}
                    onClick={() => setActiveSection(item.id)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-5 d-flex align-items-center">
                        {item.icon}
                      </span>
                      <span className="text-truncate">{item.label}</span>
                    </div>
                  </a>
                </li>
              ))}
              <li className="nav-item" onClick={handleLogout}>
                <span className="nav-link cursor-pointer d-flex gap-2 align-items-center">
                  <MdOutlineLogout />{" "}
                  <span className="text-truncate hide-on-sm">Log out</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="w-75 align-self-stretch">{renderContent()}</div>
      </div>
    </div>
  );
}
