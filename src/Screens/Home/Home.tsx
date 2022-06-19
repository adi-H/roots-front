import {
  Button,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ShareIcon from "@mui/icons-material/Share";
import ROOTS_LOGO from "../../Images/rootsLogo.png";
import HOME_BACKGROUND from "../../Images/homeBackground.png";
import { InquiryModal } from "./InquiryModal/InquiryModal";
import { useState } from "react";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { CenteredFlexBox } from "../../Common/CenteredFlexBox/CenteredFlexBox";
import { useAuth } from "../../Hooks/useAuth";

const MAX_WIDTH = "800px";

const HomeButton = styled(Button)(({ theme }) => ({
  width: "60%",
  maxWidth: "600px",
  marginBottom: theme.spacing(4),
  boxShadow: "0px 0px 5px 1px #00000033",
  color: "#555",
}));

const HomeWelcomeText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(6),
  fontWeight: "600",
  fontSize: "2rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3rem",
  },
}));

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bigHeader = useMediaQuery(`(min-width:${MAX_WIDTH})`);
  const user = useAuth();

  return (
    <>
      <PageTitle title="בית" disableBackButton />
      <Stack>
        <CenteredFlexBox alignItems="center">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "max-content",
              background: "#B3FF52",
              backgroundImage: `url(${HOME_BACKGROUND})`,
              borderRadius: bigHeader ? "0" : "0 0 50px 50px",
            }}
          >
            <img
              alt="לוגו"
              src={ROOTS_LOGO}
              style={{
                display: "block",
                width: "100%",
                maxWidth: MAX_WIDTH,
                margin: "auto",
              }}
            />
          </div>
        </CenteredFlexBox>
        <CenteredFlexBox>
          <HomeWelcomeText>ברוכים הבאים, {user.firstName}</HomeWelcomeText>
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
    </>
  );
};
