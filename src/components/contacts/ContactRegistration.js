import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import NavigationButton from "../buttons/NavigationButton";

import { StyledSection, StyledButton, StyledCard, StyledForm, StyledInput, StyledLabel } from "../../lib/Styling";

const ContactRegistration = ({ CONTACTS_URL }) => {
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

  const history = useHistory();
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
      body: JSON.stringify({ contactType: type, contactFirstName: firstName, contactSurname: surname, contactPhoneNumber: phoneNumber, contactCategory: category }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
    })
      .then(history.push("/contacts"))
  };

  return (
    <StyledSection>
      <StyledForm onSubmit={handleEdit}>
        <StyledCard>
          <StyledLabel>
            Type:
            <select
              required
              value={type}
              onChange={event => setType(event.target.value)} >
              <option value="" selected disabled>Choose a type</option>
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
          {!type && (
            <StyledLabel>
              Relation:
              <select
                required
                value={category}
                onChange={event => setCategory(event.target.value)} >
                <option value="" selected disabled>Choose a type first!</option>
              </select>
            </StyledLabel>
          )}
          {type && (
            <StyledLabel>
              Relation:
              <select
                required
                value={category}
                onChange={event => setCategory(event.target.value)} >
                <option value="" selected disabled>Choose a category</option>
                {contactTypes.find(item => item.name === type).categories.map(category => {
                  return (<option key={category} value={category}>{category}</option>)
                })}
              </select>
            </StyledLabel>
          )}
        </StyledCard>
        <StyledButton type="submit">Save</StyledButton>
        <NavigationButton route="contacts" label="Cancel" />
      </StyledForm>
      {/* <StyledForm onSubmit={handleEdit}>
        <StyledCard>
          <StyledLabel>
            Type:
            <select
              required
              value={type}
              onChange={event => setType(event.target.value)} >
              <option defaultValue="" disabled>{type}</option>
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
              <option defaultvalue="" disabled>{category}</option>
            </select>
          </StyledLabel>
        </StyledCard>
        <StyledButton type="submit">Save</StyledButton>
        <StyledButton onClick={history.push("/contacts")}>Cancel</StyledButton>
      </StyledForm> */}
    </StyledSection>
  )
};

export default ContactRegistration;