import React from "react";

import { user } from "./user";
import { ui } from "./ui";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
};

export const storeCredentials = (json) => {
  localStorage.setItem("localToken", json.accessToken);
  localStorage.setItem("localId", json.userId);
  localStorage.setItem("localFirstName", json.firstName);
};

export const storeUserData = (json) => {
  return (dispatch) => {
    dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
    dispatch(user.actions.setUserId({ userId: json.userId }));
    dispatch(user.actions.setEmail({ email: json.email }));
    dispatch(user.actions.setFirstName({ firstName: json.firstName }));
    dispatch(user.actions.setSurname({ surname: json.surname }));
    dispatch(user.actions.setBirthDate({ birthDate: json.birthDate }));
    dispatch(user.actions.setSeizures({ seizures: json.seizures }));
    dispatch(user.actions.setContacts({ contacts: json.contacts }));
  }
};

export const fetchUserData = (USERDATA_URL, localToken, localId) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(USERDATA_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => dispatch(storeUserData(json)))
      .catch(error => console.error(error))
  }
};

export const retrieveContactData = (CONTACTS_URL, localToken, localId) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(CONTACTS_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(user.actions.setContacts({ contacts: json }));
        dispatch(ui.actions.setLoading(true));
      })
      .catch(error => console.error(error));
  };
};

export const retrieveSeizures = (SEIZURES_URL, localToken, localId) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(SEIZURES_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(user.actions.setSeizures({ seizures: json }));
        dispatch(ui.actions.setLoading(true));
      })
      .catch(error => console.error(error));
  };
};

export const patchSeizure = (SEIZURES_URL, localToken, localId, updatedSeizure) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(SEIZURES_URL, {
      method: "PATCH",
      body: JSON.stringify({
        seizureDate: updatedSeizure.date,
        seizureLength: {
          hours: updatedSeizure.lengthHours,
          minutes: updatedSeizure.lengthMinutes,
          seconds: updatedSeizure.lengthSeconds
        },
        seizureType: updatedSeizure.type,
        seizureTrigger: updatedSeizure.trigger,
        seizureComment: updatedSeizure.comment
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, seizureId: updatedSeizure.seizureId },
    })
  }
}