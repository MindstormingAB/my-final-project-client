import React from "react";
import { useDispatch } from "react-redux";

import { user } from "../../reducers/user";

import { StyledButton } from "../../lib/Styling";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(user.actions.restart());
    localStorage.clear();
  };

  return (
    <StyledButton accent onClick={handleLogout}>Logout</StyledButton>
  );
};

export default LogoutButton;