import React from "react";

const NavBar = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => props.onClick("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => props.onClick("resume")}>Resume</button>
          </li>
          <li>
            <button onClick={() => props.onClick("contact")}>contact</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
