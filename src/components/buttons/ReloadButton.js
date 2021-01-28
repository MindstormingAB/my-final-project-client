import React from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';

import { user } from "../../reducers/user";

import { StyledButton } from "../../lib/Styling";

const ReloadButton = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  // const history = useHistory();

  const handleReload = (event) => {
    // fetch("http://localhost:8080/userdata", {
    fetch(USERDATA_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setEmail({ email: json.email }));
        dispatch(user.actions.setFirstName({ firstName: json.firstName }));
        dispatch(user.actions.setSurname({ surname: json.surname }));
        dispatch(user.actions.setBirthDate({ birthDate: json.birthDate }));
        dispatch(user.actions.setSeizures({ seizures: json.seizures }));
        dispatch(user.actions.setContacts({ contacts: json.contacts }));
      })
      .catch(error => console.error(error));
  };

  return (
    <StyledButton onClick={handleReload}>Reload</StyledButton>
  );
};

export default ReloadButton;