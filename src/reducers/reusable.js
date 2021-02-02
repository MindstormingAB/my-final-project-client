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