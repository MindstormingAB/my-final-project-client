import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { storeCredentials } from "../../reducers/reusable";
import { storeUserData } from "../../reducers/reusable";

import { StyledSection, StyledTitle } from "../../lib/Styling";
import { StyledSubTitle } from "../../lib/Styling";
import { StyledText } from "../../lib/Styling";
import { StyledForm } from "../../lib/Styling";
import { StyledLabel } from "../../lib/Styling";
import { StyledInput } from "../../lib/Styling";
import { StyledButton } from "../../lib/Styling";
import { StyledLink } from "../../lib/Styling";
import StartPage from "../StartPage";

const Login = ({ LOGIN_URL, USERDATA_URL }) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const localFirstName = localStorage.getItem("localFirstName");
  const storedFirstName = useSelector((store) => store.user.profile.firstName);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(true);

  useEffect(() => {
    if (!storedFirstName && localFirstName) {
      fetchUserData();
    }
    // eslint-disable-next-line
  }, []);

  const fetchUserData = () => {
    fetch(USERDATA_URL, {
      method: "GET",
      headers: { Authorization: localToken, userId: localId },
    })
      .then(response => response.json())
      .then(json => dispatch(storeUserData(json)))
      .catch(error => console.error(error))
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

  return (
    <StyledSection>
      <StyledTitle>
        {localFirstName
          ? `Welcome ${localFirstName}!`
          : "Welcome!"}
      </StyledTitle>
      <StyledText>Description of the application</StyledText>
      {!localToken
        ? (
          <>
            <StyledSubTitle>Please enter your credentials below.</StyledSubTitle>
            <StyledForm onSubmit={handleLogin}>
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
              <StyledButton type="submit">Login</StyledButton>
              {!response && <StyledText>Incorrect credentials, please try again.</StyledText>}
              <StyledText>Not registered yet? Please sign up <StyledLink to={"/signup"}>here</StyledLink>.</StyledText>
            </StyledForm>
          </>
        )
        : <StartPage />}
    </StyledSection>
  );
};

export default Login;