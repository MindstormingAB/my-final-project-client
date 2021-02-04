import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { fetchUserData } from "../../reducers/reusable";
import { useToggle } from "../../reducers/reusable";

import Seizure from "./Seizure";
import SeizureRegistration from "./SeizureRegistration";
import NavigationButton from "../buttons/NavigationButton";

import { StyledButton, StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";

const Seizures = ({ SEIZURES_URL, USERDATA_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [creationMode, toggleCreationMode] = useToggle();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  const seizures = useSelector((store) => store.user.seizures);

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