import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMemo } from "react";
import { Unit } from "../../../types/types";

type Props = {
  selectedDay: Date;
  allUnits: Unit[];
  selectedPlugaId: number;
  selectedGdudId: number;
  onSelectedGdudChange: (gdudId: number) => void;
  onSelectedPlugaChange: (plugaId: number) => void;
  onSelectedDayChange: (date: string | null) => void;
};

export const CalendarForm = (props: Props) => {
  const plugot = useMemo(
    () =>
      props.allUnits.find((unit) => unit.id === props.selectedGdudId)?.children,
    [props.allUnits, props.selectedGdudId]
  );
  return (
    <>
      <Box
        sx={{
          marginTop: "5%",
          marginBottom: "5%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <FormControl sx={{ width: "30%", marginRight: "4%" }}>
          <InputLabel id="gdudLabel">גדוד</InputLabel>
          <Select
            labelId="gdudLabel"
            label="גדוד"
            value={props.selectedGdudId}
            onChange={(event) =>
              props.onSelectedGdudChange(parseInt(event.target.value as string))
            }
          >
            {props.allUnits.map((gdud: Unit) => (
              <MenuItem key={gdud.id} value={gdud.id}>
                {gdud.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "30%", marginRight: "4%" }}>
          <InputLabel id="plugaLabel">פלוגה</InputLabel>
          <Select
            labelId="plugaLabel"
            label="פלוגה"
            value={props.selectedPlugaId}
            onChange={(event) =>
              props.onSelectedPlugaChange(
                parseInt(event.target.value as string)
              )
            }
          >
            {plugot?.map((pluga: Unit) => (
              <MenuItem key={pluga.id} value={pluga.id}>
                {pluga.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="תאריך"
              value={props.selectedDay}
              onChange={props.onSelectedDayChange}
              renderInput={(params) => <TextField {...params} />}
              inputFormat={"dd/MM/yyyy"}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </>
  );
};
