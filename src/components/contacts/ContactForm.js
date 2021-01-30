import React, { useState } from "react";

import { StyledButton, StyledCard, StyledForm, StyledInput, StyledLabel } from "../../lib/Styling";

const ContactForm = ({ CONTACTS_URL, contact, toggleEditMode }) => {
  const contactTypes = [
    {
      name: "Emergency",
      categories: [
        "parent",
        "partner",
        "sibling",
        "friend",
        "relative"
      ]
    },
    {
      name: "Healthcare",
      categories: [
        "doctor",
        "hospital",
        "welfare center"
      ]
    }
  ];

  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const contactId = contact._id;
  const currentType = contact.contactType;
  const currentFirstName = contact.contactFirstName;
  const currentSurname = contact.contactSurname;
  const currentPhoneNumber = contact.contactPhoneNumber;
  const currentCategory = contact.contactCategory;

  const [type, setType] = useState(currentType);
  const [firstName, setFirstName] = useState(currentFirstName);
  const [surname, setSurname] = useState(currentSurname);
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
  const [category, setCategory] = useState(currentCategory);

  const handleEdit = (event) => {
    event.preventDefault();
    fetch(CONTACTS_URL, {
      method: "PATCH",
      body: JSON.stringify({ contactType: type, contactFirstName: firstName, contactSurname: surname, contactPhoneNumber: phoneNumber, contactCategory: category }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, contactId: contactId },
    })
      .then(window.location.reload())
      .then(toggleEditMode())
  };

  return (
    <StyledForm onSubmit={handleEdit}>
      <StyledCard>
        <StyledLabel>
          Type:
          <select
            required
            value={type}
            onChange={event => setType(event.target.value)} >
            {contactTypes.map(type => {
              return (<option key={type.name} value={type.name}>{type.name}</option>)
            })}
          </select>
        </StyledLabel>
        <StyledLabel>
          First name:
          <StyledInput
            minLength="2"
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)} >
          </StyledInput>
        </StyledLabel>
        <StyledLabel>
          Surname:
          <StyledInput
            minLength="2"
            type="text"
            value={surname}
            onChange={event => setSurname(event.target.value)} >
          </StyledInput>
        </StyledLabel>
        <StyledLabel>
          Phone Number:
          <StyledInput
            minLength="2"
            type="tel"
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)} >
          </StyledInput>
        </StyledLabel>
        <StyledLabel>
          Relation:
          <select
            required
            value={category}
            onChange={event => setCategory(event.target.value)} >
            {contactTypes.find(item => item.name === type).categories.map(category => {
              return (<option key={category} value={category}>{category}</option>)
            })}
          </select>
        </StyledLabel>
      </StyledCard>
      <StyledButton type="submit">Save</StyledButton>
      <StyledButton onClick={toggleEditMode}>Cancel</StyledButton>
    </StyledForm>
  )
};

export default ContactForm;