import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { user } from "../../reducers/user";

import NavigationButton from "../buttons/NavigationButton";

import { StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";
import { StyledCard } from "../../lib/Styling";
import { StyledCardText } from "../../lib/Styling";

const Profile = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const { email, firstName, surname, birthDate } = useSelector((store) => store.user.profile);

  useEffect(() => {
    fetch(USERDATA_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setEmail({ email: json.email }));
        dispatch(user.actions.setFirstName({ firstName: json.firstName }));
        dispatch(user.actions.setSurname({ surname: json.surname }));
        dispatch(user.actions.setBirthDate({ birthDate: json.birthDate }));
        dispatch(user.actions.setSeizures({ seizures: json.seizures }));
        dispatch(user.actions.setContacts({ contacts: json.contacts }));
      })
      .catch(error => console.error(error));
    // eslint-disable-next-line
  }, []);

  return (
    <StyledSection>
      <StyledSubTitle>Profile</StyledSubTitle>
      <StyledText>This is where you can update your profile</StyledText>
      <StyledCard>
        <StyledCardText left>First name:</StyledCardText>
        <StyledCardText>{firstName}</StyledCardText>
        <StyledCardText left>Surname:</StyledCardText>
        <StyledCardText>{surname}</StyledCardText>
        <StyledCardText left>Email:</StyledCardText>
        <StyledCardText>{email}</StyledCardText>
        <StyledCardText left>Birth date</StyledCardText>
        <StyledCardText>{moment(birthDate).format("ddd DD MMM YYYY")}</StyledCardText>
      </StyledCard>
      <NavigationButton route="" label="Back" />
    </StyledSection>
  )
};

export default Profile;