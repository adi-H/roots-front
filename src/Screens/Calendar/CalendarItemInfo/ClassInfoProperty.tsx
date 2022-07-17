import { styled, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  content: string;
  important?: boolean;
};

const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: 10,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: 12,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 14,
  },
}));

const StyledContent = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: 16,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 20,
  },
}));

const ClassInfoProperty = ({ title, content, important }: Props) => {
  return (
    <>
      <StyledTitle
        color="text.secondary"
        gutterBottom
        fontWeight={important ? "bold" : "normal"}
      >
        {title}
      </StyledTitle>
      <StyledContent fontWeight={important ? "500" : "normal"}>
        {content}
      </StyledContent>
    </>
  );
};

export default ClassInfoProperty;
