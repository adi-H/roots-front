import {
  Box,
  Stack,
  IconButton,
  styled,
  Typography,
  TypographyProps,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { SocketIOService } from "../../Services/SocketIOService";
import { UnitService } from "../../Services/UnitService";
import { Utilities } from "../../Services/Utilities";
import { Attendance, Unit } from "../../types/types";
import { AddCadetModal } from "./AddCadetModal/AddCadetModal";
import {
  CleaningServices,
  Delete,
  ExpandMore,
  PersonRemove,
} from "@mui/icons-material";
import { AttendanceService } from "../../Services/AttendanceService";
import { CenteredFlexBox } from "../../Common/CenteredFlexBox/CenteredFlexBox";
import HOME_BACKGROUND from "../../Images/homeBackground.png";
import MATZAL_HEADER_SHAPE from "../../Images/matzalHeaderShape.svg";
import { toast } from "react-toastify";

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
  const [expanded, setExpanded] = useState<number[]>([]);

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
      setExpanded([]);
      toast.success('המצ"ל נוקה בהצלחה');
    } catch (e) {
      toast.error('אירעה שגיאה בניקוי המצ"ל');
    }
  };

  const handleDeleteAttendance = async (id: string) => {
    AttendanceService.delete(id);
  };

  const addAttendances = async (attendances: Attendance[]) => {
    try {
      await AttendanceService.addAttendances(attendances);
      toast.success(
        attendances.length === 1 ? "הצוער נוסף בהצלחה" : "הצוערים נוספו בהצלחה"
      );
    } catch (e) {
      toast.error("אירעה שגיאה בהוספת הצוערים");
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded((expandedState) =>
      expandedState.includes(id)
        ? expandedState.filter((teamId) => teamId !== id)
        : [...expandedState, id]
    );
  };

  return (
    <>
      <PageTitle title={'מצ"ל לחייל'} disableBackButton />
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
            onClick={() => setIsModalOpen(true)}
          >
            <PersonRemove sx={{ color: "white" }} />
          </AddCadetButton>
          <ClearCadetsButton
            style={{
              background: "#DF6E6E",
            }}
            onClick={() => handleDeleteAll()}
          >
            <CleaningServices sx={{ color: "white" }} />
          </ClearCadetsButton>
        </MaskedBox>
      </CenteredFlexBox>
      <Typography
        fontWeight="bold"
        fontSize={32}
        sx={{ margin: "4% 0 0 15px" }}
      >
        פירוט
      </Typography>
      {companyWithCadets?.children.map((team) => {
        const absentCadets = team.teamCadets
          ? team.teamCadets.filter(
              (cadet) => cadet.attendance?.inAttendance === false
            )
          : [];
        const isAbsentCadets = absentCadets.length > 0;

        return (
          <Accordion
            key={team.id}
            expanded={expanded.includes(team.id)}
            onChange={() => isAbsentCadets && toggleExpand(team.id)}
          >
            <AccordionSummary expandIcon={isAbsentCadets && <ExpandMore />}>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                צוות {team.name}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {isAbsentCadets ? `${absentCadets.length} חסרים` : "אין חסרים"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {absentCadets.map((cadet) => (
                <Stack
                  key={cadet.id}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <IconButton
                    onClick={() => {
                      handleDeleteAttendance(cadet.id.toString());

                      if (absentCadets.length === 1) {
                        toggleExpand(team.id);
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <Typography fontSize={"1.2rem"}>
                    {Utilities.getFullName(cadet)}
                  </Typography>
                  <Typography fontSize={"1rem"} color="text.secondary">
                    {cadet.attendance.reason}
                  </Typography>
                </Stack>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <AddCadetModal
        teams={companyWithCadets?.children}
        isOpen={isModalOpen}
        handleAddAttendance={addAttendances}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
