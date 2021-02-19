import styled from "styled-components/macro";

import { PALETTE } from "./constants";

export const StyledHeader = styled.header`
  flex-shrink: 0;
  width: 100%;
  padding: 10px;
  font-family: "Lato", sans-serif;
  font-size: 1.5em;
  background: ${PALETTE.color2};
  color: white;
  text-align: center;
`;

export const StyledBurger = styled.button`
  position: absolute;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2rem;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 32px;
    height: 4px;
    background: ${PALETTE.color5};
    border-radius: 10px;
    position: relative;
  }
`;

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: ${PALETTE.color2};
  height: 100%;
  padding: 45px 20px 20px 20px;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${props => props.open ? "translateX(0)" : "translateX(-100%)"};
  z-index: 1;

  a {
    font-size: 0.85em;
    margin-top: 0.85em;
    color: ${PALETTE.color5};
    opacity: 0.5;
    transition: color 0.3s linear;

    &:hover {
      opacity: 1;
    }
  }

  button {
    font-size: 0.85em;
    margin-top: 0.85em;
    color: ${PALETTE.color5};
    opacity: 0.5;
    transition: color 0.3s linear;
    cursor: pointer;
    padding: 0;
    background: none;
    border: none;
    text-align: left;

    &:hover {
      opacity: 1;
    }
  }
`;

export const StyledSection = styled.section`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  `;

export const StyledFooter = styled.footer`
  flex-shrink: 0;
  justify-self: center;
  width: 100%;
  padding: 10px;
  background: ${PALETTE.color2};
  font-family: "Lato", sans-serif;
  font-size: 12px;
  color: white;
  text-align: center;
`;

export const StyledLoaderSection = styled(StyledSection)`
  justify-content: center;
`;

export const StyledLoader = styled.div`
  border: 16px solid ${PALETTE.color7};
  border-top: 16px solid ${PALETTE.color2};
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const StyledTitle = styled.h1`
  text-align: center;
  font-size: 1.5em;
  `;

export const StyledSubTitle = styled.h2`
  text-align: center;
  font-size: 1.17em;
`;

export const StyledText = styled.p`
  margin: 0 0 16px 0;
  text-align: center;
`;

export const StyledSmallText = styled(StyledText)`
  font-size: 12px;
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
  width: ${props => props.small ? "100px" : "150px"};
  height: 30px;
  justify-self: center;
  align-self: center;
  border-radius: 25px;
  border: none;
  margin: ${props => props.small ? "5px 10px" : "0 0 16px 0"};
  box-shadow: 2px 2px 2px ${PALETTE.color6};
  color: ${props => props.accent
    ? `${PALETTE.color3}`
    : `${PALETTE.color1}`};
  background-image: linear-gradient(${PALETTE.color7} 45%, ${PALETTE.color6} 55%);
  transition: color 0.3s, background-image 0.5s, ease-in-out;
  
  &:hover {
    color: ${PALETTE.color5};
    background-image: ${props => props.accent
    ? `linear-gradient(${PALETTE.color8} 45%, ${PALETTE.color3} 55%)`
    : `linear-gradient(${PALETTE.color2} 45%, ${PALETTE.color1} 55%)`};
  }
`;

export const StyledLink = styled.button`
    border: none;
    padding: 0;
    cursor: pointer;
    color: ${PALETTE.color8};
    text-decoration-line: underline;
`;

export const StyledCardButton = styled(StyledButton)`
  width: 100px;
  margin-bottom: 0px;
`;

export const StyledCard = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 2px 2px 2px ${PALETTE.color6};
  padding: 10px;
  width: 302px;
  margin-bottom: 20px;
  border: 1px solid ${PALETTE.color6};
  border-radius: 25px;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
`;

export const StyledCardText = styled.p`
  font-size: 12px;
  min-height: 21px;
  width: ${props => props.left ? "88px" : "172px"};
  margin: 5px;
  color: ${props => props.left ? `${PALETTE.color9}` : `${PALETTE.color1}`};
`;

export const StyledCardLink = styled.button`
    border: none;
    padding: 0;
    cursor: pointer;
    color: ${PALETTE.color1};
    font-size: 12px;
    width: 172px;
    margin: 5px;
    text-align: left;
    padding-bottom: 5px;
`;


export const StyledCardLabel = styled.label`
  font-size: 12px;
  height: 21px;
  width: 88px;
  margin: 5px;
  color: ${PALETTE.color9};
`;

export const StyledCardInput = styled.input`
  font-size: 12px;
  min-height: 21px;
  width: 172px;
  margin: 0 5px 5px 5px;
  color: ${PALETTE.color1};
  border: 1px solid ${PALETTE.color6};
`;

export const StyledCardSelect = styled.select`
  font-size: 12px;
  height: 26px;
  width: 172px;
  margin: 0 5px 5px 5px;
  color: ${PALETTE.color1};
  border: 1px solid ${PALETTE.color6};
`;

export const StyledDurationInput = styled(StyledCardInput)`
  width: 41px;
  margin: 0 2px 0 8px;
  text-align: right;

  &:first-child{
    margin: 0 2px 0 0;
  }
`;

export const StyledWallpaperSection = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  height: 100%;
`;

export const StyledWallpaper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 48% 10% 10% 10% auto;

  @media (min-width: 768px) {
    width: 414px;
    height: 736px;
    align-self: center;
    border: 1px solid ${PALETTE.color6};
    border-radius: 25px;
    box-shadow: 5px 5px 5px ${PALETTE.color6};
  }
`;

export const StyledImage = styled.img`
  width: 35%;
  place-self: end center;
`;

export const StyledWallpaperSubTitle = styled(StyledSubTitle)`
  font-size: 30px;
  margin: 5px;
`;

export const StyledWallpaperText = styled(StyledText)`
  font-size: 18px;
  margin-bottom: 5px;
  place-self: end center;
`;

export const EmergencyContactsContainer = styled.div`
  place-self: start center;
`;