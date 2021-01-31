import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { PALETTE } from "./constants";

export const StyledHeader = styled.header`
  flex-shrink: 0;
  width: 100%;
  padding: 10px;
  font-family: "Lato", sans-serif;
  font-size: 20px;
  background: ${PALETTE.color2};
  color: white;
  text-align: center;
`;

export const StyledSection = styled.section`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

export const StyledFooter = styled.footer`
  flex-shrink: 0;
  width: 100%;
  padding: 8px;
  background: ${PALETTE.color2};
  font-family: "Lato", sans-serif;
  font-size: 12px;
  color: white;
  text-align: center;
`;

export const StyledTitle = styled.h1`
  text-align: center;
`;

export const StyledSubTitle = styled.h3`
  text-align: center;
`;

export const StyledText = styled.p`
  margin: 0 0 16px 0;
  text-align: center;
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
  justify-self: center;
  border-radius: 25px;
  border: none;
  margin-bottom: 16px;
  /* box-shadow: 2px 2px 2px #888888; */
  box-shadow: 2px 2px 2px ${PALETTE.color6};
  /* color: #03324c; */
  color: ${PALETTE.color1};
  background-image: linear-gradient(${PALETTE.color7} 45%, ${PALETTE.color6} 55%);
  /* background-image: linear-gradient(#b1ccda 49%, #96b4c5 51%); */
  transition: color 0.3s, background-image 0.5s, ease-in-out;

  &:hover {
    color: ${PALETTE.color5};
    background-image: linear-gradient(${PALETTE.color2} 45%, ${PALETTE.color1} 55%);
    /* background-image: linear-gradient(#335b71 45%, #03324c 55%); */
  }
`;

export const StyledCardButton = styled(StyledButton)`
  width: 100px;
  margin-bottom: 0px;
`;

export const InvertedStyledCardButton = styled(StyledCardButton)`
  color: ${PALETTE.color5};
  background-image: linear-gradient(${PALETTE.color8} 45%, ${PALETTE.color3} 55%);
  
  &:hover {
    color: ${PALETTE.color5};
    background-image: linear-gradient(${PALETTE.color2} 45%, ${PALETTE.color1} 55%);}
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 1px;
  color: white;
  background-image: linear-gradient(${PALETTE.color2} 45%, ${PALETTE.color1} 55%);
  /* background-image: linear-gradient(#335b71 45%, #03324c 55%); */
  transition: color 0.3s, background-image 0.5s, ease-in-out;
  
  &:hover {
    /* background-image: linear-gradient(#b1ccda 49%, #96b4c5 51%); */
    background-image: linear-gradient(${PALETTE.color7} 45%, ${PALETTE.color6} 55%);
    color: #03324c;
  }
`;

export const StyledCard = styled.section`
  box-shadow: 2px 2px 2px ${PALETTE.color6};
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${PALETTE.color6};
  border-radius: 25px;
`;

export const StyledCardWithGrid = styled(StyledCard)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledCardText = styled.p`
  font-size: 12px;
  height: 21px;
  width: 130px;
  margin: 5px;
  /* text-align: ${props => props.left ? "left" : "right"}; */
  color: ${props => props.left ? `${PALETTE.color6}` : `${PALETTE.color1}`};
`;

export const StyledCardLabel = styled.label`
  font-size: 12px;
  height: 21px;
  width: 130px;
  margin: 5px;
  /* text-align: left; */
  color: ${PALETTE.color6};
`;

export const StyledCardInput = styled.input`
  font-size: 12px;
  height: 21px;
  width: 130px;
  margin: 0 5px 5px 5px;
  /* text-align: right; */
  color: ${PALETTE.color1};
  border: 1px solid ${PALETTE.color6};
`;

export const StyledCardSelect = styled.select`
  font-size: 12px;
  height: 21px;
  width: 130px;
  margin: 0 5px 5px 5px;
  /* text-align: right; */
  color: ${PALETTE.color1};
  border: 1px solid ${PALETTE.color6};
`;