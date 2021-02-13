import React from "react";
import { Heading03 } from "../../elements";
import Logo from "../Logo";
import Navbar from "../Navbar";
import { header } from "./index.module.css";

const Header = () => {
  return (
    <header className={header}>
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
