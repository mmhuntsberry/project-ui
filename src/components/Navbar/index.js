import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { nav, list } from "./index.module.css";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {}, [user, location]);

  return user && pathname.includes("user") ? (
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
