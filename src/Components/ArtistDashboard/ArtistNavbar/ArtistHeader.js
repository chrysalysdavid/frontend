// import React, { useState } from "react";
// import "./ArtistHeader.scss";
// import { NavLink } from "react-router-dom";
// import logo from "../../../assets/Logo-240x31.png";

// export default function ArtistHeader() {
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);

//   const handleImageUpload = (e, setImage) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const triggerFileInput = (target) => {
//     const input = document.getElementById(target);
//     input.click();
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg border-bottom">
//         <div className="container-fluid ast-contain">
//           <a className="navbar-brand py-3" href="">
//             <img src={logo} alt="Logo" />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div
//             className="collapse navbar-collapse pl-80"
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/ManageArtwork"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   MANAGE ARTWORK
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/Sales"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   SALES
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/Accounts"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   ACCOUNTS
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/Reports"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   REPORTS
//                 </NavLink>
//               </li>
//             </ul>
//             <div className="user d-flex me-2">
//               <div className="userDp"></div>
//               <div className="align-self-center">
//                 <h6 className="m-0">WELCOME ARTIST</h6>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <div className="Coverpic">
//         <div
//           className="background-image-container"
//           onClick={() => triggerFileInput("backgroundImageInput")}
//           style={{
//             cursor: "pointer",
//             backgroundImage: backgroundImage
//               ? `url(${backgroundImage})`
//               : "none",
//           }}
//         >
//           {!backgroundImage && (
//             <p className="upload-text">Click to upload a background image</p>
//           )}
//           <input
//             id="backgroundImageInput"
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleImageUpload(e, setBackgroundImage)}
//           />
//         </div>
//         <div className="astronaut-collection">
//           <div className="dp-tab">
//             <div className="WiDth position-relative d-flex justify-content-between">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="dp_placementdash"
//                   onClick={() => triggerFileInput("profileImageInput")}
//                   style={{
//                     cursor: "pointer",
//                     backgroundImage: profileImage
//                       ? `url(${profileImage})`
//                       : "none",
//                   }}
//                 >
//                   {!profileImage && (
//                     <p className="upload-text">
//                       Click to upload a profile picture
//                     </p>
//                   )}
//                   <input
//                     id="profileImageInput"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={(e) => handleImageUpload(e, setProfileImage)}
//                   />
//                 </div>
//                 <div className="d-flex gap-5">
//                   <h2 className="text-capitalize f-22 m-0">Artist Name</h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import "./ArtistHeader.scss";
// import { NavLink } from "react-router-dom";
// import logo from "../../../assets/Logo-240x31.png";

// export default function ArtistHeader({
//   backgroundImage,
//   setBackgroundImage,
//   profileImage,
//   setProfileImage,
// }) {
//   // Function to handle image uploads
//   const handleImageUpload = (e, setImage) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (file.type.startsWith("image/")) {
//         // Use FileReader to read the file as data URL
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImage(reader.result); // Set the base64 data URL
//         };
//         reader.readAsDataURL(file); // Start reading the file
//       } else {
//         alert("Please upload a valid image file.");
//       }
//     }
//   };

//   // Trigger hidden file input
//   const triggerFileInput = (target) => {
//     const input = document.getElementById(target);
//     input.click();
//   };

//   // Clean up object URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       // If the image is a URL object, revoke it
//       if (typeof backgroundImage === "object") {
//         URL.revokeObjectURL(backgroundImage);
//       }
//       if (typeof profileImage === "object") {
//         URL.revokeObjectURL(profileImage);
//       }
//     };
//   }, [backgroundImage, profileImage]);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg border-bottom">
//         <div className="container-fluid ast-contain">
//           <a className="navbar-brand py-3" href="">
//             <img src={logo} alt="Logo" />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div
//             className="collapse navbar-collapse pl-80"
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/ManageArtwork"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   MANAGE ARTWORK
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/Sales"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   SALES
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/Accounts"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   ACCOUNTS
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/ArtistDashboard/Report"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   REPORTS
//                 </NavLink>
//               </li>
//             </ul>
//             <div className="user d-flex me-2">
//               <div className="userDp"></div>
//               <div className="align-self-center">
//                 <h6 className="m-0">WELCOME ARTIST</h6>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <div className="Coverpic">
//         <div
//           className="background-image-container"
//           onClick={() => triggerFileInput("backgroundImageInput")}
//           style={{
//             cursor: "pointer",
//             backgroundImage: backgroundImage
//               ? `url(${backgroundImage})`
//               : "none",
//           }}
//         >
//           {!backgroundImage && (
//             <p className="upload-text">Click to upload a background image</p>
//           )}
//           <input
//             id="backgroundImageInput"
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleImageUpload(e, setBackgroundImage)}
//           />
//         </div>
//         <div className="astronaut-collection">
//           <div className="dp-tab">
//             <div className="WiDth position-relative d-flex justify-content-between">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="dp_placementdash"
//                   onClick={() => triggerFileInput("profileImageInput")}
//                   style={{
//                     cursor: "pointer",
//                     backgroundImage: profileImage
//                       ? `url(${profileImage})`
//                       : "none",
//                   }}
//                 >
//                   {!profileImage && (
//                     <p className="upload-text">
//                       Click to upload a profile picture
//                     </p>
//                   )}
//                   <input
//                     id="profileImageInput"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={(e) => handleImageUpload(e, setProfileImage)}
//                   />
//                 </div>
//                 <div className="d-flex gap-5">
//                   <h2 className="text-capitalize f-22 m-0">Artist Name</h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

//with image

