import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import styles from "./ClassNavigation.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../Common/PageTitle/PageTitle";

export const ClassNavigation = () => {
  const navigate = useNavigate();

  return (
    <Paper className={styles.container}>
      <PageTitle title="כיתות"></PageTitle>
      <Button
        className={styles.navigationButton}
        onClick={() => navigate("/class")}
      >
        השאלת כיתות
      </Button>
      <Button
        className={styles.navigationButton}
        onClick={() => navigate("/calendar")}
      >
        לו"ז כיתות ובקשות
      </Button>
    </Paper>
  );
};
