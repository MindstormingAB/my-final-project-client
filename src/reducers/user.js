import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    accessToken: "",
    userId: "",
    email: "",
    firstName: "",
    surname: "",
    birthDate: null
  },
  // login: {
  //   accessToken: "",
  //   userId: ""
  // },
  // profile: {
  //   email: "",
  //   firstName: "",
  //   surname: "",
  //   birthDate: null
  // },
  seizures: [],
  contacts: []
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.profile.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.profile.userId = userId;
    },
    // setAccessToken: (state, action) => {
    //   const { accessToken } = action.payload;
    //   state.login.accessToken = accessToken;
    // },
    // setUserId: (state, action) => {
    //   const { userId } = action.payload;
    //   state.login.userId = userId;
    // },
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
    addSeizure: (state, action) => {
      const newSeizure = action.payload;
      const newSeizuresList = [newSeizure, ...state.seizures];
      state.seizures = newSeizuresList;
    },
    updateSeizure: (state, action) => {
      const updatedSeizuresList = state.seizures.map((item) => {
        if (item._id !== action.payload._id) {
          return item
        } else {
          return {
            ...item,
            ...action.payload
          }
        }
      });
      state.seizures = updatedSeizuresList;
    },
    deleteAccessToken: (state, action) => {
      state.profile.accessToken = "";
    },
    deleteUserId: (state, action) => {
      state.profile.userId = "";
    },
  }
});