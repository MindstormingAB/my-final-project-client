import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { user } from "../../reducers/user";
import { useToggle } from "../../reducers/reusable";

import Seizure from "./Seizure";
import SeizureRegistration from "./SeizureRegistration";
import NavigationButton from "../buttons/NavigationButton";

import { StyledButton, StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";

const Seizures = ({ SEIZURES_URL, USERDATA_URL }) => {
  const dispatch = useDispatch();
  const [creationMode, toggleCreationMode] = useToggle();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedFirstName = useSelector((store) => store.user.profile.firstName);
  const seizures = useSelector((store) => store.user.seizures);

  useEffect(() => {
    if (!storedFirstName) {
      fetchUserData();
    }
    // eslint-disable-next-line
  }, []);

  const fetchUserData = () => {
    fetch(USERDATA_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setEmail({ email: json.email }));
        dispatch(user.actions.setFirstName({ firstName: json.firstName }));
        dispatch(user.actions.setSurname({ surname: json.surname }));
        dispatch(user.actions.setBirthDate({ birthDate: json.birthDate }));
        dispatch(user.actions.setSeizures({ seizures: json.seizures }));
        dispatch(user.actions.setContacts({ contacts: json.contacts }));
      })
      .catch(error => console.error(error));
  };

  return (
    <StyledSection>
      <StyledSubTitle>Seizures</StyledSubTitle>
      <StyledText>This is where you can keep track of your seizures</StyledText>
      <NavigationButton route="" label="Back" />
      {creationMode && <SeizureRegistration toggleCreationMode={toggleCreationMode} SEIZURES_URL={SEIZURES_URL} />}
      {!creationMode && <StyledButton onClick={toggleCreationMode}>Add</StyledButton>}
      {seizures.map(seizure => {
        return (<Seizure key={seizure._id} seizure={seizure} SEIZURES_URL={SEIZURES_URL}></Seizure>)
      })}
    </StyledSection>
  )
};

export default Seizures;