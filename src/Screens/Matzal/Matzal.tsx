import {
  Box,
  Button,
  Stack,
  IconButton,
  Paper,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { SocketIOService } from "../../Services/SocketIOService";
import { UnitService } from "../../Services/UnitService";
import { Utilities } from "../../Services/Utilities";
import { Attendance, Unit } from "../../types/types";
import { AddCadetModal } from "./AddCadetModal/AddCadetModal";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "./Matzal.module.css";
import {
  AlignHorizontalCenterOutlined,
  CleaningServices,
  KeyboardDoubleArrowRightOutlined,
  PersonRemove,
} from "@mui/icons-material";
import { AttendanceService } from "../../Services/AttendanceService";
import Swal from "sweetalert2";
import { CenteredFlexBox } from "../../Common/CenteredFlexBox/CenteredFlexBox";
import HOME_BACKGROUND from "../../Images/homeBackground.png";
import MATZAL_HEADER_SHAPE from "../../Images/matzalHeaderShape.svg";

const MaskedBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "85%",
  minWidth: "200px",
  maxWidth: "600px",
  aspectRatio: "100 / 53",
  backgroundColor: "#00D1AC",
  backgroundImage: `url(${HOME_BACKGROUND})`,
  maskImage: `url(${MATZAL_HEADER_SHAPE})`,
}));

const StyledActionButton = styled(IconButton)(({ theme }) => ({
  background: "#00D1AC",
  position: "absolute",
  top: "69%",
  borderRadius: "100%",
  width: "15%",
  aspectRatio: "1 / 1",
}));

const AddCadetButton = styled(StyledActionButton)(({ theme }) => ({
  right: "25%",
  transform: "translateX(50%)",
}));

const ClearCadetsButton = styled(StyledActionButton)(({ theme }) => ({
  left: "25%",
  transform: "translateX(-50%)",
}));

const MatzalHeaderInfoText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "3rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  m: 0,
}));

