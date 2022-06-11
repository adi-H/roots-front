import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./ClassNavigation.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../Common/PageTitle/PageTitle";

export const ClassNavigation = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const md = theme.breakpoints.up("md");
  const lg = theme.breakpoints.up("lg");

  return (
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
      <Button
        sx={{
          fontSize: "1.25rem",
          [md]: {
            fontSize: "1.5rem",
          },
          [lg]: {
            fontSize: "2rem",
          },
        }}
        className={styles.navigationButton}
        onClick={() => navigate("/class")}
      >
        השאלת כיתות
      </Button>
      <Button
        sx={{
          fontSize: "1.25rem",
          [md]: {
            fontSize: "1.5rem",
          },
          [lg]: {
            fontSize: "2rem",
          },
        }}
        className={styles.navigationButton}
        onClick={() => navigate("/calendar")}
      >
        לו"ז כיתות ובקשות
      </Button>
    </Box>
  );
};
