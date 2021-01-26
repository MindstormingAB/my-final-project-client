import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { user } from "../reducers/user";

import { StyledButton } from "../lib/Styling";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(user.actions.deleteAccessToken());
    dispatch(user.actions.deleteUserId());
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  return (
    <StyledButton onClick={handleLogout}>Logout</StyledButton>
  );
};

export default LogoutButton;