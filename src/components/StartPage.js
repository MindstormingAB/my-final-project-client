import React from "react";

import Dashboard from "./Dashboard";
import Login from "./authentication/Login";

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
      {!localToken
        ? (
          <>
            <StyledText>Description of the application</StyledText>
            <Login LOGIN_URL={LOGIN_URL} />
          </>
        )
        : (
          <Dashboard USERDATA_URL={USERDATA_URL} />
        )}
    </StyledSection>
  );
};

export default StartPage