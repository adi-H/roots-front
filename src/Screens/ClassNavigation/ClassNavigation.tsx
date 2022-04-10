import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import styles from "./ClassNavigation.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../Common/PageTitle/BackButton";

export const ClassNavigation = () => {
  const navigate = useNavigate();

  return (
    <Paper className={styles.container}>
      <BackButton
        sx={{ position: "absolute", right: "9%", top: "4%" }}
      ></BackButton>
      <Paper
        sx={{
          height: "5%",
          width: "6%",
          margin: "auto",
          backgroundColor: "white",
          marginBottom: "-1%",
        }}
        style={{ backgroundColor: "#F5F5F5" }}
      ></Paper>
      <Avatar
        sx={{
          margin: "auto",
          backgroundColor: "#dddddd",
          height: "8vh",
          width: "8vh",
          marginBottom: "-3%",
        }}
      >
        <SchoolIcon sx={{ color: "#386776" }} fontSize="large"></SchoolIcon>
      </Avatar>
      <Paper
        sx={{
          marginTop: "10%",
          width: "30%",
          margin: "auto",
          backgroundColor: "white",
          textAlign: "center",
          borderRadius: "25px",
        }}
        style={{ backgroundColor: "white" }}
      >
        <Typography
          sx={{
            color: "#386776",
            textShadow: "0px 4px 4px rgb(0 0 0 / 15%)",
          }}
          fontWeight="bold"
          fontSize={"2.3rem"}
        >
          כיתות
        </Typography>
      </Paper>
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