const MatzalHeaderInfoLabel = styled((props: TypographyProps) => (
  /** @ts-ignore Apparantly an error within MUI https://github.com/mui/material-ui/issues/20373 */
  <Typography {...props} component="div" />
))(({ theme }) => ({
  display: "block",
  position: "relative",
  color: "white",
  textAlign: "center",
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

// TODO: this component needs to be separated as soon as possible - lack of time :(
export const Matzal = () => {
  const [companyWithCadets, setCompanyWithCadets] = useState<Unit>(null!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchCadets = async () => {
      const newCompanyWithCadets = await UnitService.getCadetsInCompany();

      setCompanyWithCadets(newCompanyWithCadets);
    };

    SocketIOService.socket.on("sendCompany", (company: Unit) => {
      setCompanyWithCadets(company);
    });

    fetchCadets();
  }, []);

  const getAmountOfAbsentInTeam = (team: Unit) => {
    return team.teamCadets?.filter(
      (cadet) => cadet.attendance?.inAttendance === false
    ).length;
  };

  const numberOfCadetsDetails = useMemo(() => {
    let amountOfCadets = 0;
    let amountOfAbsent = 0;

    companyWithCadets?.children.forEach((team) =>
      team.teamCadets?.forEach((cadet) => {
        amountOfCadets++;
        cadet.attendance?.inAttendance === false && amountOfAbsent++;
      })
    );

    return { amountOfAbsent, amountOfCadets };
  }, [companyWithCadets]);

  const handleDeleteAll = async () => {
    try {
      await AttendanceService.clear();
      Swal.fire({ title: 'המצ"ל נוקה בהצלחה', icon: "success" });
    } catch (e) {
      Swal.fire({ title: 'קרתה שגיאה בניקוי המצ"ל', icon: "error" });
    }
  };

  const handleDeleteAttendance = async (id: string) => {
    AttendanceService.delete(id);
  };

  const addAttendances = async (attendances: Attendance[]) => {
    try {
      await AttendanceService.addAttendances(attendances);
      Swal.fire({ title: "הצוערים נוספו בהצלחה", icon: "success" });
    } catch (e) {
      Swal.fire({ title: "קרתה שגיאה בהוספת הצוערים", icon: "error" });
    }
  };

  return (
    <>
      <PageTitle title={'מצ"ל לחייל'} showBackButton={false} />
      <CenteredFlexBox>
        <MaskedBox>
          <Stack
            height="80%"
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <MatzalHeaderInfoLabel>
              <MatzalHeaderInfoText>
                {numberOfCadetsDetails.amountOfAbsent}
              </MatzalHeaderInfoText>
              חסרים
            </MatzalHeaderInfoLabel>
            <MatzalHeaderInfoLabel>
              <MatzalHeaderInfoText>
                {numberOfCadetsDetails.amountOfCadets -
                  numberOfCadetsDetails.amountOfAbsent}
              </MatzalHeaderInfoText>
              מצ"ן
            </MatzalHeaderInfoLabel>
            <MatzalHeaderInfoLabel>
              <MatzalHeaderInfoText>
                {numberOfCadetsDetails.amountOfCadets}
              </MatzalHeaderInfoText>
              מצ"ל
            </MatzalHeaderInfoLabel>
          </Stack>
          <AddCadetButton
            style={{
              background: "#F6E971",
            }}
          >
            <PersonRemove sx={{ color: "white" }} />
          </AddCadetButton>
          <ClearCadetsButton
            style={{
              background: "#DF6E6E",
            }}
          >
            <CleaningServices sx={{ color: "white" }} />
          </ClearCadetsButton>
        </MaskedBox>
        {/* <Box sx={{ height: "100%" }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#323232",
            color: "white",
            borderRadius: "25px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography fontWeight={"bold"} fontSize={"2rem"}>
            מצ"ל:{" "}
            <span style={{ fontWeight: 400 }}>
              {numberOfCadetsDetails.amountOfCadets}
            </span>
          </Typography>
          <Typography fontWeight={"bold"} fontSize={"2rem"}>
            מצ"ן:{" "}
            <span style={{ fontWeight: 400 }}>
              {numberOfCadetsDetails.amountOfCadets -
                numberOfCadetsDetails.amountOfAbsent}
            </span>
          </Typography>
          <Typography fontWeight={"bold"} fontSize={"2rem"}>
            חסרים:{" "}
            <span style={{ fontWeight: 400 }}>
              {numberOfCadetsDetails.amountOfAbsent}
            </span>
          </Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "8%",
          }}
        >
          <Paper
            sx={{
              backgroundColor: "#323232",
              borderRadius: "0px 25px 25px 0px",
              width: "40%",

              boxShadow: "2",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              style={{ color: "white", marginRight: "15%", marginTop: "5%" }}
              fontWeight={"bold"}
              fontSize={"1.8rem"}
            >
              פירוט:
            </Typography>
          </Paper>
          <Box sx={{ width: "20%" }}>
            <IconButton
              onClick={() => setIsEdit((isEdit) => !isEdit)}
              size="large"
            >
              {isEdit ? (
                <DoneIcon fontSize="large" />
              ) : (
                <EditIcon fontSize="large" />
              )}
            </IconButton>
          </Box>
        </Box>
        {companyWithCadets?.children.map((team) => (
          <>
            <Paper
              sx={{
                backgroundColor: "#C82626",
                borderRadius: "0px 25px 25px 0px",
                width: "55%",
                margin: "8% 0 8% 0",
                boxShadow: "2",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
              }}
              key={team.id}
            >
              <Typography
                style={{ color: "white", marginRight: "5%" }}
                fontWeight={"bold"}
                fontSize={"1.8rem"}
              >
                {`${team.name} | ${getAmountOfAbsentInTeam(team)} חסרים`}
              </Typography>
            </Paper>
            <Box sx={{ marginLeft: "10%", marginRight: "10%" }}>
              {team.teamCadets
                ?.filter((cadet) => cadet.attendance?.inAttendance === false)
                .map((cadet) => (
                  <Paper
                    sx={{
                      display: "flex",
                      backgroundColor: "#323232",
                      color: "white",
                      borderRadius: "25px",
                      marginBottom: "5%",
                    }}
                    key={cadet.id}
                  >
                    {isEdit && (
                      <IconButton sx={{ padding: 0, marginLeft: "3%" }}>
                        <DeleteForeverIcon
                          onClick={() =>
                            handleDeleteAttendance(cadet.id.toString())
                          }
                          sx={{ color: "white" }}
                        />
                      </IconButton>
                    )}
                    <Typography
                      sx={{ marginLeft: "5%" }}
                      fontSize={"1.3rem"}
                      fontWeight={"bold"}
                    >
                      {Utilities.getFullName(cadet)} -{" "}
                      <Typography
                        sx={{ display: "inline-block" }}
                        fontSize={"1.3rem"}
                      >
                        {cadet.attendance.reason}
                      </Typography>
                    </Typography>
                  </Paper>
                ))}
            </Box>
          </>
        ))}
        <Button
          sx={{
            width: "90px",
            height: "90px",
            borderRadius: "100%",
            backgroundColor: "#C82626",
            position: "fixed",
            fontWeight: "bold",
            fontSize: "1.4rem",
            color: "white",
            lineHeight: "1.1",
            bottom: "4%",
            right: "10%",
            boxShadow: "0 4px 7px 0 rgb(0 0 0 / 10%)",
          }}
          onClick={isEdit ? handleDeleteAll : () => setIsModalOpen(true)}
        >
          {isEdit ? "נקה הכול" : "הוספת צוער"}
        </Button>
        <AddCadetModal
          teams={companyWithCadets?.children}
          isOpen={isModalOpen}
          handleAddAttendance={addAttendances}
          onClose={() => {
            setIsModalOpen(false);
          }}
        ></AddCadetModal>
      </Box> */}
      </CenteredFlexBox>
    </>
  );
};
