import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import moment from "moment";

import { user } from "../../reducers/user";

import { StyledButton, StyledCardSelect, StyledCard, StyledForm, StyledCardInput, StyledCardLabel, StyledCardText, StyledDurationInput, StyledGrid } from "../../lib/Styling";

const SeizureForm = ({ SEIZURES_URL, seizure, toggleEditMode }) => {
  const dispatch = useDispatch()
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
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const seizureId = seizure._id;

  const [date, setDate] = useState(moment(seizure.seizureDate).format("YYYY-MM-DDTHH:mm"));
  const [lengthHours, setLengthHours] = useState(seizure.seizureLength.hours);
  const [lengthMinutes, setLengthMinutes] = useState(seizure.seizureLength.minutes);
  const [lengthSeconds, setLengthSeconds] = useState(seizure.seizureLength.seconds);
  const [type, setType] = useState(seizure.seizureType);
  const [trigger, setTrigger] = useState(seizure.seizureTrigger);
  const [comment, setComment] = useState(seizure.seizureComment);

  const updatedSeizure = { seizureId, date, lengthHours, lengthMinutes, lengthSeconds, type, trigger, comment };

  const updateSeizure = () => {
    fetch(SEIZURES_URL, {
      method: "PATCH",
      body: JSON.stringify({
        seizureLength: {
          hours: lengthHours,
          minutes: lengthMinutes,
          seconds: lengthSeconds
        },
        seizureType: type,
        seizureTrigger: trigger,
        seizureComment: comment
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, seizureId: updatedSeizure.seizureId },
    })
      .then(response => response.json())
      .then(json => dispatch(user.actions.updateSeizure(json)));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You are about to save changes for this seizure.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willSave) => {
        if (willSave) {
          updateSeizure();
          toggleEditMode();
        }
      })
  };

  return (
    <StyledForm onSubmit={handleEdit}>
      <StyledCard>
        <StyledGrid>
          <StyledCardLabel htmlFor="date">
            Birth Date:
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
        </StyledGrid>
        <StyledButton small accent onClick={toggleEditMode}>Cancel</StyledButton>
        <StyledButton small accent type="submit">Save</StyledButton>
      </StyledCard>
    </StyledForm>
  )
};

export default SeizureForm;