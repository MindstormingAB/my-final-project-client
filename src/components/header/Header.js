import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import { useOnClickOutside } from "../../reducers/reusable";

import Burger from "./Burger";
import Menu from "./Menu";

import { StyledHeader } from "../../lib/Styling";

const Header = () => {
  const isFullScreen = useSelector((store) => store.ui.isFullScreen);
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => {
    setOpen(false);
    document.body.classList.remove("no-scroll");
  });

  return (
    <>{!isFullScreen &&
      <StyledHeader>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} />
        </div>
        The Epilepsy App
      </StyledHeader>
    }
    </>
  );
};

export default Header;