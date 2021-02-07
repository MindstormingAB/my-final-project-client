import { useEffect, useState, useCallback } from "react";

import { user } from "./user";
import { ui } from "./ui";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
};

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export const storeCredentials = (json) => {
  localStorage.setItem("localToken", json.accessToken);
  localStorage.setItem("localId", json.userId);
  localStorage.setItem("localFirstName", json.firstName);
};

export const storeUserProfile = (json) => {
  return (dispatch) => {
    dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
    dispatch(user.actions.setUserId({ userId: json.userId }));
    dispatch(user.actions.setEmail({ email: json.email }));
    dispatch(user.actions.setFirstName({ firstName: json.firstName }));
    dispatch(user.actions.setSurname({ surname: json.surname }));
    dispatch(user.actions.setBirthDate({ birthDate: json.birthDate }));
  }
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
      .then(json => {
        dispatch(storeUserData(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};

export const updateProfile = (USERDATA_URL, localToken, localId, updatedProfile) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(USERDATA_URL, {
      method: "PATCH",
      body: JSON.stringify({
        email: updatedProfile.email,
        firstName: updatedProfile.firstName,
        surname: updatedProfile.surname,
        birthDate: updatedProfile.birthDate
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        storeCredentials(json);
        dispatch(storeUserProfile(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};

export const registerSeizure = (SEIZURES_URL, localToken, localId, newSeizure) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(SEIZURES_URL, {
      method: "POST",
      body: JSON.stringify({
        seizureDate: newSeizure.date,
        seizureLength: {
          hours: newSeizure.lengthHours,
          minutes: newSeizure.lengthMinutes,
          seconds: newSeizure.lengthSeconds
        },
        seizureType: newSeizure.type,
        seizureTrigger: newSeizure.trigger,
        seizureComment: newSeizure.comment
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.addSeizure(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};

export const registerContact = (CONTACTS_URL, localToken, localId, newContact) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(CONTACTS_URL, {
      method: "POST",
      body: JSON.stringify({
        contactType: newContact.type,
        contactFirstName: newContact.firstName,
        contactSurname: newContact.surname,
        contactPhoneNumber: newContact.phoneNumber,
        contactCategory: newContact.category
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.addContact(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};

export const updateSeizure = (SEIZURES_URL, localToken, localId, updatedSeizure) => {
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
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.updateSeizure(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};

export const updateContact = (CONTACTS_URL, localToken, localId, updatedContact) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(CONTACTS_URL, {
      method: "PATCH",
      body: JSON.stringify({
        contactType: updatedContact.type,
        contactFirstName: updatedContact.firstName,
        contactSurname: updatedContact.surname,
        contactPhoneNumber: updatedContact.phoneNumber,
        contactCategory: updatedContact.category
      }),
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, contactId: updatedContact.contactId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.updateContact(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};

export const deleteSeizure = (SEIZURES_URL, localToken, localId, seizureId) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(SEIZURES_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, seizureId: seizureId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.deleteSeizure(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};

export const deleteContact = (CONTACTS_URL, localToken, localId, contactId) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(CONTACTS_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId, contactId: contactId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.deleteContact(json));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(error => console.error(error));
  };
};