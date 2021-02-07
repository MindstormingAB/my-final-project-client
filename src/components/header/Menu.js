import React from 'react';
import { NavLink } from "react-router-dom";

import { StyledMenu } from "../../lib/Styling";

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink to="/seizures">
        Seizures
      </NavLink>
      <NavLink to="/contacts" exact>
        Contacts
      </NavLink>
      <NavLink to="/wallpaper">
        Wallpaper
      </NavLink>
      <NavLink to="/profile">
        Profile
      </NavLink>
    </StyledMenu>
  );
};

export default Menu;