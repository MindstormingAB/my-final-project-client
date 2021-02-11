import React from 'react';

import { StyledBurger } from "../../lib/Styling";

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger
      aria-label="Menu"
      open={open}
      onClick={() => {
        setOpen(!open);
        document.body.classList.toggle("no-scroll");
      }
      }>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
};

export default Burger;