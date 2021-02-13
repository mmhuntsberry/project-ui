import React from "react";
import { Heading03 } from "../../elements";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <header className="App-header">
      <Heading03 heading="Prisma" />
      <Navbar />
    </header>
  );
};

export default Header;
