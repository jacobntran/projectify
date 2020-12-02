import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
  Hidden,
  Tooltip,
  IconButton,
  withStyles,
} from '@material-ui/core';

import DehazeIcon from '@material-ui/icons/Dehaze';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import GoogleAuth from './GoogleAuth';
import { connect } from 'react-redux';
import NotificationDropdown from './NotificationDropdown';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  homeLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuItem: {
    backgroundColor: theme.palette.paper.lighter,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.paper.light,
    },
  },
  toolBar: {
    minHeight: '7vh',
    maxHeight: '7vh',
    backgroundColor: theme.palette.paper.main,
  },
  color: {
    color: '#FEB2D0',
  },
  responsiveLink: {
    color: theme.palette.secondary.main,
  },
});

class ButtonAppBar extends React.Component {
  //anchor element for dropdown menu on smaller screens
  state = {
    anchorEl: null,
  };

  // handle opening and closing of dropdown
  handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    // setAnchorEl(null);
    this.setState({ anchorEl: null });
  };

  renderButtons = () => {
    if (this.props.isSignedIn) {
      return (
        <React.Fragment>
          <Tooltip title='Notifications'>
            <NotificationDropdown />
          </Tooltip>
          <Tooltip title='Create a New Project'>
            <IconButton color='primary' component={Link} to='/project/new'>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='View Existing Projects'>
            <IconButton color='primary' component={Link} to='/project/view/all'>
              <ListIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar className={classes.toolBar}>
            <Typography color='primary' variant='h5' className={classes.title}>
              <Link className={classes.homeLink} to='/'>
                Projectify
              </Link>
            </Typography>

            {/* Main app bar buttons - hidden on smaller screen size */}
            <Hidden smDown>
              {this.renderButtons()}

              <GoogleAuth type='appbar' />
            </Hidden>

            {/* Drop down menu -- hidden on larger screen sizes */}
            <Hidden mdUp>
              <GoogleAuth type='appbar' />
              <Button
                color='primary'
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={this.handleClick}
              >
                <DehazeIcon />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={this.handleClose}
                >
                  <Link className={classes.responsiveLink} to='/project/new'>
                    Create New Project
                  </Link>
                </MenuItem>
                <MenuItem
                  className={classes.menuItem}
                  onClick={this.handleClose}
                >
                  <Link
                    to='/project/view/all'
                    className={classes.responsiveLink}
                  >
                    View Existing Projects
                  </Link>
                </MenuItem>
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

//get sign in status from state
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

const wrapped = connect(mapStateToProps)(ButtonAppBar);
export default withStyles(styles)(wrapped);
