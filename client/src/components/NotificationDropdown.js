import React from 'react';
import {
  withStyles,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
  Badge,
  Popper,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import axios from 'axios';

import { removeNotification } from '../actions';

const styles = (theme) => ({
  paper: {
    backgroundColor: theme.palette.paper.lighter,
  },
  list: {
    width: 300,
  },
  listItemText: {
    color: theme.palette.primary.main,
    fontSize: 12,
  },
});

class NotificationDropdown extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    if (this.props.notifications && this.props.notifications.length > 0) {
      this.setState({
        anchorEl: this.state.anchorEl ? null : event.currentTarget,
      });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  //handle accepting permission
  onClick = (notificationID, projectID, requesterID) => {
    console.log(requesterID);
    axios
      .put(`/accept/request/${projectID}`, {
        userId: this.props.userId,
        requesterID,
        notificationID,
      })
      .then((response) => this.props.removeNotification(notificationID));
    this.setState({ anchorEl: null });
  };

  renderNotifications = () => {
    return this.props.notifications.map((notif) => {
      return (
        <ListItem
          className={this.props.classes.menuItem}
          onClick={this.handleClose}
          key={notif._id}
        >
          <ListItemText className={this.props.classes.listItemText}>
            {notif.notification}
          </ListItemText>
          <IconButton
            color='secondary'
            onClick={() =>
              this.onClick(notif._id, notif.projectId, notif.requesterId)
            }
          >
            <CheckIcon />
          </IconButton>
          <IconButton color='secondary'>
            <ClearIcon />
          </IconButton>
        </ListItem>
      );
    });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Tooltip title='Notifications'>
          <IconButton
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={this.handleClick}
            color='primary'
          >
            <Badge badgeContent={this.props.notifications.length} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Popper id={id} open={open} anchorEl={this.state.anchorEl}>
          <ClickAwayListener onClickAway={this.handleClose}>
            <div className={classes.paper}>
              <List className={classes.list}>{this.renderNotifications()}</List>
            </div>
          </ClickAwayListener>
        </Popper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { userId: state.auth.userId, notifications: state.auth.notifications };
};

const wrapped = connect(mapStateToProps, { removeNotification })(
  NotificationDropdown
);

export default withStyles(styles)(wrapped);
