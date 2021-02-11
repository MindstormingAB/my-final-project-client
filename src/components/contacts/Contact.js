import React from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

import { deleteContact } from "../../reducers/reusable";
import { useToggle } from "../../reducers/reusable";

import ContactForm from "./ContactForm";

import { StyledButton, StyledCard, StyledGrid, StyledCardLink, StyledCardText } from "../../lib/Styling";

const Contact = ({ contact, CONTACTS_URL }) => {
  const dispatch = useDispatch()
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
          dispatch(deleteContact(CONTACTS_URL, localToken, localId, contactId));
          swal({
            title: "Entry deleted",
            icon: "success",
          });
        };
      });
  };

  const callHandler = phoneNumber => {
    window.open(`tel:${phoneNumber}`, "_self")
  }

  return (
    <>
      {editMode
        ? <ContactForm CONTACTS_URL={CONTACTS_URL} contact={contact} toggleEditMode={toggleEditMode} />
        : (
          <StyledCard>
            <StyledGrid>
              <StyledCardText left>Type:</StyledCardText>
              <StyledCardText>{contact.contactType}</StyledCardText>
              <StyledCardText left>First Name:</StyledCardText>
              <StyledCardText>{contact.contactFirstName}</StyledCardText>
              <StyledCardText left>Surname:</StyledCardText>
              <StyledCardText>{contact.contactSurname}</StyledCardText>
              <StyledCardText left>Phone Number:</StyledCardText>
              <StyledCardLink onClick={() => callHandler(contact.contactPhoneNumber)}>{contact.contactPhoneNumber}</StyledCardLink>
              <StyledCardText left>Relation:</StyledCardText>
              <StyledCardText>{contact.contactCategory}</StyledCardText>
            </StyledGrid>
            <StyledButton small onClick={handleDeleteContact}>Delete</StyledButton>
            <StyledButton small onClick={toggleEditMode}>Edit</StyledButton>
          </StyledCard>
        )
      }
    </>
  );
};

export default Contact;