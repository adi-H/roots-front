import {
  Autocomplete,
  Box,
  Stack,
  Button,
  Dialog,
  FormControl,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Utilities } from "../../../Services/Utilities";
import { Attendance, Unit, User } from "../../../types/types";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "90%",
  marginTop: theme.spacing(2),
}));

type Props = {
  teams: Unit[];
  preselectedCadets: User[];
  setCadets: (cadets: User[]) => void;
  isOpen: boolean;
  onClose: () => void;
  handleAddAttendance: (attendances: Attendance[]) => void;
};

export const AddMissingCadetModal = (
  { teams,
    preselectedCadets,
    setCadets,
    isOpen,
    onClose,
    handleAddAttendance
  }: Props) => {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (preselectedCadets && preselectedCadets?.length > 0) {
      setReason(preselectedCadets[0].attendance.reason || "");
    }
  }, [preselectedCadets]);

  const allCadets = useMemo(() => {
    let allCadets: User[] = [];
    teams?.forEach((team) =>
      team.teamCadets?.forEach((cadet) => allCadets.push(cadet))
    );
    return allCadets;
  }, [teams]);

  const onAddAttendancesClick = () => {
    const newAttendances: Attendance[] = [];
    preselectedCadets.forEach((cadet) =>
      newAttendances.push({
        userId: cadet.id,
        inAttendance: false,
        reason,
      })
    );

    onClose();
    handleAddAttendance(newAttendances);
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: "8px",
        }}
      >
        <Typography fontWeight={"bold"} fontSize={"1.8rem"} textAlign="center">
          הזנת חסר
        </Typography>
        <Stack width="100%" alignItems="center">
          <StyledFormControl>
            <Autocomplete<User, true, true, true>
              sx={{
                borderRadius: "20px",
                backgroundColor: "white",
              }}
              options={allCadets}
              value={preselectedCadets}
              onChange={(event, newValue) => {
                setCadets(newValue as User[]);
              }}
              getOptionLabel={(option) => Utilities.getFullName(option)}
              multiple={true}
              renderInput={(params) => <TextField {...params} label="צוער" />}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              sx={{ borderRadius: "20px", backgroundColor: "white" }}
              label="סיבה"
              value={reason}
              onChange={(event) => setReason(event.target.value as string)}
            />
          </StyledFormControl>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            mt: "16px",
          }}
        >
          <Button onClick={onAddAttendancesClick}>הזן חסר</Button>
        </Box>
      </Box>
    </Dialog>
  );
};
