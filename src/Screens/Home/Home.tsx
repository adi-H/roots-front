import KeyIcon from "@mui/icons-material/Key";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SchoolIcon from "@mui/icons-material/School";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROOTS_LOGO from "../../Images/rootsLogo.png";
import styles from "./Home.module.css";

type Props = {};

const buttons = [
  {
    text: "כיתות",
    icon: SchoolIcon,
    backgroundColor: "#A3CDDA",
    navigateTo: "calendar",
  },
  {
    text: "לוגיסטיקה",
    icon: WarehouseIcon,
    backgroundColor: "#DAA3A3",
    navigateTo: "logistics",
  },
  {
    text: "ברושישי",
    icon: NewspaperIcon,
    backgroundColor: "#EAD773",
    navigateTo: "news",
  },
  {
    text: "אודות",
    icon: KeyIcon,
    backgroundColor: "#CCDAA3",
    navigateTo: "about",
  },
];

export const Home = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Paper className={styles.homeContainer}>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ flexBasis: "100%", marginTop: "8%" }}>
          <img
            src={ROOTS_LOGO}
            style={{ display: "block", width: "65%", margin: "auto" }}
          />
        </div>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            flexWrap: "wrap",
            marginTop: "10%",
          }}
        >
          {buttons.map((button, index) => (
            <div style={{ flexBasis: "100%" }}>
              <Button
                variant="contained"
                style={{
                  display: "block",
                  height: "13vh",
                  width: "13vh",
                  marginTop: "8%",
                  marginRight: index % 2 === 0 ? "auto" : 0,
                  borderRadius: "100%",
                  backgroundColor: button.backgroundColor,
                  boxShadow:
                    "0 2px 7px rgb(0 0 0 / 20%), inset 0 0 4px rgb(0 0 0 / 20%)",
                }}
                onClick={() => navigate(`/${button.navigateTo}`)}
              >
                <Typography
                  color={"black"}
                  fontWeight={"bold"}
                  fontSize={"0.8rem"}
                  style={{
                    marginTop: "20%",
                    marginLeft: "-100%",
                    marginRight: "-100%",
                    textAlign: "center",
                  }}
                >
                  {button.text}
                </Typography>
                <button.icon fontSize="large" style={{ color: "black" }} />
              </Button>
            </div>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
