import { AppBar, Box, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import PageTitleBackButton from "./PageTitleBackButton";
import { PageTitleLogo } from "./PageTitleLogo";

const StyledPageTitleText = styled(Typography)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  textAlign: "center",
  flexGrow: 1,
  fontSize: "1rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2rem",
  },
}));

type Props = { title: string; showBackButton?: boolean };

export const PageTitle = (props: Props) => {
  const showBackButton = props.showBackButton ?? true;

  return (
    <>
      <Box sx={{ height: 0, mb: "10vh" }}></Box>
      <AppBar elevation={3} sx={{ background: "white" }}>
        <Stack
          direction={"row"}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box sx={{ width: "20px", margin: "0 4vw 0 0" }}>
            {showBackButton && <PageTitleBackButton />}
          </Box>
          <StyledPageTitleText>{props.title}</StyledPageTitleText>
          <Box sx={{ width: "20px", margin: "0 2vw" }}>
            <PageTitleLogo />
          </Box>
        </Stack>
      </AppBar>
    </>
  );
};
