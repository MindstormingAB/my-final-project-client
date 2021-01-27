import React from "react";

import NavigationButton from "./NavigationButton";
import LogoutButton from "./LogoutButton";

import { StyledSection } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";

const Dashboard = () => {
  return (
    <StyledSection>
      <StyledSubTitle>This is your dashboard</StyledSubTitle>
      <NavigationButton route="profile" label="Profile" />
      <NavigationButton route="contacts" label="Contacts" />
      <NavigationButton route="seizures" label="Seizures" />
      <LogoutButton />
    </StyledSection>
  );
};

export default Dashboard;