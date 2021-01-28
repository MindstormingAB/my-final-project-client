import React from "react";
import { useHistory } from "react-router-dom";

import { StyledButton } from "../../lib/Styling";

const NavigationButton = ({ route, label }) => {
  const history = useHistory();

  return (
    <StyledButton onClick={() => history.push(`/${route}`)}>{label}</StyledButton>
  );
};

export default NavigationButton;