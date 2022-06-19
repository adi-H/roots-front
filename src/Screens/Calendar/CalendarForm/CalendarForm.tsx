import {
  CalendarMonth,
  CalendarToday,
  CalendarViewDay,
  Event,
  Today,
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePickerView } from "@mui/lab/DateRangePicker/DateRangePickerView";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Unit } from "../../../types/types";
import { format, isSameDay } from "date-fns";
import { he } from "date-fns/locale";
import { useAuth } from "../../../Hooks/useAuth";

type Props = {
  selectedDay: Date;
  allUnits: Unit[];
  selectedPlugaId: number;
  selectedGdudId: number;
  onSelectedGdudChange: (gdudId: number) => void;
  onSelectedPlugaChange: (plugaId: number) => void;
  onSelectedDayChange: (date: Date) => void;
};

const DateChip = styled(Chip)(() => ({
  fontWeight: "bold",
}));

const StyledFormControl = styled(FormControl)(() => ({
  width: "30%",
  minWidth: "100px",
}));

const SpacedStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: "25px",
  [theme.breakpoints.up("md")]: {
    marginBottom: "35px",
  },
  [theme.breakpoints.up("lg")]: {
    marginBottom: "45px",
  },
}));

const DateStack = styled(SpacedStack)(() => ({
  overflowX: "auto",
}));

const DAY_IN_MILLISECONDS = 86400 * 1000;

export const CalendarForm = (props: Props) => {
  const plugot = useMemo(
    () =>
      props.allUnits.find((unit) => unit.id === props.selectedGdudId)?.children,
    [props.allUnits, props.selectedGdudId]
  );
  const dates: Date[] = [];
  const today = new Date();
  const user = useAuth();

  // Get next 7 days of the week, not including saturday
  for (let day = 0; day < 7; ++day) {
    dates.push(new Date(today.getTime() + DAY_IN_MILLISECONDS * day));
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <SpacedStack direction="row" justifyContent="center" spacing={9} mt={4}>
          <StyledFormControl>
            <InputLabel id="gdudLabel">גדוד</InputLabel>
            <Select
              labelId="gdudLabel"
              label="גדוד"
              value={props.selectedGdudId}
              variant="standard"
              onChange={(event) =>
                props.onSelectedGdudChange(
                  parseInt(event.target.value as string)
                )
              }
            >
              {props.allUnits.map((gdud: Unit) => (
                <MenuItem key={gdud.id} value={gdud.id}>
                  {gdud.name}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel id="plugaLabel">פלוגה</InputLabel>
            <Select
              labelId="plugaLabel"
              label="פלוגה"
              variant="standard"
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
              {user && [1, 2].includes(user.role.id) && (
                <MenuItem value={-1}>צפה בכל הפלוגות</MenuItem>
              )}
            </Select>
          </StyledFormControl>
        </SpacedStack>
      </Box>
      <DateStack alignItems="center" direction="row" spacing={1}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={props.selectedDay}
            onChange={(date) => {
              if (date) {
                props.onSelectedDayChange(new Date(date));
              }
            }}
            desktopModeMediaQuery="@media(min-width: 1000px)"
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  sx={{ position: "initial", minWidth: "auto" }}
                  InputProps={{
                    endAdornment: params?.InputProps?.endAdornment ?? (
                      <IconButton
                        onClick={() =>
                          params.inputProps &&
                          params.inputProps.onClick &&
                          // Hacky way to get the button
                          // to work instead of the input
                          /** @ts-ignore */
                          params.inputProps.onClick()
                        }
                      >
                        <Event />
                      </IconButton>
                    ),
                    sx: {
                      position: "initial",
                      cursor: "default",
                    },
                  }}
                  inputProps={{
                    ...params.inputProps,
                    style: { width: 0, cursor: "unset" },
                  }}
                />
              );
            }}
            inputFormat={"dd/MM/yyyy"}
          />
        </LocalizationProvider>
        {dates.map((date, dateIndex) => (
          <DateChip
            key={dateIndex}
            {...(isSameDay(date, props.selectedDay)
              ? {
                  color: "primary",
                }
              : {
                  color: "default",
                  variant: "outlined",
                })}
            label={date.toLocaleDateString("he-IL", { weekday: "long" })}
            onClick={() => {
              props.onSelectedDayChange(date);
            }}
          />
        ))}
      </DateStack>
      <Typography fontWeight="bold">
        {format(props.selectedDay, "d בMMM, y", {
          locale: he,
        })}
      </Typography>
    </>
  );
};
