import React from "react";

import Dashboard from "./Dashboard";
import Login from "./Login";
// import NavigationButton from "./NavigationButton";
// import LogoutButton from "./LogoutButton";

import { StyledSection } from "../lib/Styling";
import { StyledTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const StartPage = ({ LOGIN_URL }) => {
  const localToken = localStorage.getItem("localToken");
  const localFirstName = localStorage.getItem("localFirstName");

  return (
    <StyledSection>
      {!localToken
        ? (
          <>
            <StyledTitle>
              {localFirstName
                ? `Welcome ${localFirstName}!`
                : "Welcome!"}
            </StyledTitle>
            <StyledText>Description of the application</StyledText>
            <Login LOGIN_URL={LOGIN_URL} />
            {/* < NavigationButton route="login" label="Login/Signup" /> */}
          </>
        )
        : (
          <>
            {/* <StyledText>You can access your dasboard by clicking on the button below.</StyledText>
            <NavigationButton route="dashboard" label="Dashboard" /> */}
            <Dashboard />
            {/* <LogoutButton /> */}
          </>
        )}
    </StyledSection>
  );
};

export default StartPage