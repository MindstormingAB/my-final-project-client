import React, { useState } from "react";

import { InvertedStyledCardButton, StyledCardSelect, StyledCardWithGrid, StyledForm, StyledCardInput, StyledCardLabel } from "../../lib/Styling";

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
      <StyledCardWithGrid>
        <StyledCardLabel htmlFor="type">
          Type:
          </StyledCardLabel>
        <StyledCardSelect
          id="type"
          required
          value={type}
          onChange={event => setType(event.target.value)} >
          <option defaultValue={type} disabled>{type}</option>
          {contactTypes.map(type => {
            return (<option key={type.name} value={type.name}>{type.name}</option>)
          })}
        </StyledCardSelect>
        <StyledCardLabel htmlFor="firstname">
          First name:
          </StyledCardLabel>
        <StyledCardInput
          id="firstname"
          minLength="2"
          type="text"
          value={firstName}
          onChange={event => setFirstName(event.target.value)} >
        </StyledCardInput>
        <StyledCardLabel htmlFor="surname">
          Surname:
          </StyledCardLabel>
        <StyledCardInput
          id="surname"
          minLength="2"
          type="text"
          value={surname}
          onChange={event => setSurname(event.target.value)} >
        </StyledCardInput>
        <StyledCardLabel htmlFor="phonenumber">
          Phone Number:
          </StyledCardLabel>
        <StyledCardInput
          id="phonenumber"
          minLength="2"
          type="tel"
          value={phoneNumber}
          onChange={event => setPhoneNumber(event.target.value)} >
        </StyledCardInput>
        <StyledCardLabel htmlFor="relation">
          Relation:
          </StyledCardLabel>
        <StyledCardSelect
          id="relation"
          required
          value={category}
          onChange={event => setCategory(event.target.value)} >
          <option defaultValue={category} disabled>{category}</option>
          {contactTypes.find(item => item.name === type).categories.map(category => {
            return (<option key={category} value={category}>{category}</option>)
          })}
        </StyledCardSelect>
        <InvertedStyledCardButton type="submit">Save</InvertedStyledCardButton>
        <InvertedStyledCardButton onClick={toggleEditMode}>Cancel</InvertedStyledCardButton>
      </StyledCardWithGrid>
    </StyledForm>
  )
};

export default ContactForm;