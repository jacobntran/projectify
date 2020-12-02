import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  alert: {
    backgroundColor: theme.palette.paper.main,
    color: theme.palette.info.main,
  },
}));

//alert user that they are not a permitted user
export default function ProjectAlert({
  projectId,
  users,
  projectName,
  currentUser,
}) {
  const classes = useStyles();
  //hook for whether alert is open or not
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequest = () => {

    //push new notification to project's permitted users
    axios.put("/project/request/permission", {
      _id: uuid(),
      projectId,
      notification: `${currentUser.name} would like permission to access your project: ${projectName}`,
      requesterId: currentUser.userId,
      users,
    });

    //close dialog
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.alert}>
          Sorry, looks like you currently are not a member of this project.
        </DialogTitle>
        <DialogContent className={classes.alert}>
          <DialogContentText
            className={classes.alert}
            id="alert-dialog-description"
          >
            Would you like to request permission to join?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.alert}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleRequest} color="secondary" variant="outlined">
            Request Permission
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
