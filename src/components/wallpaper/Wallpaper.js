import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import WallpaperPreview from "./WallpaperPreview";
import WallpaperFinal from "./WallpaperFinal";

import { fetchUserData } from "../../reducers/reusable";

import NavigationButton from "../buttons/NavigationButton";

import { StyledButton, StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";

const Wallpaper = ({ USERDATA_URL, wallpaperStep, progressWallpaperProcess, reverseWallpaperProcess }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  // const contacts = useSelector((store) => store.user.contacts);
  // const emergencyContacts = contacts.filter(item => item.contactType === "Emergency");

  useEffect(() => {
    if (!localId) {
      history.push("/");
    }
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  // const progressWallpaperProcess = () => {
  //   setWallpaperStep(wallpaperStep + 1);
  // };

  // const reverseWallpaperProcess = () => {
  //   setWallpaperStep(wallpaperStep - 1);
  // };

  // const handleContactCheck = event => {
  //   setWallpaperContacts(...wallpaperContacts, event.target.value);
  //   console.log(wallpaperContacts);
  // };

  return (
    <>
      {(wallpaperStep !== 2) && <StyledSubTitle>Wallpaper</StyledSubTitle>}
      {(wallpaperStep === 0) && (
        <StyledSection>
          <StyledText>In the Epilepsy App, you can create a wallpaper for your mobile phone.</StyledText>
          <StyledText>This wallpaper will tell people that you are an epileptic and who to contact in case of seizure.</StyledText>
          <StyledText>Click on Preview to generate a wallpaper image with your 2 most recent emergency contacts.</StyledText>
          {/* <StyledText>Start the wallpaper creation process by clicking on Start and follow the different steps until your wallpaper image is generated.</StyledText> */}
          <StyledText>If you are satisfied with the preview, click on Create and take a screen shot of the result. The image will be saved on your mobile phone, available to be used as wallpaper.</StyledText>
          <StyledText>Reload the page when you are done to get back to the application.</StyledText>
          <StyledButton onClick={progressWallpaperProcess}>Preview</StyledButton>
          <NavigationButton route="" label="Back" />
        </StyledSection>
      )}
      {/* {(wallpaperStep === 1) &&
        <WallpaperContacts
          emergencyContacts={emergencyContacts}
          progressWallpaperProcess={progressWallpaperProcess}
          reverseWallpaperProcess={reverseWallpaperProcess}
          onContactCheck={handleContactCheck}
        />} */}
      {(wallpaperStep === 1) &&
        <WallpaperPreview
          progressWallpaperProcess={progressWallpaperProcess}
          reverseWallpaperProcess={reverseWallpaperProcess}
        />}
      {(wallpaperStep === 2) &&
        <WallpaperFinal />}
    </>
  );
};

export default Wallpaper;