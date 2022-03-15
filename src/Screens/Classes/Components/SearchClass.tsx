import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// const data = [
//     { "no": "805", "building": "נקרות", "type": "פלוגתית", "projector": true, "size": "פלוגתית" },
//     { "no": "622", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
//     { "no": "455", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
//     { "no": "125", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
//     { "no": "405", "building": "רבין", "type": "פלוגתית", "projector": false, "size": "צוותית" },
//     { "no": "206", "building": "מחשבים", "type": "גדודית", "projector": true, "size": "פלוגתית" },
//     { "no": "898", "building": "מחשבים", "type": "גדודית", "projector": true, "size": "פלוגתית" },
//     { "no": "805", "building": "נקרות", "type": "בה\"דית", "projector": true, "size": "פלוגתית" },
//   ];


export default function ResponsiveDatePickers(props: any) {
    const [date, setDate] = React.useState<Date | null>(new Date());
    const [startTime, setStartTime] = React.useState<Date | null>(new Date());
    const [endTime, setEndTime] = React.useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = React.useState(false);


    const load = () => {
        setIsLoading((currentState: boolean) => !currentState)
        setTimeout(async () => {
            props.passChildData();
            setIsLoading((currentState: boolean) => !currentState)
        }, 1000)
    }
    return (
        <main style={{ padding: "1rem 0", margin: "3%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <Typography variant="h6" component="div">
                        יום האירוע
                    </Typography>
                    <MobileDatePicker
                        label="יום אירוע"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Typography variant="h6" component="div">
                        שעת התחלה
                    </Typography>
                    <MobileTimePicker
                        label="שעת התחלה"
                        value={startTime}
                        onChange={(newValue) => {
                            setStartTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Typography variant="h6" component="div">
                        שעת סיום
                    </Typography>
                    <MobileTimePicker
                        label="שעת סיום"
                        value={endTime}
                        onChange={(newValue) => {
                            setEndTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <LoadingButton onClick={load} loading={isLoading} sx={{ display: "flex", maxWidth: 375, position: "fixed", bottom: 0 }} variant="contained" fullWidth>חפש</LoadingButton>

                </Stack>
            </LocalizationProvider>
        </main>
    );
}
