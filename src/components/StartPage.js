import React from "react";

import Login from "./authentication/Login";
import NavigationButton from "./buttons/NavigationButton";
import ReloadButton from "./buttons/ReloadButton";
import LogoutButton from "./buttons/LogoutButton";

import { useToggle } from "../reducers/reusable";

import { StyledSection } from "../lib/Styling";
import { StyledTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const StartPage = ({ LOGIN_URL, USERDATA_URL }) => {
  const localFirstName = localStorage.getItem("localFirstName");
  const [loggedIn, toggleLoggedIn] = useToggle();

  return (
    <StyledSection>
      <StyledTitle>
        {localFirstName
          ? `Welcome ${localFirstName}!`
          : "Welcome!"}
      </StyledTitle>
      <StyledText>Description of the application</StyledText>
      {!loggedIn
        ? (
          <>
            <Login LOGIN_URL={LOGIN_URL} toggleLoggedIn={toggleLoggedIn} />
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