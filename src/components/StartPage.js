import React from "react";

import ReloadButton from "./buttons/ReloadButton";
import LogoutButton from "./buttons/LogoutButton";
import { StyledSection, StyledText } from "../lib/Styling";

const StartPage = ({ USERDATA_URL }) => {

  return (
    <>
      <StyledSection>
        <StyledText>Monitor your seizures and take control over your epilepsy!</StyledText>
      </StyledSection>
      <ReloadButton USERDATA_URL={USERDATA_URL} />
      <LogoutButton />
    </>
  );
};

export default StartPage;