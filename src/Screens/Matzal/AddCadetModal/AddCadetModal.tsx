import {
  Autocomplete,
  Box,
  Stack,
  Button,
  Dialog,
  FormControl,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Utilities } from "../../../Services/Utilities";
import { Attendance, Unit, User } from "../../../types/types";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "90%",
  marginTop: theme.spacing(2),
}));

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
    <Dialog fullWidth open={props.isOpen} onClose={props.onClose}>
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
              value={selectedCadets}
              onChange={(event, newValue) => {
                setSelectedCadets(newValue as User[]);
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
          <Button onClick={onAddAttendancesClick}>הוספת צוער</Button>
        </Box>
      </Box>
    </Dialog>
  );
};
