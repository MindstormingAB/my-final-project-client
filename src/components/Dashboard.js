import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { fetchUserData } from "../reducers/reusable";

import NavigationButton from "./buttons/NavigationButton";

import { StyledSection, StyledText } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";

const Dashboard = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);

  useEffect(() => {
    if (!localId) {
      history.push("/");
    }
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StyledSection>
      <StyledSubTitle>Dashboard</StyledSubTitle>
      <StyledText>This is your dashboard</StyledText>
      <NavigationButton route="" label="Back" />
    </StyledSection>
  );
};

export default Dashboard;