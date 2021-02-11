import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { fetchUserData } from "../../reducers/reusable";

import NavigationButton from "../buttons/NavigationButton";

import { StyledSection, StyledTitle, StyledText } from "../../lib/Styling";

const Wallpaper = ({ USERDATA_URL, wallpaperStep, progressWallpaperProcess, reverseWallpaperProcess }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);

  useEffect(() => {
    if (!localId) {
      history.push("/");
    }
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StyledSection>
      <StyledTitle>Wallpaper</StyledTitle>
      <StyledText>In the Epilepsy App, you can create a wallpaper for your mobile phone. This wallpaper will tell people that you are an epileptic and who to contact in case of seizure.</StyledText>
      <StyledText>Click on Preview to generate a wallpaper image with your 2 most recent emergency contacts. If you are satisfied with the preview, take a screen shot of the result. The image will be saved on your mobile phone, available to be used as wallpaper.</StyledText>
      <StyledText>Swipe back to this page when you are done to get back to the application.</StyledText>
      <NavigationButton route="wallpaper/preview" label="Preview" />
      <NavigationButton route="" label="Back" />
    </StyledSection>
  );
};

export default Wallpaper;