import React from "react";

import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";

const Dashboard = () => {
  const localFirstName = localStorage.getItem("localFirstName");

  return (
    <section>
      <h1>Max and Sandrine's app</h1>
      {localFirstName && <h3>Welcome {localFirstName}!</h3>}
      {!localFirstName && <h3>Welcome!</h3>}
      <p>You are logged in.</p>
      <p>You can access your profile by clicking on the button below.</p>
      <ProfileButton />
      <LogoutButton />
    </section>
  );
};

export default Dashboard;