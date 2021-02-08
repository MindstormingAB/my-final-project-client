import React from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { StyledBurger } from "../../lib/Styling";

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => {
      if (open) {
        setOpen(!open);
        enableBodyScroll();
      } else {
        setOpen(!open);
        disableBodyScroll();
      }
    }
    }>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
};

export default Burger;