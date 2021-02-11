import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { fetchUserData } from "../../reducers/reusable";
import { useToggle } from "../../reducers/reusable";

import Seizure from "./Seizure";
import SeizureRegistration from "./SeizureRegistration";
import NavigationButton from "../buttons/NavigationButton";

import { StyledTitle, StyledButton, StyledSection, StyledText } from "../../lib/Styling";

const Seizures = ({ SEIZURES_URL, USERDATA_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [creationMode, toggleCreationMode] = useToggle();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  const seizures = useSelector((store) => store.user.seizures);
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
          <StyledTitle>Seizures</StyledTitle>
          <StyledText>You can keep track of your seizures in this section.</StyledText>
          {!creationMode && <StyledButton onClick={toggleCreationMode}>Add</StyledButton>}
          <NavigationButton route="" label="Back" />
          {creationMode && <SeizureRegistration toggleCreationMode={toggleCreationMode} SEIZURES_URL={SEIZURES_URL} />}
          {seizures.map(seizure => {
            return (<Seizure key={seizure._id} seizure={seizure} SEIZURES_URL={SEIZURES_URL}></Seizure>)
          })}
        </StyledSection>
      }
    </>
  )
};

export default Seizures;