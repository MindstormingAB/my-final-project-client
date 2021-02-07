import React from "react";
import styled from "styled-components/macro";

import WallpaperFinal from "./WallpaperFinal";

import { StyledButton, StyledSection } from "../../lib/Styling";

const StyledScreen = styled.div`
  width: 183px;
  height: 325px;
  border-radius: 15px;
  border: 1px solid black;
  font-size: 10px;
`;

const WallpaperPreview = ({ progressWallpaperProcess, reverseWallpaperProcess }) => {
  return (
    <>
      <StyledSection>
        <StyledScreen>
          <WallpaperFinal />
        </StyledScreen>
      </StyledSection>
      <StyledButton onClick={progressWallpaperProcess}>Create wallpaper</StyledButton>
      <StyledButton onClick={reverseWallpaperProcess}>Back</StyledButton>
    </>
  );
};

export default WallpaperPreview;