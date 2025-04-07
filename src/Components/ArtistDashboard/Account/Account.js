import React, { useState, useEffect } from "react";
import "./Account.scss";
import ArtistHeader from "../ArtistNavbar/ArtistHeader";
import axios from "axios";

export default function Accounts() {
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const accountFields = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "description", label: "Bio", type: "textarea" },
    {
      id: "artistStatement",
      label: "Artist Statement",
      type: "textarea",
      maxlength: "100",
    },
    { id: "education", label: "Education", maxlength: "50" },
    { id: "routingNumber", label: "Routing Number" },
    { id: "accountNumber", label: "Account Number" },
    { id: "venmo", label: "Venmo" },
    { id: "paypal", label: "PayPal" },
  ];

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = () => {
    axios
      .get(
        `https://web-production-e9268.up.railway.app/api/v1/arts/artist_profile/${userId}`
      )
      .then(({ data }) => {
        const fetchedData = {
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          artistStatement: data.artist_statement || "",
          email: data.email || "",
          phone: data.phone_number || "",
          education: data.education || "",
          routingNumber: data.routing_number || "",
          accountNumber: data.bank_account_number || "",
          venmo: data.venmo || "",
          paypal: data.paypal || "",
          description: data.description || "",
        };
        setFormData(fetchedData);
        setOriginalData(fetchedData);
        setBackgroundImage(data.background_picture || null);
        setProfileImage(data.profile_picture || null);
      })
      .catch(console.error);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        updatedData.append(
          key.replace(/([A-Z])/g, "_$1").toLowerCase(),
          formData[key]
        );
      }
    });

    if (profileImage && typeof profileImage !== "string") {
      updatedData.append("profile_picture", profileImage);
    }
    if (backgroundImage && typeof backgroundImage !== "string") {
      updatedData.append("background_picture", backgroundImage);
    }

    try {
      await axios.put(
        `https://web-production-e9268.up.railway.app/api/v1/arts/artist_profile/${userId}/`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ArtistHeader
        backgroundImage={backgroundImage}
        setBackgroundImage={setBackgroundImage}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />
      <div className="container e-con py-4 px-2">
        <form className="row g-3 mt-4">
          {accountFields.map(({ id, label, type = "text", maxlength }) => (
            <div className="col-md-6" key={id}>
              <label htmlFor={id} className="form-label">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  className="form-control"
                  id={id}
                  value={formData[id]}
                  onChange={handleInputChange}
                  maxlength={maxlength}
                  disabled={!isEditing}
                />
              ) : (
                <input
                  type={type}
                  className="form-control"
                  id={id}
                  value={formData[id]}
                  onChange={handleInputChange}
                  maxlength={maxlength}
                  disabled={!isEditing}
                />
              )}
            </div>
          ))}
          <div className="d-flex gap-2 mt-2">
            {!isEditing ? (
              <button
                type="button"
                className="btn btn-primary br-30 Btn-Style"
                onClick={handleEdit}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary br-30 Btn-Style"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary br-30 Btn-Style"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
