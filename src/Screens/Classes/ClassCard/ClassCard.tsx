import { CardActionArea, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Class } from "../../../types/types";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
  },
});

type Props = {
  classInfo: Class;
  isPluga: boolean;
  handleAssignClass: (eventName: string) => void;
};

const plugaCardColor = "#88D498";
const gdudCardColor = "#F06543";

export const ClassCard = (props: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [eventName, setEventName] = useState("");

  const flipCard = () => {
    setIsFlipped((currentState) => !currentState);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAssignClassClick = () => {
    props.handleAssignClass(eventName);
    handleClose();
  };

  return (
    <div>
      <ReactCardFlip isFlipped={false} flipDirection="horizontal">
        <Card
          sx={{
            backgroundColor: props.isPluga ? plugaCardColor : gdudCardColor,
            minHeight: 175,
          }}
        >
          <CardContent>
            <CardActionArea onClick={flipCard}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                בניין {props.classInfo.building}
              </Typography>
              <Typography variant="h5" component="div">
                {props.classInfo.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                כיתה {props.classInfo.type.name}
              </Typography>
            </CardActionArea>
          </CardContent>
          <CardActions>
            <Button
              sx={{ borderRadius: 28 }}
              onClick={handleClickOpen}
              variant="contained"
              fullWidth
            >
              שריין כיתה
            </Button>
          </CardActions>
        </Card>

        {/* Flipped card is an optional feature - we need to store more info on the classes */}
        <Card sx={{ backgroundColor: "#344966", minHeight: 175 }}>
          <CardActionArea onClick={flipCard}>
            <CardContent>
              <Typography variant="h5" component="div">
                פרטי הכיתה:
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                גודל: {props.classInfo.type.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </ReactCardFlip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>מה האירוע?</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={eventName}
            onChange={(event) => setEventName(event.target.value as string)}
            label="שם האירוע"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onAssignClassClick}>שריין</Button>
          <Button onClick={handleClose}>בטל</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
