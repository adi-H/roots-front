import ReactCardFlip from 'react-card-flip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { CardActionArea } from '@mui/material';

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

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card sx={{ backgroundColor: cardColor, minHeight:175 }}>
        <CardActionArea onClick={flipCard}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              בניין {info.building}
            </Typography>
            <Typography variant="h5" component="div">
              {info.no}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              כיתה {info.type}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={flipCard} variant="contained" fullWidth>שריין כיתה</Button>
          </CardActions>
        </CardActionArea>
      </Card>
      <Card sx={{ backgroundColor: cardColor, minHeight:175 }} >
        <CardActionArea onClick={flipCard}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              גודל: {info.size}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              מקרן: {projector}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ReactCardFlip>
  );
}