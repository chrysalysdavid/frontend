import React from "react";
import "../Dasboard Styling/dash_style.scss";

export default function Download() {
  return (
    <div className="ps-2">
      <div className="alert-wrapper"></div>
      <div className="alert1 d-flex gap-2 flex-column flex-sm-column flex-lg-row justify-content-between  align-items-center ">
        <span>No downloads have been made yet.</span>
        <a className="btn btn-primary border-0" href="https://chrysalys.art/">
          Browse Products
        </a>
      </div>
    </div>
  );
}
