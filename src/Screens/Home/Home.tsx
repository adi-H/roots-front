import KeyIcon from "@mui/icons-material/Key";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SchoolIcon from "@mui/icons-material/School";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import MailIcon from '@mui/icons-material/Mail';
import ShareIcon from '@mui/icons-material/Share';
import ROOTS_LOGO from "../../Images/rootsLogo.png";
import styles from "./Home.module.css";
import { InquiryModal } from "./InquiryModal/InquiryModal";
import { useState } from "react";

type Props = {};

const buttons = [
  {
    text: "כיתות",
    icon: SchoolIcon,
    backgroundColor: "#A3CDDA",
    navigateTo: "classNavigation",
  },
  {
    text: "לוגיסטיקה",
    icon: WarehouseIcon,
    backgroundColor: "#eea3a3",
    navigateTo: "logistics",
  },
  {
    text: "ברושישי",
    icon: NewspaperIcon,
    backgroundColor: "#EAD773",
    navigateTo: "broshShishi",
  },
  {
    text: 'מצ"ל',
    icon: ArticleIcon,
    backgroundColor: "#CCDAA3",
    navigateTo: "matzal",
  },
];

export const Home = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            width: "80%",
            flexWrap: "wrap",
            marginTop: "10%",
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-around', flexBasis: '100%', marginBottom: '10%' }}>
            <Button onClick={() => window.open("https://www.idf.il/", "_blank")} className={styles.topButton} startIcon={<ShareIcon />}>
              אתר צה״ל
            </Button>
            <Button onClick={() => window.open("https://campus.digital.idf.il/course/view.php?id=531", "_blank")} className={styles.topButton} startIcon={<ShareIcon />}>
              מודל
            </Button>
          </Box>
          {buttons.map((button, index) => (
            <div style={{ flexBasis: "50%" }}>
              <Button
                variant="contained"
                style={{
                  display: "block",
                  height: "13vh",
                  width: "13vh",
                  marginTop: "8%",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: '15%',
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
      <Button onClick={() => setIsModalOpen(true)} className={styles.inquiryButton} startIcon={<MailIcon />}>
        תיבת פניות
      </Button>
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Paper>
  );
};
