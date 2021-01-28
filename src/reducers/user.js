import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: "",
    userId: ""
  },
  profile: {
    email: "",
    firstName: "",
    surname: "",
    birthDate: null
  },
  seizures: [],
  contacts: []
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
    },
    setEmail: (state, action) => {
      const { email } = action.payload;
      state.profile.email = email;
    },
    setFirstName: (state, action) => {
      const { firstName } = action.payload;
      state.profile.firstName = firstName;
    },
    setSurname: (state, action) => {
      const { surname } = action.payload;
      state.profile.surname = surname;
    },
    setBirthDate: (state, action) => {
      const { birthDate } = action.payload;
      state.profile.birthDate = birthDate;
    },
    setSeizures: (state, action) => {
      const { seizures } = action.payload;
      state.seizures = seizures;
    },
    setContacts: (state, action) => {
      const { contacts } = action.payload;
      state.contacts = contacts;
    },
    deleteAccessToken: (state, action) => {
      state.login.accessToken = "";
    },
    deleteUserId: (state, action) => {
      state.login.userId = "";
    },
  }
});