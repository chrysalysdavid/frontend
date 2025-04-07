// import React from "react";
// import "./Navbar.scss";
import "../Styles/Styles.scss";
// import { Link } from "react-router-dom";
// import logo from "../../assets/Logo-240x31.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faTwitter,
//   faInstagram,
//   faYoutube,
// } from "@fortawesome/free-brands-svg-icons";

// export default function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg border-bottom">
//       <div className="container-fluid ast-contain">
//         <a className="navbar-brand py-3" href="">
//           <img src={logo} />
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" aria-current="page" to="/">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">
//                 About
//               </Link>
//             </li>
//             <li className="nav-item dropdown">
//               <a
//                 className="nav-link dropdown-toggle"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 Shop Art
//               </a>
//               <ul className="dropdown-menu">
//                 <Link className="nav-link" to="/above-below">
//                   Above & Below
//                 </Link>
//                 <Link className="nav-link" to="/art-of-insomnious">
//                   Art of insomnius
//                 </Link>
//                 <Link className="nav-link" to="/abstract">
//                   Abstract
//                 </Link>
//                 <Link className="nav-link" to="/Exclusive-Works">
//                   Exclusive Works
//                 </Link>
//                 <Link className="nav-link" to="/open-edition">
//                   Open Editions
//                 </Link>
//                 <Link className="nav-link" to="/forma-member">
//                   Forma Members
//                 </Link>
//               </ul>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/artistportal">
//                 Artist Portal
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/artist">
//                 Artists
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">
//                 Contact
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/login">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="">
//                 {" "}
//                 <FontAwesomeIcon icon={faFacebook} size="1x" />
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="">
//                 {" "}
//                 <FontAwesomeIcon icon={faTwitter} size="1x" />
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="">
//                 {" "}
//                 <FontAwesomeIcon icon={faInstagram} size="1x" />
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="">
//                 {" "}
//                 <FontAwesomeIcon icon={faYoutube} size="1x" />
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// old

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import "../Styles/Styles.scss";
import logo from "../../assets/Logo-240x31.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { getArtCategoryList } from "../../Services/apiservice";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getArtCategoryList();
        // console.log("Categories:", data);
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryID, e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    console.log("Category ID:", categoryID); // Log the clicked category ID
    navigate(`/categories/${categoryID}`); // Navigate to the selected category
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid ast-contain">
        <Link className="navbar-brand py-3" to="/">
          <img src={logo} alt="Logo" />
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop Art
              </a>
              <ul className="dropdown-menu">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        className="dropdown-item"
                        //to={`/categories/${category.id}`}
                        //onClick={() => handleCategoryClick(category.id)} // Ensure this is correctly calling navigate
                        onClick={(e) => handleCategoryClick(category.id, e)} // Pass the event
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">No Categories Available</li>
                )}
                {error && (
                  <li className="dropdown-item text-danger">{error}</li>
                )}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/artistportal">
                Artist Portal
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/artist">
                Artists
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Sign in
              </Link>
            </li>
            <div className="ast-divider-wrapper ast-divider-layout-vertical">
              <div className="ast-builder-divider-element"></div>
            </div>
            <li className="nav-item">
              <a className="nav-link" href="">
                <FontAwesomeIcon icon={faFacebook} size="1x" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <FontAwesomeIcon icon={faTwitter} size="1x" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <FontAwesomeIcon icon={faInstagram} size="1x" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <FontAwesomeIcon icon={faYoutube} size="1x" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
