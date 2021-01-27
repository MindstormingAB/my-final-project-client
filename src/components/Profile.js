import React from "react";

import NavigationButton from "./NavigationButton";

import { StyledSection } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const Profile = () => {
  return (
    <StyledSection>
      <StyledSubTitle>Profile</StyledSubTitle>
      <StyledText>This is where you can update your profile</StyledText>
      <NavigationButton route="" label="Back" />
    </StyledSection>
  )
};

export default Profile;