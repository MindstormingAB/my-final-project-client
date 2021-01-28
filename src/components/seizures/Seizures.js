import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { user } from "../../reducers/user";

import Seizure from "./Seizure";
import NavigationButton from "../buttons/NavigationButton";

import { StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";

const Seizures = ({ SEIZURES_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const [seizures, setSeizures] = useState([]);

  useEffect(() => {
    fetch(SEIZURES_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        setSeizures(json);
        dispatch(user.actions.setSeizures({ seizures: json }));
      })
      .catch(error => console.error(error));
    // eslint-disable-next-line
  }, []);

  return (
    <StyledSection>
      <StyledSubTitle>Seizures</StyledSubTitle>
      <StyledText>This is where you can keep track of your seizures</StyledText>
      {seizures.map(seizure => {
        return (<Seizure key={seizure._id} seizure={seizure}></Seizure>)
      })}
      <NavigationButton route="" label="Back" />
    </StyledSection>
  )
};

export default Seizures;