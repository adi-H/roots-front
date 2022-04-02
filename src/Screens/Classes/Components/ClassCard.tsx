import ReactCardFlip from 'react-card-flip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { CardActionArea } from '@mui/material';
import { createTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function BasicCard(props: any) {
  const info = props.info;
  var cardColor = "#344966";
  var projector = "כן";

  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped((currentState) => !currentState);
  };

  if (info.type == "פלוגתית") {
    cardColor = "#88D498";
  } else if (info.type == "דו\"פ") {
    cardColor = "#00A5CF";
  } else if (info.type == "גדודית") {
    cardColor = "#F06543";
  }

  if (!info.projector) {
    projector = "לא";
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card sx={{ backgroundColor: cardColor, minHeight: 175 }}>
          <CardContent>
            <CardActionArea onClick={flipCard}>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                בניין {info.building}
              </Typography>
              <Typography variant="h5" component="div">
                {info.no}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                כיתה {info.type}
              </Typography>
            </CardActionArea>

          </CardContent>
          <CardActions>
            <Button sx={{ borderRadius: 28 }} onClick={handleClickOpen} variant="contained" fullWidth>שריין כיתה</Button>
          </CardActions>
        </Card>

        <Card sx={{ backgroundColor: cardColor, minHeight: 175 }} >
          <CardActionArea onClick={flipCard}>
            <CardContent>
              <Typography variant="h5" component="div">
                פרטי הכיתה:
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                גודל: {info.size}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                מקרן: {projector}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                מחשבים: {projector}
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
            label="שם האירוע"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>שריין</Button>
          <Button onClick={handleClose}>בטל</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}