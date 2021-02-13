import React from "react";
import image from "../../assets/prisma-logo.svg";
import { logo } from "./index.module.css";

const Logo = () => {
  return <img className={logo} src={image} alt="prisma logo" />;
};

export default Logo;
