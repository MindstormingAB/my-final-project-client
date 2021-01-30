import React from "react";

import { useToggle } from "../../reducers/reusable";

import ContactForm from "./ContactForm";

import { StyledButton, StyledCardWithGrid } from "../../lib/Styling";
import { StyledCardText } from "../../lib/Styling";

const Contact = ({ contact, CONTACTS_URL }) => {
  const [editMode, toggleEditMode] = useToggle();
  return (
    <>
      {editMode
        ? <ContactForm CONTACTS_URL={CONTACTS_URL} contact={contact} toggleEditMode={toggleEditMode} />
        : (
          <StyledCardWithGrid>
            <StyledCardText left>Type:</StyledCardText>
            <StyledCardText>{contact.contactType}</StyledCardText>
            <StyledCardText left>First Name:</StyledCardText>
            <StyledCardText>{contact.contactFirstName}</StyledCardText>
            <StyledCardText left>Surname:</StyledCardText>
            <StyledCardText>{contact.contactSurname}</StyledCardText>
            <StyledCardText left>Phone Number:</StyledCardText>
            <StyledCardText>{contact.contactPhoneNumber}</StyledCardText>
            <StyledCardText left>Relation:</StyledCardText>
            <StyledCardText>{contact.contactCategory}</StyledCardText>
            <StyledButton onClick={toggleEditMode}>Edit</StyledButton>
          </StyledCardWithGrid>
        )
      }
    </>
  );
};

export default Contact;