import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { nav, list } from "./index.module.css";

const Navbar = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {}, [user]);

  return user ? (
    <div>Hello, {user.name}</div>
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
