import React from "react";

import { StyledCard } from "../../lib/Styling";
import { StyledCardText } from "../../lib/Styling";

const Contact = ({ contact }) => {
  return (
    <StyledCard type={contact.contactType}>
      <StyledCardText left>First Name:</StyledCardText>
      <StyledCardText>{contact.contactFirstName}</StyledCardText>
      <StyledCardText left>Surname:</StyledCardText>
      <StyledCardText>{contact.contactSurname}</StyledCardText>
      <StyledCardText left>Phone Number:</StyledCardText>
      <StyledCardText>{contact.contactPhoneNumber}</StyledCardText>
      <StyledCardText left>Relation:</StyledCardText>
      <StyledCardText>{contact.contactCategory}</StyledCardText>
    </StyledCard>
  );
};

export default Contact;