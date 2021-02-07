import React from "react";

import { StyledButton, StyledForm, StyledSection } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";

const WallpaperContacts = ({
  emergencyContacts,
  progressWallpaperProcess,
  reverseWallpaperProcess,
  onContactCheck
}) => {
  return (
    <StyledSection>
      <StyledText>Select your emergency contacts (max 2).</StyledText>
      <StyledForm>
        {emergencyContacts.map(item => {
          return (
            <label key={item._id} htmlFor={item._id}>
              {item.contactFirstName} {item.contactSurname}
              <input
                id={item._id}
                type="checkbox"
                name="contacts"
                value={item}
                onClick={onContactCheck}
                checked
              >
              </input>
            </label>
          )
        })}
      </StyledForm>
      <StyledButton onClick={progressWallpaperProcess}>Preview</StyledButton>
      <StyledButton onClick={reverseWallpaperProcess}>Back</StyledButton>
    </StyledSection>
  );
};

export default WallpaperContacts;