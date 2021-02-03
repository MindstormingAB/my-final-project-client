import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import swal from "sweetalert";

import { user } from "../../reducers/user";
import { useToggle } from "../../reducers/reusable";

import SeizureForm from "./SeizureForm";

import { StyledButton, StyledCard, StyledGrid } from "../../lib/Styling";
import { StyledCardText } from "../../lib/Styling";

const Seizure = ({ seizure, SEIZURES_URL }) => {
  const dispatch = useDispatch()
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
          dispatch(user.actions.deleteSeizure(seizure));
          swal({
            title: "Entry deleted",
            icon: "success",
          })
        }
      })
  };

  return (
    <>
      {editMode
        ? <SeizureForm SEIZURES_URL={SEIZURES_URL} seizure={seizure} toggleEditMode={toggleEditMode} />
        : (
          <StyledCard>
            <StyledGrid>
              <StyledCardText left>Date:</StyledCardText>
              <StyledCardText>{moment(seizure.seizureDate).format("ddd DD MMM HH:mm")}</StyledCardText>
              <StyledCardText left>Duration:</StyledCardText>
              <StyledCardText>{seizure.seizureLength.hours}h {seizure.seizureLength.minutes}m {seizure.seizureLength.seconds}s</StyledCardText>
              <StyledCardText left>Type:</StyledCardText>
              <StyledCardText>{seizure.seizureType}</StyledCardText>
              <StyledCardText left>Trigger:</StyledCardText>
              <StyledCardText>{seizure.seizureTrigger}</StyledCardText>
              <StyledCardText left>Comment:</StyledCardText>
              <StyledCardText>{seizure.seizureComment}</StyledCardText>
            </StyledGrid>
            <StyledButton small onClick={handleDeleteSeizure}>Delete</StyledButton>
            <StyledButton small onClick={toggleEditMode}>Edit</StyledButton>
          </StyledCard>
        )
      }
    </>
  );
};

export default Seizure;