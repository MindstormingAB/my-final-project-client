import React from "react";

import Dashboard from "./Dashboard";
import Login from "./authentication/Login";

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
          </>
        )
        : (
          <Dashboard />
        )}
    </StyledSection>
  );
};

export default StartPage