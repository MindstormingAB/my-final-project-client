import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import NavigationButton from "../buttons/NavigationButton";

import { StyledSection, StyledButton, StyledForm, StyledCardInput, StyledCardLabel, StyledSubTitle, StyledText, StyledCardWithGrid, StyledCardSelect, StyledCardText } from "../../lib/Styling";

const SeizureRegistration = ({ SEIZURES_URL }) => {
  const seizureTypes = [
    {
      name: "absence",
      description: "generalized seizure formerly known as petit mal, can cause rapid blinking or a few seconds of staring into space"
    },
    {
      name: "tonic-clonic/convulsive",
      description: "generalized seizure formerly known as grand mal, can make a person cry out, lose consciousness, fall to the ground and have muscle jerks or spasms"
    },
    {
      name: "atonic",
      description: "generalized seizure also known as drop attacks, when muscles in the body relax"
    },
    {
      name: "tonic",
      description: "generalized seizure when muscles in the body become stiff"
    },
    {
      name: "clonic",
      description: "generalized seizure with periods of shaking or jerking parts on the body"
    },
    {
      name: "myoclonic",
      description: "generalized seizure with short jerking in parts of the body"
    },
    {
      name: "simple focal",
      description: "focal seizure with retained awareness that can cause twitching or a change in sensation, such as a strange taste or smell"
    },
    {
      name: "complex focal",
      description: "focal seizure with a loss awareness can make a person confused or dazed."
    },
    {
      name: "secondary generalized",
      description: "seizure starting in one part of the brain as a focal seizure but evolving into a generalized seizure when spreading to both sides of the brain"
    }
  ];

  const history = useHistory();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const [date, setDate] = useState("");
  const [lengthHours, setLengthHours] = useState(0);
  const [lengthMinutes, setLengthMinutes] = useState(0);
  const [lengthSeconds, setLengthSeconds] = useState(0);
  const [type, setType] = useState("");
  const [trigger, setTrigger] = useState("");
  const [comment, setComment] = useState("");

  const handleEdit = (event) => {
    event.preventDefault();
    fetch(SEIZURES_URL, {
      method: "POST",
      body: JSON.stringify({
        seizureDate: date,
        seizureLength: { hours: lengthHours, minutes: lengthMinutes, seconds: lengthSeconds },
        seizureType: type,
        seizureTrigger: trigger,
        seizureComment: comment
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
    })
      .then(history.push("/seizures"))
  };

  return (
    <StyledSection>
      <StyledSubTitle>Add a new seizure</StyledSubTitle>
      <StyledText>Fill the form below to register a new seizure</StyledText>
      <StyledForm onSubmit={handleEdit}>
        <StyledCardWithGrid>
          <StyledCardLabel htmlFor="date">
            Date:
          </StyledCardLabel>
          <StyledCardInput
            id="date"
            type="datetime-local"
            value={date}
            onChange={event => setDate(event.target.value)} >
          </StyledCardInput>
          <StyledCardText>Duration</StyledCardText>
          <StyledCardText>
            <StyledCardInput
              aria-label="hours"
              type="number"
              value={lengthHours}
              onChange={event => setLengthHours(event.target.value)}
            >
            </StyledCardInput>
            <StyledCardInput
              aria-label="minutes"
              type="number"
              value={lengthMinutes}
              onChange={event => setLengthMinutes(event.target.value)}
            >
            </StyledCardInput>
            <StyledCardInput
              aria-label="seconds"
              type="number"
              value={lengthSeconds}
              onChange={event => setLengthSeconds(event.target.value)}
            >
            </StyledCardInput>
          </StyledCardText>
          <StyledCardLabel htmlFor="type">
            Type:
          </StyledCardLabel>
          <StyledCardSelect
            id="type"
            required
            value={type}
            onChange={event => setType(event.target.value)} >
            <option value="" disabled>Choose a type</option>
            {seizureTypes.map(type => {
              return (<option key={type.name} value={type.name}>{type.name}</option>)
            })}
          </StyledCardSelect>
          <StyledCardLabel htmlFor="trigger">
            Trigger:
          </StyledCardLabel>
          <StyledCardInput
            id="trigger"
            type="text"
            value={trigger}
            onChange={event => setTrigger(event.target.value)} >
          </StyledCardInput>
          <StyledCardLabel htmlFor="comment">
            Comment:
          </StyledCardLabel>
          <StyledCardInput
            id="comment"
            type="text"
            value={comment}
            onChange={event => setComment(event.target.value)} >
          </StyledCardInput>
        </StyledCardWithGrid>
        <StyledButton type="submit">Save</StyledButton>
        <NavigationButton route="seizures" label="Cancel" />
      </StyledForm>
    </StyledSection>
  )
};

export default SeizureRegistration;