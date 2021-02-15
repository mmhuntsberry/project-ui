import React from "react";
import { Link } from "react-router-dom";
import { nav, list } from "./index.module.css";

const Navbar = () => {
  return (
    <nav>
      <ul className={list}>
        <li>
          <Link to="/">Sign u</Link>p
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
