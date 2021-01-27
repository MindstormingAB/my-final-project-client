import React from "react";

import NavigationButton from "./NavigationButton";

import { StyledSection } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const Contacts = () => {
  return (
    <StyledSection>
      <StyledSubTitle>Contacts</StyledSubTitle>
      <StyledText>This is where you can find your important contacts</StyledText>
      <NavigationButton route="" label="Back" />
    </StyledSection>
  )
};

export default Contacts;