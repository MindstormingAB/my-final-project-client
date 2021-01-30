import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Switch, Route, Redirect } from 'react-router-dom';

import { user } from "./reducers/user";

import Header from "./components/Header";
import StartPage from "./components/StartPage";
import Signup from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/profile/Profile";
import Seizures from "./components/seizures/Seizures";
import Contacts from "./components/contacts/Contacts";
import Footer from "./components/Footer";

import { StyledBrowserRouter } from "./lib/Styling";
import { StyledProvider } from "./lib/Styling";

// const BASE_URL = "http://localhost:8080/";
const BASE_URL = "https://ep-app-api.herokuapp.com/";
const USERS_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}sessions`;
const USERDATA_URL = `${BASE_URL}userdata`;
const SEIZURES_URL = `${BASE_URL}seizures`;
const CONTACTS_URL = `${BASE_URL}contacts`;

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

const App = () => {
  return (
    <StyledBrowserRouter>
      <Header />
      <StyledProvider store={store}>
        <Switch>
          <Route path="/" exact>
            <StartPage LOGIN_URL={LOGIN_URL} USERDATA_URL={USERDATA_URL} />
          </Route>
          <Route path="/login" exact>
            <Login LOGIN_URL={LOGIN_URL} />
          </Route>
          <Route path="/signup" exact>
            <Signup USERS_URL={USERS_URL} />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard USERDATA_URL={USERDATA_URL} />
          </Route>
          <Route path="/profile" exact>
            <Profile USERDATA_URL={USERDATA_URL} />
          </Route>
          <Route path="/seizures" exact>
            <Seizures SEIZURES_URL={SEIZURES_URL} />
          </Route>
          <Route path="/contacts" exact>
            <Contacts CONTACTS_URL={CONTACTS_URL} />
          </Route>
          <Route path="/404">
            <StartPage LOGIN_URL={LOGIN_URL} />
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </StyledProvider>
      <Footer />
    </StyledBrowserRouter>
  );
}

export default App;
