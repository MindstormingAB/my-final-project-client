import React from "react";

import { StyledCard } from "../lib/Styling";
import { StyledCardText } from "../lib/Styling";

const Seizure = ({ seizure }) => {
  return (
    <StyledCard type={seizure.contactType}>
      <StyledCardText left>Date:</StyledCardText>
      <StyledCardText>{seizure.seizureDate}</StyledCardText>
      <StyledCardText left>Length:</StyledCardText>
      <StyledCardText>{seizure.seizureLength.hours}h {seizure.seizureLength.minutes}m {seizure.seizureLength.seconds}s</StyledCardText>
      <StyledCardText left>Seizure type:</StyledCardText>
      <StyledCardText>{seizure.seizureType}</StyledCardText>
      <StyledCardText left>Trigger:</StyledCardText>
      <StyledCardText>{seizure.seizureTrigger}</StyledCardText>
      <StyledCardText left>Comment:</StyledCardText>
      <StyledCardText>{seizure.seizureComment}</StyledCardText>
    </StyledCard>
  );
};

export default Seizure;