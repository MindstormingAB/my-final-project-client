import React from "react";

import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";

import { StyledSection } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const Dashboard = () => {
  return (
    <StyledSection>
      <StyledText>This is your dashboard</StyledText>
      <ProfileButton />
      <LogoutButton />
    </StyledSection>
  );
};

export default Dashboard;