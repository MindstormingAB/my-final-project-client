import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { StyledCard, StyledGrid } from "../../lib/Styling";
import { StyledCardText } from "../../lib/Styling";

const ProfileCard = () => {
  const { email, firstName, surname, birthDate } = useSelector((store) => store.user.profile);

  return (
    <StyledCard>
      <StyledGrid>
        <StyledCardText left>Email:</StyledCardText>
        <StyledCardText>{email}</StyledCardText>
        <StyledCardText left>First name:</StyledCardText>
        <StyledCardText>{firstName}</StyledCardText>
        <StyledCardText left>Surname:</StyledCardText>
        <StyledCardText>{surname}</StyledCardText>
        <StyledCardText left>Birth date</StyledCardText>
        <StyledCardText>{!birthDate ? "" : moment(birthDate).format("ddd DD MMM YYYY")}</StyledCardText>
      </StyledGrid>
    </StyledCard>
  )
};

export default ProfileCard;