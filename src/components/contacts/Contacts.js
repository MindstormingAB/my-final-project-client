import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { user } from "../../reducers/user";

import Contact from "./Contact";
import NavigationButton from "../buttons/NavigationButton";

import { StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";

const Contacts = ({ CONTACTS_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(CONTACTS_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        setContacts(json);
        dispatch(user.actions.setContacts({ contacts: json }));
      })
      .catch(error => console.error(error));
    // eslint-disable-next-line
  }, []);

  return (
    <StyledSection>
      <StyledSubTitle>Contacts</StyledSubTitle>
      <StyledText>This is where you can store your important contacts</StyledText>
      {contacts.map(contact => {
        return (<Contact key={contact._id} contact={contact} CONTACTS_URL={CONTACTS_URL} ></Contact>)
      })}
      <NavigationButton route="contacts/add" label="Add" />
      <NavigationButton route="" label="Back" />
    </StyledSection>
  )
};

export default Contacts;