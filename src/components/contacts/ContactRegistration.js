import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { user } from "../../reducers/user";

import { StyledSection, StyledButton, StyledForm, StyledCardInput, StyledCardLabel, StyledCard, StyledCardSelect, StyledGrid } from "../../lib/Styling";

const ContactRegistration = ({ CONTACTS_URL, toggleCreationMode }) => {
  const dispatch = useDispatch();
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
  const [type, setType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");

  const handleEdit = (event) => {
    event.preventDefault();
    fetch(CONTACTS_URL, {
      method: "POST",
      body: JSON.stringify({
        contactType: type,
        contactFirstName: firstName,
        contactSurname: surname,
        contactPhoneNumber: phoneNumber, contactCategory: category
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => dispatch(user.actions.addContact(json)));
    toggleCreationMode();
  };

  return (
    <StyledSection>
      <StyledForm onSubmit={handleEdit}>
        <StyledCard>
          <StyledGrid>
            <StyledCardLabel htmlFor="type">
              Type:
          </StyledCardLabel>
            <StyledCardSelect
              id="type"
              required
              value={type}
              onChange={event => setType(event.target.value)} >
              <option value="" disabled>Choose a type</option>
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
            {!type && (
              <>
                <StyledCardLabel htmlFor="norelation">
                  Relation:
              </StyledCardLabel>
                <StyledCardSelect
                  id="norelation"
                  required
                  value={category}
                  onChange={event => setCategory(event.target.value)} >
                  <option value="" disabled>Choose a type first!</option>
                </StyledCardSelect>
              </>
            )}
            {type && (
              <>
                <StyledCardLabel htmlFor="relation">
                  Relation:
              </StyledCardLabel>
                <StyledCardSelect
                  id="relation"
                  required
                  value={category}
                  onChange={event => setCategory(event.target.value)} >
                  <option value="" disabled>Choose a category</option>
                  {contactTypes.find(item => item.name === type).categories.map(category => {
                    return (<option key={category} value={category}>{category}</option>)
                  })}
                </StyledCardSelect>
              </>
            )}
          </StyledGrid>
          <StyledButton small accent onClick={toggleCreationMode}>Cancel</StyledButton>
          <StyledButton small accent type="submit">Save</StyledButton>
        </StyledCard>
      </StyledForm>
    </StyledSection>
  )
};

export default ContactRegistration;