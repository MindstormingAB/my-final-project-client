import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { user } from "../../reducers/user";

import { StyledMenu } from "../../lib/Styling";

const Menu = ({ open }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(user.actions.restart());
    localStorage.clear();
    history.push("/");
  };

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
      <button onClick={handleLogout}>
        Logout
      </button>
    </StyledMenu>
  );
};

export default Menu;