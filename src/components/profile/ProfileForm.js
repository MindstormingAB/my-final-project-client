import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { user } from "../../reducers/user";

import { StyledButton, StyledForm, StyledCardInput, StyledCardLabel, StyledCardWithGrid } from "../../lib/Styling";

const ProfileForm = ({ USERDATA_URL, toggleEditMode }) => {
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const currentEmail = useSelector((store) => store.user.profile.email);
  const currentFirstName = useSelector((store) => store.user.profile.firstName);
  const currentSurname = useSelector((store) => store.user.profile.surname);
  const currentBirthDate = useSelector((store) => store.user.profile.birthDate);
  const formatedBirthDate = moment(currentBirthDate).format("YYYY-MM-DD");
  const dispatch = useDispatch();

  const [email, setEmail] = useState(currentEmail);
  const [firstName, setFirstName] = useState(currentFirstName);
  const [surname, setSurname] = useState(currentSurname);
  const [birthDate, setBirthDate] = useState(formatedBirthDate);

  const retrieveUserData = () => {
    fetch(USERDATA_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setEmail({ email: json.email }));
        dispatch(user.actions.setFirstName({ firstName: json.firstName }));
        dispatch(user.actions.setSurname({ surname: json.surname }));
        dispatch(user.actions.setBirthDate({ birthDate: json.birthDate }));
        dispatch(user.actions.setSeizures({ seizures: json.seizures }));
        dispatch(user.actions.setContacts({ contacts: json.contacts }));
        localStorage.setItem("localFirstName", json.firstName);
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    fetch(USERDATA_URL, {
      method: "PATCH",
      body: JSON.stringify({ email, firstName, surname, birthDate }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
    })
      .then(retrieveUserData())
      .then(toggleEditMode())
  };

  return (
    <StyledForm onSubmit={handleEdit}>
      <StyledCardWithGrid>
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
          id="birthdate"
          minLength="2"
          type="date"
          value={birthDate}
          onChange={event => setBirthDate(event.target.value)} >
        </StyledCardInput>
      </StyledCardWithGrid>
      <StyledButton type="submit">Save</StyledButton>
      <StyledButton onClick={toggleEditMode}>Cancel</StyledButton>
    </StyledForm>
  )
};

export default ProfileForm;