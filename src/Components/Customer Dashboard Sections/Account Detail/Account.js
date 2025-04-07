import React, { useState, useEffect } from "react";
import {
  fetchCustomerAccount,
  patchCustomerAccount,
  changeCustomerPassword,
} from "../../../Services/apiservice"; // Importing the API functions
import "../Dasboard Styling/dash_style.scss";
import { SectionLoadingSkeleton } from "../../LoadingSkeleton/LoadingSkeleton";

export default function AccountDetail() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userId, setUserId] = useState(null); // To store the user ID
  const [loading, setLoading] = useState(true);

  // Fetch the customer account on component mount
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const headers = {
          Authorization: `Token ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        };

        // Fetch the user account data
        const response = await fetchCustomerAccount(headers);
        const { first_name, last_name, username, email, id } = response.data;

        // Set the user ID and form data
        setUserId(id);
        setFormData({
          firstName: first_name,
          lastName: last_name,
          username: username,
          email: email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching customer account:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  // Handle form submission for updating user details and changing password
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);
    if (!userId) return;

    const headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    // Prepare data for updating user details
    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
    };

    try {
      await patchCustomerAccount(headers, userData, userId);

      if (
        formData.currentPassword &&
        formData.newPassword &&
        formData.confirmPassword
      ) {
        if (formData.newPassword === formData.confirmPassword) {
          const passwordData = {
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
            username: formData.username,
          };
          await changeCustomerPassword(headers, passwordData, userId);
          console.log("Password and account details updated successfully.");
        } else {
          console.log("New password and confirm password do not match.");
        }
      } else {
        console.log("Account details updated successfully.");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      console.log("Error updating account details. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="px-4">
        <div className="py-5">
          <SectionLoadingSkeleton />
        </div>
        <div>
          <SectionLoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="content bg-white px-2 rounded">
      <form onSubmit={handleSubmit}>
        <div className=" mb-4 rounded shadow-sm p-4 border">
          <h4 className="mb-4 font-fam fw-light">Personal Information</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="displayName" className="form-label">
              Display name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              name="displayName"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <small className="text-muted">
              This will be how your name appears in the account section and in
              reviews.
            </small>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="email" className="form-label">
              Email address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password Change */}
        <div className="rounded shadow-sm p-4 border">
          <h4 className="mb-4 font-fam fw-light">Password Change</h4>
          <div className="row">
            <div className="col-12 mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Current password <small>(leave blank to leave unchanged)</small>
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="newPassword" className="form-label">
                New password <small>(leave blank to leave unchanged)</small>
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm new password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
