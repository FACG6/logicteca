import React from "react";
import icon from "./icons8-bug-90.png";
import { Link } from "react-router-dom";
import "./style.css";

export default function index() {
  return (
    <section className="internalservererr__main">
      <div className="internalservererr__icon">
        <img src={icon} alt="error bug" />
      </div>
      <div className="internalservererr__icon internalservererr__info">
        <span className="internalservererr__caption ">Internal Server Error</span>
        <Link to="/">
          {" "}
          <span className="internalservererr__link--caption">Go to main Page</span>
        </Link>
      </div>
    </section>
  );
}
