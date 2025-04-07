import React, { useEffect } from "react";
import "./accountsnavbar.scss";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/Logo-240x31.png";

export default function AccountsNavbar({
  backgroundImage,
  setBackgroundImage,
  profileImage,
  setProfileImage,
}) {
  // Trigger hidden file input
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;

  const triggerFileInput = (target) => {
    document.getElementById(target)?.click();
  };

  // Handle image uploads
  const handleImageUpload = (e, setImage) => {
    debugger;
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  // Generate image URL for preview
  const getImageURL = (image) => {
    if (image && typeof image !== "string") {
      return URL.createObjectURL(image);
    }
    return image || "";
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (backgroundImage && typeof backgroundImage === "object") {
        URL.revokeObjectURL(backgroundImage);
      }
      if (profileImage && typeof profileImage === "object") {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [backgroundImage, profileImage]);

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container-fluid ast-contain">
          <a className="navbar-brand py-3" href="/">
            <img src={logo} alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse pl-80"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {[
                ...["Manage Artwork", "Sales", "Profile", "Report"],
                "Logout",
              ].map((item) => (
                <li className="nav-item" key={item}>
                  <NavLink
                    to={
                      item === "Logout"
                        ? "/artistportal"
                        : `/ArtistDashboard/${item.replace(" ", "")}`
                    }
                    className="nav-link"
                    activeClassName="active"
                  >
                    {item.toUpperCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="user d-flex me-2">
              <div className="userDp"></div>
              <div className="align-self-center">
                <h6 className="m-0">WELCOME {userName}</h6>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="Coverpic">
        <div
          className="background-image-container"
          onClick={() => triggerFileInput("backgroundImageInput")}
          style={{
            cursor: "pointer",
            backgroundImage: backgroundImage
              ? `url(${getImageURL(backgroundImage)})`
              : "none",
          }}
        >
          {!backgroundImage && (
            <p className="upload-text">Click to upload a background image</p>
          )}
          <input
            id="backgroundImageInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(e, setBackgroundImage)}
          />
        </div>
        <div className="astronaut-collection">
          <div className="dp-tab">
            <div className="WiDth position-relative d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="dp_placementdash"
                  onClick={() => triggerFileInput("profileImageInput")}
                  style={{
                    cursor: "pointer",
                    backgroundImage: profileImage
                      ? `url(${getImageURL(profileImage)})`
                      : "none",
                  }}
                >
                  {!profileImage && (
                    <p className="upload-text">
                      Click to upload a profile picture
                    </p>
                  )}
                  <input
                    id="profileImageInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(e, setProfileImage)}
                  />
                </div>
                <h2 className="text-uppercase f-26 m-0">{userName}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
