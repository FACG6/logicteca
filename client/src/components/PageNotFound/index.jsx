import React from "react";
import icon from "./icons8-bug-90.png";
import { Link } from "react-router-dom";
import "./style.css";

export default function index() {
  return (
    <section className="pagenotfound__main">
      <div className="pagenotfound__icon">
        <img src={icon} alt="error bug" />
        <span className="pagenotfound__caption">404</span>
      </div>
      <div className="pagenotfound__icon pagenotfound__info">
        <span className="pagenotfound__caption ">Page Not Found</span>
        <Link to="/">
          {" "}
          <span className="pagenotfound__link--caption">Go to main Page</span>
        </Link>
      </div>
    </section>
  );
}
