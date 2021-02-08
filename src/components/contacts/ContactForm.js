import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import { updateContact } from "../../reducers/reusable";

import { StyledCardSelect, StyledCard, StyledForm, StyledCardInput, StyledCardLabel, StyledGrid, StyledButton } from "../../lib/Styling";

const ContactForm = ({ CONTACTS_URL, contact, toggleEditMode }) => {
  const dispatch = useDispatch()
  const storedContactTypes = useSelector((store) => store.user.contactTypes);
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const contactId = contact._id;

  const [type, setType] = useState(contact.contactType);
  const [firstName, setFirstName] = useState(contact.contactFirstName);
  const [surname, setSurname] = useState(contact.contactSurname);
  const [phoneNumber, setPhoneNumber] = useState(contact.contactPhoneNumber);
  const [category, setCategory] = useState(contact.contactCategory);
  const [newType, setNewType] = useState("");

  const updatedContact = { contactId, type, firstName, surname, phoneNumber, category };

  const handleEdit = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You are about to save changes for this contact.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willSave) => {
        if (willSave) {
          dispatch(updateContact(CONTACTS_URL, localToken, localId, updatedContact));
          toggleEditMode();
        }
      })
  };

  return (
    <StyledForm onSubmit={handleEdit}>
      <StyledCard>
        <StyledGrid>
          <StyledCardLabel htmlFor="type">
            Type:
        </StyledCardLabel>
          <StyledCardSelect
            id="type"
            required
            defaultValue={type}
            onChange={event => {
              setType(event.target.value);
              setNewType(event.target.value);
            }
            } >
            <option value={type} disabled>{type}</option>
            {storedContactTypes.map(type => {
              return (<option key={type.name} value={type.name}>{type.name}</option>)
            })}
          </StyledCardSelect>
          <StyledCardLabel htmlFor="firstname">
            First name:
        </StyledCardLabel>
          <StyledCardInput
            required
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
            required
            id="phonenumber"
            minLength="2"
            type="tel"
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)} >
          </StyledCardInput>
          {!newType && (
            <>
              <StyledCardLabel htmlFor="noChangeRelation">
                Relation:
              </StyledCardLabel>
              <StyledCardSelect
                id="noChangeRelation"
                required
                defaultValue={category}
                onChange={event => setCategory(event.target.value)} >
                <option value={category} disabled>{category}</option>
                {storedContactTypes.find(item => item.name === type).categories.map(category => {
                  return (<option key={category} value={category}>{category}</option>)
                })}
              </StyledCardSelect>
            </>
          )}
          {newType && (
            <>
              <StyledCardLabel htmlFor="changeRelation">
                Relation:
              </StyledCardLabel>
              <StyledCardSelect
                id="changeRelation"
                required
                defaultValue=""
                onChange={event => setCategory(event.target.value)} >
                <option value="" disabled>Choose a category</option>
                {storedContactTypes.find(item => item.name === type).categories.map(category => {
                  return (<option key={category} value={category}>{category}</option>)
                })}
              </StyledCardSelect>
            </>
          )}
        </StyledGrid>
        <StyledButton small accent onClick={toggleEditMode}>Cancel</StyledButton>
        <StyledButton small accent type="submit">Save</StyledButton>
      </StyledCard>
    </StyledForm>
  )
};

export default ContactForm;