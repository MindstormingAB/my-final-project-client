import React, { useState } from "react";
import swal from "sweetalert";
import moment from "moment";

import { InvertedStyledCardButton, StyledCardSelect, StyledCardWithGrid, StyledForm, StyledCardInput, StyledCardLabel, StyledCardText, StyledDurationInput } from "../../lib/Styling";

const SeizureForm = ({ SEIZURES_URL, seizure, toggleEditMode }) => {
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
  const currentDate = seizure.seizureDate;
  const currentLengthHours = seizure.seizureLength.hours;
  const currentLengthMinutes = seizure.seizureLength.minutes;
  const currentLengthSeconds = seizure.seizureLength.seconds;
  const currentType = seizure.seizureType;
  const currentTrigger = seizure.seizureTrigger;
  const currentComment = seizure.seizureComment;
  const formattedDate = moment(currentDate).format("YYYY-MM-DDTHH:mm");

  const [date, setDate] = useState(formattedDate);
  const [lengthHours, setLengthHours] = useState(currentLengthHours);
  const [lengthMinutes, setLengthMinutes] = useState(currentLengthMinutes);
  const [lengthSeconds, setLengthSeconds] = useState(currentLengthSeconds);
  const [type, setType] = useState(currentType);
  const [trigger, setTrigger] = useState(currentTrigger);
  const [comment, setComment] = useState(currentComment);

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
          fetch(SEIZURES_URL, {
            method: "PATCH",
            body: JSON.stringify({
              seizureDate: date,
              seizureLength: { hours: lengthHours, minutes: lengthMinutes, seconds: lengthSeconds },
              seizureType: type,
              seizureTrigger: trigger,
              seizureComment: comment
            }),
            headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, seizureId: seizureId },
          })
            .then(window.location.reload())
            .then(toggleEditMode())
        }
      })
  };

  return (
    <StyledForm onSubmit={handleEdit}>
      <StyledCardWithGrid>
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
        <InvertedStyledCardButton onClick={toggleEditMode}>Cancel</InvertedStyledCardButton>
        <InvertedStyledCardButton type="submit">Save</InvertedStyledCardButton>
      </StyledCardWithGrid>
    </StyledForm>
  )
};

export default SeizureForm;