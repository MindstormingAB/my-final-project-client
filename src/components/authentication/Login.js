import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserData } from "../../reducers/reusable";
import { storeCredentials } from "../../reducers/reusable";
import { storeUserData } from "../../reducers/reusable";
import { storeUserProfile } from "../../reducers/reusable";
import { useToggle } from "../../reducers/reusable";

import { StyledButton, StyledForm, StyledInput, StyledLabel, StyledLink, StyledSection, StyledSubTitle, StyledText, StyledTitle } from "../../lib/Styling";
import StartPage from "../StartPage";

const Login = ({ LOGIN_URL, USERDATA_URL, USERS_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const localFirstName = localStorage.getItem("localFirstName");
  const storedId = useSelector((store) => store.user.profile.userId);
  const isLoading = useSelector((store) => store.ui.isLoading)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(true);
  const [signUpMode, toggleSignUpMode] = useToggle();

  useEffect(() => {
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  const switchMode = () => {
    toggleSignUpMode();
    setResponse(true);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          setResponse(false);
          setEmail("");
          setPassword("");
          // eslint-disable-next-line
          throw "Something went wrong";
        }
        return res.json();
      })
      .then((json) => {
        storeCredentials(json);
        dispatch(storeUserData(json));
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error(error))
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    fetch(USERS_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          setResponse(false);
          setEmail("");
          setPassword("");
          // eslint-disable-next-line
          throw "Something went wrong";
        }
        return res.json();
      })
      .then((json) => {
        storeCredentials(json);
        dispatch(storeUserProfile(json));
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error(error))
  };

  return (
    <>
      {!isLoading &&
        <StyledSection>
          <StyledTitle>
            {localFirstName
              ? `Welcome ${localFirstName}!`
              : "Welcome!"}
          </StyledTitle>
          {!localToken
            ? (
              <>
                <StyledText>Start monitoring your seizures and take control over your epilepsy!</StyledText>
                {!signUpMode
                  ? <StyledSubTitle>Please enter your credentials below.</StyledSubTitle>
                  : <StyledSubTitle>Please sign up below.</StyledSubTitle>
                }
                <StyledForm>
                  <StyledLabel>
                    Email:
                  <StyledInput
                      required
                      minLength="5"
                      type="email"
                      value={email}
                      name="email"
                      onChange={event => setEmail(event.target.value)} >
                    </StyledInput>
                  </StyledLabel>
                  <StyledLabel>
                    Password:
                  <StyledInput
                      required
                      minLength="5"
                      type="password"
                      value={password}
                      onChange={event => setPassword(event.target.value)} >
                    </StyledInput>
                  </StyledLabel>
                  {!signUpMode
                    ? <StyledButton type="submit" onClick={handleLogin}>Login</StyledButton>
                    : <StyledButton type="submit" onClick={handleSignUp}>Sign up</StyledButton>
                  }
                </StyledForm>
                {!signUpMode
                  ? <>
                    <StyledText>Not registered yet? Please sign up <StyledLink onClick={switchMode}>here</StyledLink>.</StyledText>
                    {!response && <StyledText>Incorrect credentials, please try again.</StyledText>}
                  </>
                  : <>
                    {response && <StyledText>Already registered? Please login <StyledLink onClick={switchMode}>here</StyledLink>.</StyledText>}
                    {!response && <StyledText>You are already registered, please login <StyledLink onClick={switchMode}>here</StyledLink>.</StyledText>}
                  </>
                }
              </>
            )
            : <StartPage USERDATA_URL={USERDATA_URL} />}
        </StyledSection>
      }
    </>
  );
};

export default Login;