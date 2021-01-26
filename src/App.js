import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { user } from "./reducers/user";
import Header from "./components/Header";
import Signup from "./components/SignUp";
import Login from "./components/Login";
// import UserDetails from "./components/UserDetails";
// import Seizures from "./components/Seizures";
// import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

// import logo from './logo.svg';
import './App.css';

// const BASE_URL = "http://localhost:8080/";
const BASE_URL = "https://ep-app-api.herokuapp.com/";
const USERS_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}sessions`;
// const SEIZURES_URL = `${BASE_URL}seizures`;
// const CONTACTS_URL = `${BASE_URL}contacts`;

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Provider store={store}>
        <Switch>
          <Route path="/" exact>
            <Login LOGIN_URL={LOGIN_URL} USERS_URL={USERS_URL} />
          </Route>
          <Route path="/signup" exact>
            <Signup USERS_URL={USERS_URL} />
          </Route>
          {/* <Route path="/userdetails" exact>
            <UserDetails USERS_URL={USERS_URL} />
          </Route>
          <Route path="/seizures" exact>
            <Seizures SEIZURES_URL={SEIZURES_URL} />
          </Route>
          <Route path="/contacts" exact>
            <Contacts CONTACTS_URL={CONTACTS_URL} />
          </Route>
          <Route path="/404">
            <UserDetails USERS_URL={USERS_URL} />
          </Route>
          <Redirect to="/404"></Redirect> */}
        </Switch>
      </Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
