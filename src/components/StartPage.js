import React from "react";

import NavigationButton from "./buttons/NavigationButton";
import ReloadButton from "./buttons/ReloadButton";
import LogoutButton from "./buttons/LogoutButton";

const StartPage = ({ USERDATA_URL }) => {

  return (
    <>
      <NavigationButton route="profile" label="Profile" />
      <NavigationButton route="dashboard" label="Dashboard" />
      <NavigationButton route="contacts" label="Contacts" />
      <NavigationButton route="seizures" label="Seizures" />
      <ReloadButton USERDATA_URL={USERDATA_URL} />
      <LogoutButton />
    </>
  );
};

export default StartPage;