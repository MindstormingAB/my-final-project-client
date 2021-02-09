import React from "react";
import { useSelector } from "react-redux";

import { StyledLoaderSection, StyledLoader } from "../lib/Styling";

const LoaderPage = () => {
  const isLoading = useSelector((store) => store.ui.isLoading)
  return (
    <>
      {isLoading && (
        <StyledLoaderSection>
          <StyledLoader />
        </StyledLoaderSection>
      )}
    </>
  );
};

export default LoaderPage;