import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import swal from "sweetalert";

import { fetchUserData } from "../../reducers/reusable";
import { user } from "../../reducers/user";
import { useToggle } from "../../reducers/reusable";

import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import NavigationButton from "../buttons/NavigationButton";

import { StyledTitle, StyledButton, StyledSection, StyledText } from "../../lib/Styling";

const Profile = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  const isLoading = useSelector((store) => store.ui.isLoading);

  const [editMode, toggleEditMode] = useToggle();

  useEffect(() => {
    if (!localId) {
      history.push("/");
    }
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  const handleDeleteUser = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your user data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(USERDATA_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: localToken, userId: localId },
          });
          dispatch(user.actions.restart());
          localStorage.clear();
          history.push("/");
          swal({
            title: "User deleted",
            icon: "success",
          })
        }
      })
  };

  return (
    <>
      {!isLoading &&
        <>
          <StyledSection>
            <StyledTitle>Profile</StyledTitle>
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
          {!editMode && <StyledButton accent onClick={handleDeleteUser}>Delete account</StyledButton>}
        </>
      }
    </>
  )
};

export default Profile;