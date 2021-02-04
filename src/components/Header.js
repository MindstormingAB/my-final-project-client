import React from "react";

import Navbar from "./Navbar";

import { StyledHeader } from "../lib/Styling";

const Header = () => {
  return (
    <StyledHeader>
      Epilepsy App
      <Navbar />
    </StyledHeader>
  );
};

export default Header;