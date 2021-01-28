import React, { useState, useEffect } from "react";

import Contact from "./Contact";
import NavigationButton from "./NavigationButton";

import { StyledSection } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";

const Contacts = ({ CONTACTS_URL }) => {
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
        console.log(json);
        setContacts(json);
      })
      .catch(error => console.error(error));
    // eslint-disable-next-line
  }, []);

  return (
    <StyledSection>
      <StyledSubTitle>Contacts</StyledSubTitle>
      <StyledText>This is where you can store your important contacts</StyledText>
      {contacts.map(contact => {
        return (<Contact key={contact._id} contact={contact}></Contact>)
      })}
      <NavigationButton route="" label="Back" />
    </StyledSection>
  )
};

export default Contacts;