// import React, { useEffect } from "react";
// import "./ArtistHeader.scss";
// import { NavLink } from "react-router-dom";
// import logo from "../../../assets/Logo-240x31.png";

// export default function ArtistHeader({
//   backgroundImage,
//   setBackgroundImage,
//   profileImage,
//   setProfileImage,
// }) {
//   // Trigger hidden file input
//   const triggerFileInput = (target) => {
//     document.getElementById(target)?.click();
//   };

//   // Handle image uploads
//   const handleImageUpload = (e, setImage) => {
//     debugger;
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type.startsWith("image/")) {
//         setImage(file);
//       } else {
//         alert("Please upload a valid image file.");
//       }
//     }
//   };

//   // Generate image URL for preview
//   const getImageURL = (image) => {
//     if (image && typeof image !== "string") {
//       return URL.createObjectURL(image);
//     }
//     return image || "";
//   };

//   // Cleanup object URLs
//   useEffect(() => {
//     return () => {
//       if (backgroundImage && typeof backgroundImage === "object") {
//         URL.revokeObjectURL(backgroundImage);
//       }
//       if (profileImage && typeof profileImage === "object") {
//         URL.revokeObjectURL(profileImage);
//       }
//     };
//   }, [backgroundImage, profileImage]);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg border-bottom">
//         <div className="container-fluid ast-contain">
//           <a className="navbar-brand py-3" href="/">
//             <img src={logo} alt="Logo" />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div
//             className="collapse navbar-collapse pl-80"
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               {["Manage Artwork", "Sales", "Accounts", "Reports"].map(
//                 (item) => (
//                   <li className="nav-item" key={item}>
//                     <NavLink
//                       to={`/ArtistDashboard/${item.replace(" ", "")}`}
//                       className="nav-link"
//                       activeClassName="active"
//                     >
//                       {item.toUpperCase()}
//                     </NavLink>
//                   </li>
//                 )
//               )}
//             </ul>
//             <div className="user d-flex me-2">
//               <div className="userDp"></div>
//               <div className="align-self-center">
//                 <h6 className="m-0">WELCOME ARTIST</h6>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <div className="Coverpic">
//         <div
//           className="background-image-container"
//           onClick={() => triggerFileInput("backgroundImageInput")}
//           style={{
//             cursor: "pointer",
//             backgroundImage: backgroundImage
//               ? `url(${getImageURL(backgroundImage)})`
//               : "none",
//           }}
//         >
//           {!backgroundImage && (
//             <p className="upload-text">Click to upload a background image</p>
//           )}
//           <input
//             id="backgroundImageInput"
//             type="file"
//             style={{ display: "none" }}
//             onChange={(e) => handleImageUpload(e, setBackgroundImage)}
//           />
//         </div>
//         <div className="astronaut-collection">
//           <div className="dp-tab">
//             <div className="WiDth position-relative d-flex justify-content-between">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="dp_placementdash"
//                   onClick={() => triggerFileInput("profileImageInput")}
//                   style={{
//                     cursor: "pointer",
//                     backgroundImage: profileImage
//                       ? `url(${getImageURL(profileImage)})`
//                       : "none",
//                   }}
//                 >
//                   {!profileImage && (
//                     <p className="upload-text">
//                       Click to upload a profile picture
//                     </p>
//                   )}
//                   <input
//                     id="profileImageInput"
//                     type="file"
//                     style={{ display: "none" }}
//                     onChange={(e) => handleImageUpload(e, setProfileImage)}
//                   />
//                 </div>
//                 <h2 className="text-capitalize f-22 m-0">Artist Name</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import "./ArtistHeader.scss";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/Logo-240x31.png";
import placeholderImg from "../../../assets/placeholder.png";

export default function ArtistHeader() {
  const [userData, setUserData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    if (userId) {
      fetch(
        `https://web-production-e9268.up.railway.app/api/v1/arts/artist_profile/${userId}`
      )
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }
  }, []);
  console.log(userData);

  const getImageURL = (image) => {
    if (image && typeof image !== "string") {
      return URL.createObjectURL(image);
    }
    return image || "";
  };

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
            className="collapse navbar-collapse ps-0 ps-sm-0 ps-lg-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {[
                ...["Manage Artwork", "Sales", "Profile", "Report"],
                "Logout",
              ].map((item) => (
                <li className="nav-item " key={item}>
                  <NavLink
                    to={
                      item === "Logout"
                        ? "/artistportal"
                        : `/ArtistDashboard/${item.replace(" ", "")}`
                    }
                    className="nav-link p-2 px-3 rounded"
                    activeClassName="active"
                  >
                    {item.toUpperCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="user d-flex me-2">
              <div
                className="userDp"
                style={{
                  backgroundImage: `url(${
                    userData?.profile_picture
                      ? userData?.profile_picture
                      : placeholderImg
                  })`,
                }}
              ></div>
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
          style={{
            backgroundImage: userData?.background_picture
              ? `url(${getImageURL(userData?.background_picture)})`
              : "none",
          }}
        >
          {!userData?.background_picture && (
            <p className="upload-text">No background image available</p>
          )}
        </div>
        <div className="astronaut-collection">
          <div className="dp-tab">
            <div className="WiDth position-relative d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="dp_placementdash"
                  style={{
                    backgroundImage: userData?.profile_picture
                      ? `url(${getImageURL(userData?.profile_picture)})`
                      : `url(${placeholderImg})`,
                  }}
                >
                  {!userData?.profile_picture && (
                    <p className="upload-text"></p>
                  )}
                </div>
                <h2 className="text-uppercase f-22 m-0">{userName}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
