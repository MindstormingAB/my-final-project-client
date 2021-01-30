import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { user } from "../../reducers/user";
import { useToggle } from "../../reducers/reusable";

import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import NavigationButton from "../buttons/NavigationButton";

import { StyledSection } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";
import { StyledButton } from "../../lib/Styling";

const Profile = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const [editMode, toggleEditMode] = useToggle();

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
      {editMode
        ? <ProfileForm USERDATA_URL={USERDATA_URL} toggleEditMode={toggleEditMode} />
        : (
          <>
            <ProfileCard />
            <StyledButton onClick={toggleEditMode}>Edit</StyledButton>
            <NavigationButton route="" label="Back" />
          </>
        )}
    </StyledSection>
  )
};

export default Profile;