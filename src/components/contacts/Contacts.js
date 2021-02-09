import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [creationMode, toggleCreationMode] = useToggle();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  const contacts = useSelector((store) => store.user.contacts);
  const isLoading = useSelector((store) => store.ui.isLoading)

  useEffect(() => {
    if (!localId) {
      history.push("/");
    }
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!isLoading &&
        <StyledSection>
          <StyledSubTitle>Contacts</StyledSubTitle>
          <StyledText>This is where you can store your important contacts</StyledText>
          {!creationMode && <StyledButton onClick={toggleCreationMode}>Add</StyledButton>}
          <NavigationButton route="" label="Back" />
          {creationMode && <ContactRegistration toggleCreationMode={toggleCreationMode} CONTACTS_URL={CONTACTS_URL} />}
          {contacts.map(contact => {
            return (<Contact key={contact._id} contact={contact} CONTACTS_URL={CONTACTS_URL} ></Contact>)
          })}
        </StyledSection>
      }
    </>
  )
};

export default Contacts;