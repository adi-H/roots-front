import { Button, Paper } from "@mui/material";
import { useState } from "react";
import Modal from "./Modal/Modal";

type Props = {};

const Kalag = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <Paper>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Text
      </Button>
      <Modal
        isOpen={modalOpen}
        handleClose={() => console.log("closed")}
        title="בדיקה"
      >
        dsfasdf
      </Modal>
    </Paper>
  );
};

export default Kalag;
