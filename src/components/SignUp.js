import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { user } from "../reducers/user";
import { StyledSection } from "../lib/Styling";
// import { StyledTitle } from "../lib/Styling";
import { StyledSubTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";
import { StyledForm } from "../lib/Styling";
import { StyledLabel } from "../lib/Styling";
import { StyledInput } from "../lib/Styling";
import { StyledButton } from "../lib/Styling";
import { StyledLink } from "../lib/Styling";

const SignUp = ({ USERS_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(true);

  const handleCredentials = (credentials) => {
    localStorage.setItem("localToken", credentials.accessToken);
    localStorage.setItem("localId", credentials.userId);
    dispatch(user.actions.setAccessToken({ accessToken: credentials.accessToken }));
    dispatch(user.actions.setUserId({ userId: credentials.userId }));
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
        handleCredentials(json);
        history.push("/");
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error(error))
  };

  return (
    <StyledSection>
      {/* <StyledTitle>Registration page</StyledTitle> */}
      <StyledSubTitle>Please sign up below.</StyledSubTitle>
      <StyledForm onSubmit={handleSignUp}>
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
        <StyledButton type="submit">Sign up</StyledButton>
        {!response && <StyledText>You are already registered, please login <StyledLink to={"/login"}>here</StyledLink>.</StyledText>}
        {!!response && <StyledText>Already registered? Please login <StyledLink to={"/login"}>here</StyledLink>.</StyledText>}
      </StyledForm>
    </StyledSection>
  );
};

export default SignUp;