import React from "react";

import ReloadButton from "./buttons/ReloadButton";
import LogoutButton from "./buttons/LogoutButton";
import { StyledSection, StyledText } from "../lib/Styling";

const StartPage = ({ USERDATA_URL }) => {

  return (
    <>
      <StyledSection>
        <StyledText>In this application, you can monitor your seizures to take control over your epilepsy.</StyledText>
        <StyledText>In this <strong>Home</strong> section, you can reload your data or log out.</StyledText>
        <StyledText>Click on the <strong>menu button</strong> to navigate to the different sections.</StyledText>
        <StyledText>In <strong>Dashboard</strong>, you can visualize the past week's epileptic activity</StyledText>
        <StyledText>In <strong>Seizures</strong>, you can add, edit and delete seizure information.</StyledText>
        <StyledText>In <strong>Contacts</strong>, you can add, edit, delete and call emergency and healthcare contacts.</StyledText>
        <StyledText>In <strong>Wallpaper</strong>, you can create a wallpaper for your mobile with your emergency contact information.</StyledText>
        <StyledText>In <strong>Profile</strong>, you can update your personal information and delete your account.</StyledText>
      </StyledSection>
      <ReloadButton USERDATA_URL={USERDATA_URL} />
      <LogoutButton />
    </>
  );
};

export default StartPage;