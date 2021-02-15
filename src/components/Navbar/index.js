import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { nav, list } from "./index.module.css";

const Navbar = () => {
  const { value, setValue } = useContext(UserContext);
  const location = useLocation();

  console.log(location.pathname);

  return value && location.pathname === `/user/${value.id}` ? (
    <div>Hello, {value && value.name}</div>
  ) : (
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
