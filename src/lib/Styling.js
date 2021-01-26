import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const StyledTitle = styled.h1`
  text-align: center;
`;

export const StyledText = styled.p`
  margin: 0 0 16px 0;
  text-align: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 1px;
  color: white;
  background-image: linear-gradient(#335b71 45%, #03324c 55%);
  transition: color 0.3s, background-image 0.5s, ease-in-out;
  
  &:hover {
    background-image: linear-gradient(#b1ccda 49%, #96b4c5 51%);
    color: #03324c;
  }
  `;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

export const StyledLabel = styled.label`
  width: 280px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const StyledInput = styled.input`
    width: 180px;
`;

export const StyledButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  width: 150px;
  height: 30px;
  border-radius: 25px;
  border: none;
  margin-bottom: 16px;
  box-shadow: 2px 2px 2px #888888;
  color: #03324c;
  background-image: linear-gradient(#b1ccda 49%, #96b4c5 51%);
  transition: color 0.3s, background-image 0.5s, ease-in-out;

  &:hover {
    color: white;
    background-image: linear-gradient(#335b71 45%, #03324c 55%);
  }
`;

