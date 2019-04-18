import React from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div>
      Projects
      <Link to={'/project/1/1'}>project 1</Link>
      <Link to={'/project/2/1'}>project 2</Link>
    </div>
  );
}