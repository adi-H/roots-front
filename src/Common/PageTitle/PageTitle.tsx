import {
  AppBar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import PageTitleBackButton from "./PageTitleBackButton";
import { PageTitleLogo } from "./PageTitleLogo";

const StyledPageTitleText = styled(Typography)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  textAlign: "center",
  flexGrow: 1,
  fontSize: "1.25rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2rem",
  },
}));

type Props = { title: string; disableBackButton?: boolean };

export const PageTitle = (props: Props) => {
  const showBackButton = !props.disableBackButton;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const APPBAR_HEIGHT = lg ? "60px" : md ? "55px" : sm ? "50px" : "50px";

  return (
    <>
      <Box sx={{ height: 0, mb: APPBAR_HEIGHT }}></Box>
      <AppBar
        elevation={3}
        sx={{
          height: APPBAR_HEIGHT,
          background: "white",
          justifyContent: "center",
        }}
      >
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
