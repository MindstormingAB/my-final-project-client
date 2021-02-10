import React from "react";
import { useSelector } from "react-redux";

import { StyledFooter } from "../lib/Styling";

const Footer = () => {
  const isFullScreen = useSelector((store) => store.ui.isFullScreen);
  return (
    <>
      {!isFullScreen &&
        <StyledFooter>Application developed by Sandrine Elander</StyledFooter>
      }
    </>
  )
};

export default Footer;