import React, { useState } from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { user } from "./reducers/user";
import { ui } from "./reducers/ui";

import Header from "./components/header/Header";
import LoaderPage from "./components/LoaderPage";
import Login from "./components/authentication/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Seizures from "./components/seizures/Seizures";
import Contacts from "./components/contacts/Contacts";
import Wallpaper from "./components/wallpaper/Wallpaper";
import Profile from "./components/profile/Profile";
import Footer from "./components/Footer";

// const BASE_URL = "http://localhost:8080/";
const BASE_URL = "https://ep-app-api.herokuapp.com/";
const USERS_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}sessions`;
const USERDATA_URL = `${BASE_URL}userdata`;
const SEIZURES_URL = `${BASE_URL}seizures`;
const CONTACTS_URL = `${BASE_URL}contacts`;

const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
});
const store = configureStore({ reducer });

const App = () => {
  const [wallpaperStep, setWallpaperStep] = useState(0);

  const progressWallpaperProcess = () => {
    setWallpaperStep(wallpaperStep + 1);
  };

  const reverseWallpaperProcess = () => {
    setWallpaperStep(wallpaperStep - 1);
  };

  return (
    <BrowserRouter>
      {(wallpaperStep !== 2) && <Header />}
      <Provider store={store}>
        <Switch>
          <Route path="/" exact>
            <Login
              LOGIN_URL={LOGIN_URL}
              USERDATA_URL={USERDATA_URL}
              USERS_URL={USERS_URL}
            />
            <LoaderPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard USERDATA_URL={USERDATA_URL} />
            <LoaderPage />
          </Route>
          <Route path="/seizures">
            <Seizures SEIZURES_URL={SEIZURES_URL} USERDATA_URL={USERDATA_URL} />
            <LoaderPage />
          </Route>
          <Route path="/contacts">
            <Contacts CONTACTS_URL={CONTACTS_URL} USERDATA_URL={USERDATA_URL} />
            <LoaderPage />
          </Route>
          <Route path="/wallpaper">
            <Wallpaper
              USERDATA_URL={USERDATA_URL}
              wallpaperStep={wallpaperStep}
              progressWallpaperProcess={progressWallpaperProcess}
              reverseWallpaperProcess={reverseWallpaperProcess}
            />
          </Route>
          <Route path="/profile">
            <Profile USERDATA_URL={USERDATA_URL} />
            <LoaderPage />
          </Route>
          <Route path="/404">
            <Login LOGIN_URL={LOGIN_URL} USERDATA_URL={USERDATA_URL} />
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </Provider>
      {(wallpaperStep !== 2) && <Footer />}
    </BrowserRouter>
  );
}

export default App;
