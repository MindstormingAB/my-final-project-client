import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import moment from "moment";

import { updateProfile } from "../../reducers/reusable";

import { StyledButton, StyledForm, StyledCardInput, StyledCardLabel, StyledCard, StyledGrid } from "../../lib/Styling";

const ProfileForm = ({ USERDATA_URL, toggleEditMode }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");

  const [email, setEmail] = useState(useSelector((store) => store.user.profile.email));
  const [firstName, setFirstName] = useState(useSelector((store) => store.user.profile.firstName));
  const [surname, setSurname] = useState(useSelector((store) => store.user.profile.surname));
  const [birthDate, setBirthDate] = useState(moment(useSelector((store) => store.user.profile.birthDate)).format("YYYY-MM-DD"));

  const updatedProfile = { email, firstName, surname, birthDate };

  const handleEdit = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You are about to update your profile.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willSave) => {
        if (willSave) {
          dispatch(updateProfile(USERDATA_URL, localToken, localId, updatedProfile));
          toggleEditMode();
        }
      })
  };

  return (
    <StyledForm onSubmit={handleEdit}>
      <StyledCard>
        <StyledGrid>
          <StyledCardLabel htmlFor="email">
            Email:
        </StyledCardLabel>
          <StyledCardInput
            id="email"
            required
            minLength="5"
            type="email"
            value={email}
            name="email"
            onChange={event => setEmail(event.target.value)} >
          </StyledCardInput>
          <StyledCardLabel htmlFor="firstname">
            First name:
          </StyledCardLabel>
          <StyledCardInput
            id="firstname"
            minLength="2"
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)} >
          </StyledCardInput>
          <StyledCardLabel htmlFor="surname">
            Surname:
          </StyledCardLabel>
          <StyledCardInput
            id="surname"
            minLength="2"
            type="text"
            value={surname}
            onChange={event => setSurname(event.target.value)} >
          </StyledCardInput>
          <StyledCardLabel htmlFor="birthdate">
            Birth Date:
          </StyledCardLabel>
          <StyledCardInput
            required
            id="birthdate"
            minLength="2"
            type="date"
            value={birthDate}
            onChange={event => setBirthDate(event.target.value)} >
          </StyledCardInput>
        </StyledGrid>
        <StyledButton small accent onClick={toggleEditMode}>Cancel</StyledButton>
        <StyledButton small accent type="submit">Save</StyledButton>
      </StyledCard>
    </StyledForm>
  )
};

export default ProfileForm;