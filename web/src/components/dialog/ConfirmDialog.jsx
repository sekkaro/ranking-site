import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

const ConfirmDialog = ({ open, onClose, onSuccess, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={onClose} color="primary">
          아니오
        </Button>
        <Button onClick={onSuccess} color="primary" autoFocus>
          예
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
