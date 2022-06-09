import KeyIcon from "@mui/icons-material/Key";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SchoolIcon from "@mui/icons-material/School";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Box, Button, Paper, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import MailIcon from "@mui/icons-material/Mail";
import ShareIcon from "@mui/icons-material/Share";
import ROOTS_LOGO from "../../Images/rootsLogo.png";
import HOME_BACKGROUND from "../../Images/homeBackground.png";
import { InquiryModal } from "./InquiryModal/InquiryModal";
import { useState } from "react";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { CenteredFlexBox } from "../../Common/CenteredFlexBox/CenteredFlexBox";

const HomeButton = styled(Button)(({ theme }) => ({
  width: "60%",
  maxWidth: "600px",
  marginTop: theme.spacing(4),
  boxShadow: "0px 0px 5px 1px #00000033",
  color: "#555",
}));

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Stack>
      <PageTitle title="בית" showBackButton={false} />
      <CenteredFlexBox>
        <div
          style={{
            position: "relative",
            maxWidth: "800px",
            height: "max-content",
            background: "#B3FF52",
            backgroundImage: `url(${HOME_BACKGROUND})`,
            borderRadius: "0 0 50px 50px",
          }}
        >
          <img
            alt="לוגו"
            src={ROOTS_LOGO}
            style={{
              display: "block",
              width: "100%",
              margin: "auto",
            }}
          />
        </div>
      </CenteredFlexBox>
      <CenteredFlexBox alignItems="center" flexDirection={"column"}>
        <HomeButton
          onClick={() => window.open("https://www.idf.il/", "_blank")}
          startIcon={<ShareIcon />}
        >
          אתר צה״ל
        </HomeButton>
        <HomeButton
          onClick={() =>
            window.open(
              "https://campus.digital.idf.il/course/view.php?id=531",
              "_blank"
            )
          }
          startIcon={<ShareIcon />}
        >
          מודל
        </HomeButton>
        <HomeButton
          variant="contained"
          style={{
            backgroundColor: "#575757",
            color: "#FFFFFF",
          }}
          disableRipple
          onClick={() => setIsModalOpen(true)}
          startIcon={<MailIcon />}
        >
          תיבת פניות
        </HomeButton>
      </CenteredFlexBox>
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
};
