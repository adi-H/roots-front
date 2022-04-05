import { Dialog, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  title: string;
};

const Modal = (props: Props) => {
  const { isOpen, handleClose, title, children } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      PaperProps={{ sx: { overflow: "inherit" } }}
    >
      <Paper
        sx={{
          background: "#C82626",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <Paper
          sx={{
            background: "white",
            borderRadius: "25px",
            width: "55%",
            position: "relative",
            bottom: "20px",
          }}
        >
          <Typography
            textAlign="center"
            fontSize="28px"
            color="#D86767"
            fontWeight="700"
          >
            {title}
          </Typography>
        </Paper>
        <Box color="#ffffff">{children}</Box>
      </Paper>
    </Dialog>
  );
};

export default Modal;
