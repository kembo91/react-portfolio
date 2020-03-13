import React from "react";

const NavBar = props => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={props.onClickHome}>Home</button>
          </li>
          <li>
            <button onClick={props.onClickResume}>Resume</button>
          </li>
          <li>
            <button onClick={props.onClickContact}>contact</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
