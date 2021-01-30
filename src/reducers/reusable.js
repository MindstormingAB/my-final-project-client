import React from "react";

import { user } from "./user";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
};

export const retrieveContactData = (CONTACTS_URL, localToken, localId) => {
  return (dispatch) => {
    fetch(CONTACTS_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        dispatch(user.actions.setContacts({ contacts: json }));
      })
      .catch(error => console.error(error));
  };
};