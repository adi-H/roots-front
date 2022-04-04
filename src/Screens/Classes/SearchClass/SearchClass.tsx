import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ClassTypeService } from "../../../Services/ClassTypeService";
import { ClassType } from "../../../types/types";

type Props = {
  handleSearchClasses: (
    startDate: Date,
    endDate: Date,
    classTypeId: number
  ) => void;
};

export const ResponsiveDatePickers = (props: Props) => {
  const [chosenDate, setChosenDate] = React.useState<Date>(new Date());
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());
  const [isLoading, setIsLoading] = React.useState(false);
  const [chosenClassTypeId, setChosenClassTypeId] = React.useState<number>(0);
  const [classTypes, setClassTypes] = React.useState<ClassType[]>([]);

  React.useEffect(() => {
    const fetch = async () => {
      const fetchedClassTypes = await ClassTypeService.getAll();
      setClassTypes(fetchedClassTypes);
    };

    fetch();
  }, []);

  const onSearch = () => {
    setIsLoading((currentState: boolean) => !currentState);
    const startDate = new Date(chosenDate.valueOf());
    const endDate = new Date(chosenDate.valueOf());

    startDate.setHours(startTime.getHours());
    startDate.setMinutes(startTime.getHours());
    startDate.setSeconds(startTime.getHours());

    endDate.setHours(endTime.getHours());
    endDate.setMinutes(endTime.getHours());
    endDate.setSeconds(endTime.getHours());

    props.handleSearchClasses(startDate, endDate, chosenClassTypeId);
  };

  return (
    <Box style={{ margin: "3%" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <Typography variant="h6" component="div">
            יום האירוע
          </Typography>
          <MobileDatePicker
            label="יום אירוע"
            value={chosenDate}
            onChange={(newDate) => {
              setChosenDate(newDate!);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat={"dd/MM/yyyy"}
          />
          <Typography variant="h6" component="div">
            שעת התחלה
          </Typography>
          <MobileTimePicker
            label="שעת התחלה"
            value={startTime}
            onChange={(newTime) => {
              setStartTime(newTime!);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h6" component="div">
            שעת סיום
          </Typography>
          <MobileTimePicker
            label="שעת סיום"
            value={endTime}
            onChange={(newTime) => {
              setEndTime(newTime!);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h6" component="div">
            סוג כיתה
          </Typography>
          <FormControl>
            <InputLabel id="classTypeLabel">סוג כיתה</InputLabel>
            <Select
              value={chosenClassTypeId}
              labelId={"classTypeLabel"}
              label={"סוג כיתה"}
              onChange={(event) =>
                setChosenClassTypeId(parseInt(event.target.value as string))
              }
            >
              {classTypes.map((classType) => (
                <MenuItem key={classType.id} value={classType.id}>
                  {classType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LoadingButton
            onClick={onSearch}
            loading={isLoading}
            sx={{
              width: "100%",
            }}
            variant="contained"
            fullWidth
          >
            חפש
          </LoadingButton>
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};
