import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { fetchUserData } from "../../reducers/reusable";
import { ui } from "../../reducers/ui";

import { EmergencyContactsContainer, StyledImage, StyledLoaderSection, StyledWallpaper, StyledWallpaperSubTitle, StyledWallpaperText } from "../../lib/Styling";

import logo from "../../assets/epilepsy-SE.jpg";

const WallpaperFinal = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  const firstName = useSelector((store) => store.user.profile.firstName);
  const surname = useSelector((store) => store.user.profile.surname);
  const contacts = useSelector((store) => store.user.contacts);
  const emergencyContacts = contacts.filter(item => item.contactType === "Emergency").slice(0, 2);

  useEffect(() => {
    if (!localId) {
      history.push("/");
    } else if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
      dispatch(ui.actions.setFullScreen(true));
    } else {
      dispatch(ui.actions.setFullScreen(true));
    }
    return () => {
      dispatch(ui.actions.setFullScreen(false));
      console.log("Unmount");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StyledLoaderSection>
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
    </StyledLoaderSection>
  );
};

export default WallpaperFinal;