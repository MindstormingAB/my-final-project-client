import React from "react";
import { useDispatch } from "react-redux";

import { fetchUserData } from "../../reducers/reusable";

import { StyledButton } from "../../lib/Styling";

const ReloadButton = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");

  const handleReload = (event) => {
    event.preventDefault();
    dispatch(fetchUserData(USERDATA_URL, localToken, localId));
  };

  return (
    <StyledButton onClick={handleReload}>Reload</StyledButton>
  );
};

export default ReloadButton;