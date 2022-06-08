import { KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const StyledIcon = styled(KeyboardArrowRight)(({ theme }) => ({
  fontSize: "28px",
  [theme.breakpoints.up("md")]: {
    fontSize: "36px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "42px",
  },
}));

const PageTitleBackButton = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <IconButton onClick={handleClick} disableRipple>
      <StyledIcon />
    </IconButton>
  );
};

export default PageTitleBackButton;
