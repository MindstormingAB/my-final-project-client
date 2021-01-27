import React from "react";

import NavigationButton from "./NavigationButton";

import { StyledSection } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const Seizures = () => {
  return (
    <StyledSection>
      <StyledSubTitle>Seizures</StyledSubTitle>
      <StyledText>This is where you can keep track of your seizures</StyledText>
      <NavigationButton route="" label="Back" />
    </StyledSection>
  )
};

export default Seizures;