import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/AuthService";

type Props = { storeUserContext: () => void };

export const Login = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
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
        sx={{ mt: isWrongCredentials ? 1 : 3 }}
      >
        התחברות
      </Button>
    </Box>
  );
};
