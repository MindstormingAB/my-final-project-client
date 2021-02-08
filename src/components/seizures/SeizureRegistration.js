import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerSeizure } from "../../reducers/reusable";

import { StyledSection, StyledForm, StyledCardInput, StyledCardLabel, StyledCard, StyledCardSelect, StyledCardText, StyledDurationInput, StyledButton, StyledGrid } from "../../lib/Styling";

const SeizureRegistration = ({ SEIZURES_URL, toggleCreationMode }) => {
  const dispatch = useDispatch();
  const storedSeizureTypes = useSelector((store) => store.user.seizureTypes);
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const [date, setDate] = useState("");
  const [lengthHours, setLengthHours] = useState(0);
  const [lengthMinutes, setLengthMinutes] = useState(0);
  const [lengthSeconds, setLengthSeconds] = useState(0);
  const [type, setType] = useState("");
  const [trigger, setTrigger] = useState("");
  const [comment, setComment] = useState("");

  const newSeizure = { date, lengthHours, lengthMinutes, lengthSeconds, type, trigger, comment };

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(registerSeizure(SEIZURES_URL, localToken, localId, newSeizure));
    toggleCreationMode();
  };

  return (
    <StyledSection>
      <StyledForm onSubmit={handleEdit}>
        <StyledCard>
          <StyledGrid>
            <StyledCardLabel htmlFor="date">
              Date:
          </StyledCardLabel>
            <StyledCardInput
              id="date"
              type="datetime-local"
              value={date}
              onChange={event => setDate(event.target.value)} >
            </StyledCardInput>
            <StyledCardText left>Duration</StyledCardText>
            <StyledCardText>
              <StyledDurationInput
                aria-label="hours"
                type="number"
                value={lengthHours}
                onChange={event => setLengthHours(event.target.value)}
              >
              </StyledDurationInput>
          h
          <StyledDurationInput
                aria-label="minutes"
                type="number"
                value={lengthMinutes}
                onChange={event => setLengthMinutes(event.target.value)}
              >
              </StyledDurationInput>
          m
          <StyledDurationInput
                aria-label="seconds"
                type="number"
                value={lengthSeconds}
                onChange={event => setLengthSeconds(event.target.value)}
              >
              </StyledDurationInput>
          s
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
              {storedSeizureTypes.map(type => {
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
          </StyledGrid>
          <StyledButton small accent onClick={toggleCreationMode}>Cancel</StyledButton>
          <StyledButton small accent type="submit">Save</StyledButton>
        </StyledCard>
      </StyledForm>
    </StyledSection>
  )
};

export default SeizureRegistration;