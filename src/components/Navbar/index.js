import React from "react";
import { nav, list, item, link } from "./index.module.css";

const Navbar = () => {
  return (
    <nav>
      <ul className={list}>
        <li>Sign up</li>
        <li>Log in</li>
      </ul>
    </nav>
  );
};

export default Navbar;
