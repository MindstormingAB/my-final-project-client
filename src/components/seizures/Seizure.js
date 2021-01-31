import React from "react";
import moment from "moment";
import swal from "sweetalert";

import { useToggle } from "../../reducers/reusable";

import SeizureForm from "./SeizureForm";

import { StyledCardButton, StyledCardWithGrid } from "../../lib/Styling";
import { StyledCardText } from "../../lib/Styling";

const Seizure = ({ seizure, SEIZURES_URL }) => {
  const [editMode, toggleEditMode] = useToggle();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const seizureId = seizure._id;

  const handleDeleteSeizure = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(SEIZURES_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, seizureId: seizureId },
          })
            .then(window.location.reload())
        }
      })
  };

  return (
    <>
      {editMode
        ? <SeizureForm SEIZURES_URL={SEIZURES_URL} seizure={seizure} toggleEditMode={toggleEditMode} />
        : (
          <StyledCardWithGrid>
            <StyledCardText left>Date:</StyledCardText>
            <StyledCardText>{moment(seizure.seizureDate).format("ddd DD MMM HH:mm")}</StyledCardText>
            <StyledCardText left>Length:</StyledCardText>
            <StyledCardText>{seizure.seizureLength.hours}h {seizure.seizureLength.minutes}m {seizure.seizureLength.seconds}s</StyledCardText>
            <StyledCardText left>Seizure type:</StyledCardText>
            <StyledCardText>{seizure.seizureType}</StyledCardText>
            <StyledCardText left>Trigger:</StyledCardText>
            <StyledCardText>{seizure.seizureTrigger}</StyledCardText>
            <StyledCardText left>Comment:</StyledCardText>
            <StyledCardText>{seizure.seizureComment}</StyledCardText>
            <StyledCardButton onClick={handleDeleteSeizure}>Delete</StyledCardButton>
            <StyledCardButton onClick={toggleEditMode}>Edit</StyledCardButton>
          </StyledCardWithGrid>
        )
      }
    </>
  );
};

export default Seizure;