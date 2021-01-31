import React from "react";
import swal from "sweetalert";

import { useToggle } from "../../reducers/reusable";

import ContactForm from "./ContactForm";

import { StyledCardButton, StyledCardWithGrid } from "../../lib/Styling";
import { StyledCardText } from "../../lib/Styling";

const Contact = ({ contact, CONTACTS_URL }) => {
  const [editMode, toggleEditMode] = useToggle();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const contactId = contact._id;

  const handleDeleteContact = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(CONTACTS_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, contactId: contactId },
          })
            .then(window.location.reload())
        }
      })
  };

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
            <StyledCardButton onClick={handleDeleteContact}>Delete</StyledCardButton>
            <StyledCardButton onClick={toggleEditMode}>Edit</StyledCardButton>
          </StyledCardWithGrid>
        )
      }
    </>
  );
};

export default Contact;