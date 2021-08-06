import React from "react";
import { LoginButton } from "./LoginButton";
import { SignupButton } from "./SignupButton";
import { SignupComButton } from "./SignupComButton"

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <SignupComButton />
            </li>
            <li className="nav-item">
              <SignupButton />
            </li>

            <li className="nav-item">
              <LoginButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
