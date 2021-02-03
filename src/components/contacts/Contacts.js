// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { fetchUserData } from "../../reducers/reusable";
import { useToggle } from "../../reducers/reusable";

import Contact from "./Contact";
import ContactRegistration from "./ContactRegistration";
import NavigationButton from "../buttons/NavigationButton";

import { StyledButton, StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";

const Contacts = ({ CONTACTS_URL, USERDATA_URL }) => {
  const dispatch = useDispatch();
  const [creationMode, toggleCreationMode] = useToggle();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  const contacts = useSelector((store) => store.user.contacts);

  useEffect(() => {
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StyledSection>
      <StyledSubTitle>Contacts</StyledSubTitle>
      <StyledText>This is where you can store your important contacts</StyledText>
      <NavigationButton route="" label="Back" />
      {creationMode && <ContactRegistration toggleCreationMode={toggleCreationMode} CONTACTS_URL={CONTACTS_URL} />}
      {!creationMode && <StyledButton onClick={toggleCreationMode}>Add</StyledButton>}
      {contacts.map(contact => {
        return (<Contact key={contact._id} contact={contact} CONTACTS_URL={CONTACTS_URL} ></Contact>)
      })}
    </StyledSection>
  )
};

export default Contacts;