import React, { Component } from "react";
import {
  Popper,
  Typography,
  TextField,
  ClickAwayListener,
  withStyles,
  List,
  ListItem,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";

const styles = (theme) => ({
  popper: {
    height: "351px",
    width: "284px",
  },
  chatContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.paper.lighter,
    position: "relative",
    border: "solid 1px",
    borderColor: theme.palette.secondary.main,
  },
  paper: {
    backgroundColor: theme.palette.paper.light,
    padding: "5px 0",
  },
  chatList: {
    maxHeight: "65%",
    overflow: "auto",
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    boxSizing: "border-box",
    width: "287px",
    padding: "5px 30px",
    marginLeft: "auto",
    marginRight: 20,
    borderRadius: 3,
    "&:hover": {
      cursor: "pointer",
    },
  },
  heading: {
    borderBottom: "solid 1px black",
  },
  form: {
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
  textfield: {
    width: "100%",
    borderTop: `solid 1px ${theme.palette.secondary.main}`,
  },
  textfieldLabel: {
    color: theme.palette.info.main,
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: theme.palette.secondary.main,
    color: "yellow !important",
  },
  textfieldRoot: {
    color: theme.palette.primary.main === "#7BC8F6" ? "#fff" : "000000",
    padding: "0 10px",
  },
  divider: {
    width: "100%",
  },
  chatBubble: {
    backgroundColor: theme.palette.secondary.main,
    // display: "flex",
    padding: "0 5px",
    borderRadius: 5,
    maxWidth: "90%",
    wordWrap: "break-word",
  },
  ownBubble: {
    backgroundColor: theme.palette.primary.main,
    // display: "flex",
    padding: "0 5px",
    borderRadius: 5,
    maxWidth: "90%",
    wordWrap: "break-word",
  },
  listItem: {
    padding: "0 5px",
    marginBottom: 5,
  },
});

class ProjectChat extends Component {
  listEnd = null;

  scrollToBottom = (ele = this.listEnd) => {
    if (ele) {
      ele.scrollIntoView({ behavior: "auto" });
    }
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    setTimeout(() => this.scrollToBottom(), 200);
  }

  //anchor element for chat box
  state = {
    achorEl: null,
  };

  // set click handler for opening/closing chat box
  handleClick = (event) => {
    this.setState({
      anchorEl: this.state.anchorEl ? null : event.currentTarget,
    });
    console.log("HandleClick popper called");
    console.log(event.currentTarget);
  };

  //set click away listener to close chat box
  onClickAway = () => {
    this.setState({
      anchorEl: null,
    });
  };

  //render all chat messages into chat bubbles
  renderChatMessages = () => {
    return (
      this.props.chat &&
      this.props.chat.map((el) => {
        return (
          <ListItem className={this.props.classes.listItem}>
            <Paper
              className={
                el.author === this.props.username
                  ? this.props.classes.ownBubble
                  : this.props.classes.chatBubble
              }
            >
              <Typography noWrap={false} variant="body2" color="inherit">
                {el.message}
              </Typography>
              <Typography variant="caption" color="inherit">
                - {el.author}
              </Typography>
            </Paper>
          </ListItem>
        );
      })
    );
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = this.open ? "simple-popper" : undefined;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper
          borderRadius="borderRadius"
          onClick={this.handleClick}
          className={classes.button}
          color="secondary"
        >
          <Typography variant="body1" color="inherit">
            Chat
          </Typography>
        </Paper>

        <Popper
          className={classes.popper}
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
        >
          <ClickAwayListener onClickAway={this.onClickAway}>
            <div className={classes.chatContainer}>
              <Paper className={classes.paper}>
                <Typography variant="h6" align="center" color="secondary">
                  Chat
                </Typography>
              </Paper>

              <List className={classes.chatList} id="chat-container">
                {this.renderChatMessages()}
                <div
                  style={{ float: "left", clear: "both" }}
                  id="dummyChat"
                  ref={(el) => {
                    this.listEnd = el;
                  }}
                ></div>
              </List>

              <form
                onSubmit={this.props.onSubmit}
                className={classes.form}
                noValidate
                autoComplete="off"
              >
                <TextField
                  className={classes.textfield}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                      root: classes.textfieldRoot,
                    },
                  }}
                  InputLabelProps={{ className: classes.textfieldLabel }}
                  size="small"
                  id="outlined-basic"
                  label="Type something..."
                  color="secondary"
                  value={this.props.currentChat}
                  onChange={this.props.onChange}
                />
              </form>
            </div>
          </ClickAwayListener>
        </Popper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.name,
  };
};

const wrapped = connect(mapStateToProps)(ProjectChat);

export default withStyles(styles)(wrapped);
