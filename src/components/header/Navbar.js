import React from "react";
import { NavLink } from "react-router-dom";

import { StyledNav } from "../../lib/Styling";

const Navbar = () => {
  return (
    <StyledNav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink to="/profile">
        Profile
      </NavLink>
      <NavLink to="/seizures">
        Seizures
      </NavLink>
      <NavLink to="/contacts" exact>
        Contacts
      </NavLink>
    </StyledNav>
  );
};

export default Navbar;