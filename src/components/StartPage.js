import React from "react";

import Login from "./authentication/Login";
import NavigationButton from "./buttons/NavigationButton";
import ReloadButton from "./buttons/ReloadButton";
import LogoutButton from "./buttons/LogoutButton";

import { StyledSection } from "../lib/Styling";
import { StyledTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const StartPage = ({ LOGIN_URL, USERDATA_URL }) => {
  const localToken = localStorage.getItem("localToken");
  const localFirstName = localStorage.getItem("localFirstName");

  return (
    <StyledSection>
      <StyledTitle>
        {localFirstName
          ? `Welcome ${localFirstName}!`
          : "Welcome!"}
      </StyledTitle>
      <StyledText>Description of the application</StyledText>
      {!localToken
        ? (
          <>
            <Login LOGIN_URL={LOGIN_URL} />
          </>
        )
        : (
          <>
            <NavigationButton route="profile" label="Profile" />
            <NavigationButton route="dashboard" label="Dashboard" />
            <NavigationButton route="contacts" label="Contacts" />
            <NavigationButton route="seizures" label="Seizures" />
            <ReloadButton USERDATA_URL={USERDATA_URL} />
            <LogoutButton />
          </>
        )}
    </StyledSection>
  );
};

export default StartPage