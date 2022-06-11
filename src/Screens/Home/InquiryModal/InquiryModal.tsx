import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";
import { InquiryService } from "../../../Services/InquiryService";
import { RecipientService } from "../../../Services/RecipientService";
import { Recipient, User } from "../../../types/types";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "80%",
}));

const SendButton = styled(Button)(() => ({
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translate(-50%, 50%)",
  width: "50%",
  borderRadius: "20px",
}));

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
      toast.success("הפנייה נשלחה בהצלחה");
    } catch (e) {
      props.onClose();
      toast.error("אירעה שגיאה בשליחת הפנייה");
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          overflow: "inherit",
          backgroundColor: "#fff",
          borderRadius: "10px",
        },
      }}
      fullWidth
      open={props.isOpen}
      onClose={props.onClose}
    >
      <IconButton
        sx={{ position: "absolute", top: 0, left: 0 }}
        onClick={props.onClose}
      >
        <Close />
      </IconButton>
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
      <Stack alignItems="center" spacing={1} mb={4}>
        <StyledFormControl>
          <InputLabel id="recipientLabel">אל</InputLabel>
          <Select
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
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            label="נושא"
            value={title}
            onChange={(event) => setTitle(event.target.value as string)}
          />
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            label="תוכן"
            multiline
            value={content}
            onChange={(event) => setContent(event.target.value as string)}
          />
        </StyledFormControl>
      </Stack>
      <SendButton
        variant="contained"
        style={{
          background: "#222",
        }}
        onClick={handleInquirySubmit}
      >
        שלח פנייה
      </SendButton>
    </Dialog>
  );
};
