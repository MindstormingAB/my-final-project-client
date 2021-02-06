import React, { useState, useRef } from "react";

import { useOnClickOutside } from "../../reducers/reusable";

import Burger from "./Burger";
import Menu from "./Menu";

import { StyledHeader } from "../../lib/Styling";

const Header = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false))

  return (
    <StyledHeader>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />
      </div>
        Epilepsy App
    </StyledHeader>
  );
};

export default Header;