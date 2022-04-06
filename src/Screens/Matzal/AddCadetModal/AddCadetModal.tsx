import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Utilities } from "../../../Services/Utilities";
import { Attendance, Unit, User } from "../../../types/types";
import styles from "./AddCadetModal.module.css";

type Props = {
  teams: Unit[];
  isOpen: boolean;
  onClose: () => void;
  handleAddAttendance: (attendances: Attendance[]) => void;
};

export const AddCadetModal = (props: Props) => {
  const [selectedCadets, setSelectedCadets] = useState<User[]>([]);
  const [reason, setReason] = useState("");

  const allCadets = useMemo(() => {
    let allCadets: User[] = [];
    props.teams?.forEach((team) =>
      team.teamCadets?.forEach((cadet) => allCadets.push(cadet))
    );
    return allCadets;
  }, [props.teams]);

  const onAddAttendancesClick = () => {
    const newAttendances: Attendance[] = [];
    selectedCadets.forEach((cadet) =>
      newAttendances.push({
        user: { id: cadet.id } as User,
        inAttendance: false,
        reason,
      })
    );

    props.onClose();
    props.handleAddAttendance(newAttendances);
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          overflow: "inherit",
          backgroundColor: "#a3cdda",
          borderRadius: "20px",
        },
      }}
      fullWidth
      open={props.isOpen}
      onClose={props.onClose}
    >
      <Paper
        sx={{
          backgroundColor: "white",
          borderRadius: "25px",
          width: "55%",
          boxShadow: "2",
          position: "relative",
          left: "22%",
          bottom: "20px",
          textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          style={{ color: "black", textAlign: "center" }}
          fontWeight={"bold"}
          fontSize={"1.8rem"}
        >
          הזנת חסר
        </Typography>
      </Paper>
      <Box sx={{ display: "flex", marginBottom: "10%" }}>
        <Paper
          sx={{
            backgroundColor: "black",
            borderRadius: "0 25px 25px 0",
            width: "30%",
            boxShadow: "0 4px 4px 0 rgb(0 0 0 / 25%)",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            sx={{ paddingLeft: "35%", marginTop: "12%" }}
            fontWeight="bold"
            fontSize="1.3rem"
            color="white"
          >
            צוער
          </Typography>
        </Paper>
        <Box sx={{ width: "10%" }} />
        <FormControl sx={{ width: "50%" }}>
          <Autocomplete<User, true, true, true>
            sx={{
              borderRadius: "20px",
              backgroundColor: "white",
            }}
            options={allCadets}
            value={selectedCadets}
            onChange={(event, newValue) => {
              setSelectedCadets(newValue as User[]);
            }}
            getOptionLabel={(option) => Utilities.getFullName(option)}
            multiple={true}
            renderInput={(params) => (
              <TextField
                {...params}
                className={styles.textFieldWithNoBorder}
                label="צוער"
              />
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", marginBottom: "10%" }}>
        <Paper
          sx={{
            backgroundColor: "black",
            borderRadius: "0 25px 25px 0",
            width: "30%",
            boxShadow: "0 4px 4px 0 rgb(0 0 0 / 25%)",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            sx={{ paddingLeft: "35%", marginTop: "12%" }}
            fontWeight="bold"
            fontSize="1.3rem"
            color="white"
          >
            סיבה
          </Typography>
        </Paper>
        <Box sx={{ width: "10%" }} />
        <FormControl sx={{ width: "50%" }}>
          <TextField
            sx={{ borderRadius: "20px", backgroundColor: "white" }}
            className={styles.textFieldWithNoBorder}
            label="סיבה"
            value={reason}
            onChange={(event) => setReason(event.target.value as string)}
          />
        </FormControl>
      </Box>
      <Button onClick={onAddAttendancesClick} className={styles.addButton}>
        הוספת צוער
      </Button>
    </Dialog>
  );
};
