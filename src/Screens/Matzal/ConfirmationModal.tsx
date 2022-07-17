import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmationModal = ({isOpen, onClose, onApprove, onReject}: Props) => {
  
  const header: string = "איפוס כל הצוותים";
  const content: string = "אישור יגרום לכל הצוותים להתאפס. בדוק לחצת בכוונה?";

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onReject}>חזל"ש</Button>
          <Button onClick={onApprove}>יאללה</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
