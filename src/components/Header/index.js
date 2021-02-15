import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { header } from "./index.module.css";

const Header = () => {
  return (
    <header className={header}>
      <Link to="/">
        <Logo />
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
