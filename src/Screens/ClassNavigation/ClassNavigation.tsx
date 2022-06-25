import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./ClassNavigation.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import AuthorityUtils, { AuthorityCheck } from "../../utils/AuthorityUtils";
import { useAuth } from "../../Hooks/useAuth";

const StyledNavigationButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  textAlign: "center",
  textShadow: "0px 4px 4px 0px rgb(0 0 0 / 25%)",
  boxShadow: "0px 6px 8px 6px rgb(0 0 0 / 25%)",
  display: "block",
  width: "80%",
  maxWidth: "1000px",
  minWidth: "250px",
  fontSize: "1.25rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.75rem",
  },
}));

type NavigationRoute = {
  text: string;
  path: string;
  authorityCheck?: AuthorityCheck;
};

export const ClassNavigation = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const md = theme.breakpoints.up("md");
  const lg = theme.breakpoints.up("lg");

  const navigationRoutes: NavigationRoute[] = [
    {
      text: "השאלת כיתות",
      path: "/class",
      authorityCheck: AuthorityUtils.canRequestClass,
    },
    { text: 'לו"ז כיתות ובקשות', path: "/calendar" },
    {
      text: "צפייה בבקשות",
      path: "/classRequests",
      authorityCheck: AuthorityUtils.canRequestClass,
    },
  ].filter(
    ({ authorityCheck }) => !authorityCheck || authorityCheck(user.role.id)
  );

  return navigationRoutes.length > 1 ? (
    <Box className={styles.container}>
      <PageTitle title="כיתות" disableBackButton></PageTitle>
      <Stack alignItems="center">
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "4rem",
            [md]: {
              fontSize: "5rem",
            },
            [lg]: {
              fontSize: "6rem",
            },
          }}
          color="white"
        >
          שלום
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "1.25rem",
            [md]: {
              fontSize: "1.5rem",
            },
            [lg]: {
              fontSize: "1.75rem",
            },
          }}
          color="white"
        >
          מה ברצונך לעשות?
        </Typography>
      </Stack>
      <Grid
        sx={{ marginTop: "4%" }}
        container
        justifyContent="center"
        spacing={3}
      >
        {navigationRoutes.map(({ text, path }) => (
          <Grid
            item
            sx={{ display: "flex" }}
            justifyContent="center"
            alignItems="center"
            xs={12}
            md={6}
          >
            <StyledNavigationButton
              color="paletteWhite"
              variant="contained"
              onClick={() => navigate(path)}
            >
              {text}
            </StyledNavigationButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
