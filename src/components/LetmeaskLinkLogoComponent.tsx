// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Assets
import logoImage from "../assets/images/logo.svg";

export function LetmeaskLinkLogoComponent() {
  return (
    <div className="letmeaskLogo">
      <Link to="/">
        <img src={logoImage} alt="icon" />
      </Link>
    </div>
  );
}
