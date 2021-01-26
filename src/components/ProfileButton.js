import React from "react";
import { useHistory } from "react-router-dom";

import { StyledButton } from "../lib/Styling";

const ProfileButton = () => {
  const history = useHistory();

  return (
    <StyledButton onClick={() => history.push("/userdetails")}>Profile</StyledButton>
  );
};

export default ProfileButton;