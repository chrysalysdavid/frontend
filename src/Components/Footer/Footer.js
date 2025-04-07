import React from "react";
import "./Footer.scss";
import "../Styles/Styles.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="bggray">
        <div className="container-fluid">
          <div className="econ ast-builder-footer-grid-columns site-above-footer-inner-wrap ast-builder-grid-row">
            <div className="site-footer-above-section-1 d-flex align-items-center">
              <div className="listbar">
                <section className="widget_nav_menu">
                  <nav className="menu-footer-menu-2-container">
                    <ul className="menu">
                      <li className="menu-item">
                        <a className="menu-link">HOME</a>
                      </li>
                      <li className="menu-item">
                        <a className="menu-link">ABOUT US</a>
                      </li>
                      <li className="menu-item">
                        <a className="menu-link">ABOVE &amp; BELOW</a>
                      </li>
                      <li className="menu-item">
                        <a className="menu-link">ABSTRACT</a>
                      </li>
                      <li className="menu-item">
                        <a className="menu-link">ART OF INSOMNIUS</a>
                      </li>
                      <li className="menu-item">
                        <a className="menu-link">EXCLUSIVE WORKS</a>
                      </li>
                      <li className="menu-item">
                        <a className="menu-link">OPEN EDITIONS</a>
                      </li>
                    </ul>
                  </nav>
                </section>
              </div>
            </div>

            <div className="site-footer-above-section-2">
              <div className="Form">
                <section className="widget1">
                  <h4 className="wp-block-heading">
                    Be the first to know about our new works.
                  </h4>
                </section>
              </div>
              <div className="ast-builder-layout-element ast-flex site-footer-focus-item">
                <div className="ast-footer-social-1-wrap ast-footer-social-wrap">
                  <div className="footer-social-inner-wrap element-social-inner-wrap social-show-label-false ast-social-color-type-custom ast-social-stack-none ast-social-element-style-filled">
                    <a
                      href=""
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        "--color": "#557dbc",
                        "--background-color": "transparent",
                      }}
                      className="ast-builder-social-element ast-inline-flex ast-facebook footer-social-item"
                    >
                      <span
                        aria-hidden="true"
                        className="ahfb-svg-iconset ast-inline-flex svg-baseline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                        </svg>
                      </span>
                    </a>
                    <a
                      href=""
                      aria-label="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        "--color": "#7acdee",
                        "--background-color": "transparent",
                      }}
                      className="ast-builder-social-element ast-inline-flex ast-twitter footer-social-item"
                    >
                      <span
                        aria-hidden="true"
                        className="ahfb-svg-iconset ast-inline-flex svg-baseline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                        </svg>
                      </span>
                    </a>
                    <a
                      href=""
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        "--color": "#8a3ab9",
                        "--background-color": "transparent",
                      }}
                      className="ast-builder-social-element ast-inline-flex ast-instagram footer-social-item"
                    >
                      <span
                        aria-hidden="true"
                        className="ahfb-svg-iconset ast-inline-flex svg-baseline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
                        </svg>
                      </span>
                    </a>
                    <a
                      href=""
                      aria-label="TikTok"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        "--color": "#8a3ab9",
                        "--background-color": "transparent",
                      }}
                      className="ast-builder-social-element ast-inline-flex ast-tiktok footer-social-item"
                    >
                      <span
                        aria-hidden="true"
                        className="ahfb-svg-iconset ast-inline-flex svg-baseline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                        >
                          <path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z"></path>
                        </svg>
                      </span>
                    </a>
                    <a
                      href=""
                      aria-label="YouTube"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        "--color": "#8a3ab9",
                        "--background-color": "transparent",
                      }}
                      className="ast-builder-social-element ast-inline-flex ast-youtube footer-social-item"
                    >
                      <span
                        aria-hidden="true"
                        className="ahfb-svg-iconset ast-inline-flex svg-baseline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="listbar">
                <section className="widget2">
                  <ul className="wp-block-social-links has-icon-color is-layout-flex wp-block-social-links-is-layout-flex"></ul>
                </section>
                <section className="widget widget_block">
                  <div className="wpforms-container">
                    <form>
                      <div className="py-3">
                        <label
                          htmlFor="exampleInputName1"
                          className="form-label"
                        >
                          Name <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputName1"
                        />
                      </div>
                      <div className="py-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address <span className="text-red">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <button
                        type="submit"
                        className="select-options btn btn-dark"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="d-flex">
          <p className="f-14">
            Copyright © 2025 chrysalys | Powered by chrysalys
          </p>
        </div>
        <div className="footer-center text-left">
          <Link to="/PrivacyPolicy">Privacy Policy</Link>
          <Link to="/TermCondition">Refund and Return Policy</Link>
          <Link to="/TermCondition">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
