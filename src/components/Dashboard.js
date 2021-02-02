import React from "react";

import NavigationButton from "./buttons/NavigationButton";

import { StyledSection, StyledText } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";

const Dashboard = ({ USERDATA_URL }) => {
  return (
    <StyledSection>
      <StyledSubTitle>Dashboard</StyledSubTitle>
      <StyledText>This is your dashboard</StyledText>
      <NavigationButton route="" label="Back" />
    </StyledSection>
  );
};

export default Dashboard;