import React from "react";

import NavigationButton from "./buttons/NavigationButton";
import ReloadButton from "./buttons/ReloadButton";
import LogoutButton from "./buttons/LogoutButton";

import { StyledSection } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";

const Dashboard = ({ USERDATA_URL }) => {
  return (
    <StyledSection>
      <StyledSubTitle>This is your dashboard</StyledSubTitle>
      <NavigationButton route="profile" label="Profile" />
      <NavigationButton route="contacts" label="Contacts" />
      <NavigationButton route="seizures" label="Seizures" />
      <ReloadButton USERDATA_URL={USERDATA_URL} />
      <LogoutButton />
    </StyledSection>
  );
};

export default Dashboard;