import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/resume">Resume</Link>
          </li>
          <li>
            <Link to="/contact">contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
