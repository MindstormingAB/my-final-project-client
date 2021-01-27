import React from "react";
// import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Switch, Route } from 'react-router-dom';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { user } from "./reducers/user";

import Header from "./components/Header";
import StartPage from "./components/StartPage";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Seizures from "./components/Seizures";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

import { StyledBrowserRouter } from "./lib/Styling";
import { StyledProvider } from "./lib/Styling";

// import logo from './logo.svg';
import './App.css';

// const BASE_URL = "http://localhost:8080/";
const BASE_URL = "https://ep-app-api.herokuapp.com/";
const USERS_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}sessions`;
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
            <StartPage />
          </Route>
          <Route path="/login" exact>
            <Login LOGIN_URL={LOGIN_URL} />
          </Route>
          <Route path="/signup" exact>
            <Signup USERS_URL={USERS_URL} />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard USERS_URL={USERS_URL} />
          </Route>
          <Route path="/profile" exact>
            <Profile USERS_URL={USERS_URL} />
          </Route>
          <Route path="/seizures" exact>
            <Seizures SEIZURES_URL={SEIZURES_URL} />
          </Route>
          <Route path="/contacts" exact>
            <Contacts CONTACTS_URL={CONTACTS_URL} />
          </Route>
          {/* <Route path="/404">
            <Profile USERS_URL={USERS_URL} />
          </Route>
          <Redirect to="/404"></Redirect> */}
        </Switch>
      </StyledProvider>
      <Footer />
    </StyledBrowserRouter>
  );
}

export default App;
