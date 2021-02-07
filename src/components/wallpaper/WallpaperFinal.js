import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import { StyledSubTitle, StyledText } from "../../lib/Styling";

import logo from "../../assets/epilepsy-SE.jpg";

const StyledWallpaper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 48% 10% 10% 10% auto;
`;

const StyledImage = styled.img`
  width: 35%;
  place-self: end center;
`;

const StyledWallpaperSubTitle = styled(StyledSubTitle)`
  font-size: 150%;
  margin: 5px;
`;
const StyledWallpaperText = styled(StyledText)`
  font-size: 120%;
  margin-bottom: 0;
  place-self: end center;
`;

const EmergencyContactsContainer = styled.div`
  place-self: start center;
`;

const WallpaperFinal = () => {
  const firstName = useSelector((store) => store.user.profile.firstName);
  const surname = useSelector((store) => store.user.profile.surname);
  const contacts = useSelector((store) => store.user.contacts);
  const emergencyContacts = contacts.filter(item => item.contactType === "Emergency").slice(0, 2);
  return (
    <StyledWallpaper>
      <StyledImage src={logo} alt="Epilepsy symbol" />
      <StyledWallpaperSubTitle>Epilepsy</StyledWallpaperSubTitle>
      <StyledWallpaperText>My name is {firstName} {surname}.</StyledWallpaperText>
      <StyledWallpaperText>In case of seizure, please call:</StyledWallpaperText>
      <EmergencyContactsContainer>
        {emergencyContacts.map(contact => {
          return (<StyledWallpaperText key={contact._id}>{contact.contactFirstName} {contact.contactSurname} {contact.contactPhoneNumber}</StyledWallpaperText>)
        })}
      </EmergencyContactsContainer>
    </StyledWallpaper>
  );
};

export default WallpaperFinal;