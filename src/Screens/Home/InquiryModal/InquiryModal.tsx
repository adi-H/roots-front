import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../Hooks/useAuth";
import { InquiryService } from "../../../Services/InquiryService";
import { RecipientService } from "../../../Services/RecipientService";
import { Recipient, User } from "../../../types/types";

/**
 * .textFieldWithNoBorder fieldset {
  border: none;
}

.sendButton {
  width: 60px;
  height: 60px;
  border-radius: 100% !important;
  background-color: white !important;
  position: fixed !important;
  font-weight: bold !important;
  font-size: 1rem !important;
  color: black !important;
  line-height: 1.1 !important;
  bottom: 29%;
  right: 81%;
  box-shadow: 0 4px 7px 0 rgb(0 0 0 / 10%);
}

.sendButton:focus {
  background-color: white;
}
 */

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const InquiryModal = (props: Props) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [recipientId, setRecipientId] = useState<number>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const currentUser = useAuth();

  useEffect(() => {
    const fetchRecipients = async () => {
      const newRecipients = await RecipientService.getAll();

      setRecipients(newRecipients);
    };

    fetchRecipients();
  }, []);

  const handleInquirySubmit = async () => {
    try {
      await InquiryService.send({
        title,
        content,
        from: { id: currentUser.id } as User,
        to: { id: recipientId } as Recipient,
      });
      props.onClose();
      Swal.fire({ title: "הפנייה נשלחה בהצלחה", icon: "success" });
    } catch (e) {
      props.onClose();
      Swal.fire({ title: "קרתה שגיאה בשליחת הפנייה", icon: "error" });
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          overflow: "inherit",
          backgroundColor: "#a3cdda",
          borderRadius: "20px",
        },
      }}
      fullWidth
      open={props.isOpen}
      onClose={props.onClose}
    >
      <Paper
        sx={{
          backgroundColor: "white",
          borderRadius: "25px",
          width: "55%",
          boxShadow: "2",
          position: "relative",
          left: "22%",
          bottom: "20px",
          textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          style={{ color: "black", textAlign: "center" }}
          fontWeight={"bold"}
          fontSize={"1.8rem"}
        >
          תיבת פניות
        </Typography>
      </Paper>
      <Box sx={{ display: "flex", marginBottom: "10%" }}>
        <Paper
          sx={{
            backgroundColor: "black",
            borderRadius: "0 25px 25px 0",
            width: "30%",
            boxShadow: "0 4px 4px 0 rgb(0 0 0 / 25%)",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            sx={{ paddingLeft: "35%", marginTop: "12%" }}
            fontWeight="bold"
            fontSize="1.3rem"
            color="white"
          >
            אל
          </Typography>
        </Paper>
        <Box sx={{ width: "10%" }} />
        <FormControl sx={{ width: "50%" }}>
          <InputLabel id="recipientLabel">אל</InputLabel>
          <Select
            sx={{
              borderRadius: "20px",
              backgroundColor: "white",
            }}
            labelId="gdudLabel"
            label="אל"
            value={recipientId}
            onChange={(event) =>
              setRecipientId(parseInt(event.target.value as string))
            }
          >
            {recipients.map((recipient: Recipient) => (
              <MenuItem key={recipient.id} value={recipient.id}>
                {recipient.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", marginBottom: "10%" }}>
        <Paper
          sx={{
            backgroundColor: "black",
            borderRadius: "0 25px 25px 0",
            width: "30%",
            boxShadow: "0 4px 4px 0 rgb(0 0 0 / 25%)",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            sx={{ paddingLeft: "35%", marginTop: "12%" }}
            fontWeight="bold"
            fontSize="1.3rem"
            color="white"
          >
            נושא
          </Typography>
        </Paper>
        <Box sx={{ width: "10%" }} />
        <FormControl sx={{ width: "50%" }}>
          <TextField
            sx={{ borderRadius: "20px", backgroundColor: "white" }}
            label="נושא"
            value={title}
            onChange={(event) => setTitle(event.target.value as string)}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", marginBottom: "10%" }}>
        <Paper
          sx={{
            backgroundColor: "black",
            borderRadius: "0 25px 25px 0",
            width: "30%",
            boxShadow: "0 4px 4px 0 rgb(0 0 0 / 25%)",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            sx={{ paddingLeft: "35%", marginTop: "12%" }}
            fontWeight="bold"
            fontSize="1.3rem"
            color="white"
          >
            תוכן
          </Typography>
        </Paper>
        <Box sx={{ width: "10%" }} />
        <FormControl sx={{ width: "50%" }}>
          <TextField
            sx={{ borderRadius: "20px", backgroundColor: "white" }}
            label="תוכן"
            multiline
            value={content}
            onChange={(event) => setContent(event.target.value as string)}
          />
        </FormControl>
      </Box>
      <Button onClick={handleInquirySubmit}>שלח פנייה</Button>
    </Dialog>
  );
};
