import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { AuthService } from "../../Services/AuthService";
import HOME_BACKGROUND from "../../Images/homeBackground.png";

type Props = { storeUserContext: () => void };

export const Login = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    if (await AuthService.login(username, password)) {
      props.storeUserContext();
      navigate((location.state as any)?.from?.pathname || "/", {
        replace: true,
      });
    } else {
      setIsWrongCredentials(true);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Stack
        sx={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${HOME_BACKGROUND}) rgb(0,255,106)`,
        }}
      >
        <PageTitle title="התחברות" disableBackButton />
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(4),
            width: "25%",
            minWidth: "max-content",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            sx={{ marginBottom: "10px" }}
            component="h1"
            variant="h5"
            fontWeight="bold"
          >
            התחברות
          </Typography>
          <TextField
            value={username}
            onChange={handleUsernameChange}
            label="תעודת זהות"
          />
          <TextField
            value={password}
            onChange={handlePasswordChange}
            style={{ marginTop: "10px" }}
            type="password"
            label="סיסמא"
          />
          <Typography
            display={isWrongCredentials ? "block" : "none"}
            sx={{ mt: 1 }}
            color="red"
          >
            שם המשתמש/הסיסמא שגויים
          </Typography>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            sx={{ borderRadius: 28, mt: isWrongCredentials ? 1 : 3 }}
          >
            התחברות
          </Button>
        </Paper>
      </Stack>
    </>
  );
};
