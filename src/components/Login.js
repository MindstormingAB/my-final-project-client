import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

// import StartPage from "./StartPage";
import { user } from "../reducers/user";
import { StyledSection } from "../lib/Styling";
import { StyledTitle } from "../lib/Styling";
import { StyledText } from "../lib/Styling";
import { StyledForm } from "../lib/Styling";
import { StyledLabel } from "../lib/Styling";
import { StyledInput } from "../lib/Styling";
import { StyledButton } from "../lib/Styling";
import { StyledLink } from "../lib/Styling";

const Login = ({ LOGIN_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionToken = localStorage.getItem("sessionToken");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(true);

  const handleCredentials = (credentials) => {
    localStorage.setItem("sessionToken", credentials.accessToken);
    localStorage.setItem("sessionId", credentials.userId);
    dispatch(user.actions.setAccessToken({ accessToken: credentials.accessToken }));
    dispatch(user.actions.setUserId({ userId: credentials.userId }));
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
        handleCredentials(json);
        history.push("/");
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error(error))
  };

  return (
    <>
      {!sessionToken && (
        <StyledSection>
          <StyledTitle>Login page</StyledTitle>
          <StyledForm onSubmit={handleLogin}>
            <StyledText>Please enter your credentials below.</StyledText>
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
        </StyledSection>
      )}
      {/* {sessionToken && <StartPage />} */}
      {sessionToken && <></>}
    </>
  );
};

export default Login;