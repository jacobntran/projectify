import React from "react";
import { Grid, withStyles, Container } from "@material-ui/core";
import io from "socket.io-client";
import { connect } from "react-redux";
import ProjectCardColumn from "./ProjectCardColumn";
import ProjectChat from "./ProjectChat";
import ProjectAlert from "./ProjectAlert";
import { fetchProject, addTask, addChat, editTask } from "../../actions";
import axios from "axios";

const styles = (theme) => ({
  wrapper: {
    width: "100vw",
    maxWidth: "100%",
    minHeight: "93vh",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    backgroundColor: theme.palette.paper.main,
  },
  container: {
    padding: "0 0 0 0",
  },
  projectUtilRow: {
    padding: "0 24px",
  },
  grid: {
    margin: "auto",
    marginTop: 5,
  },
  chat: {
    position: "fixed",
    bottom: 0,
  },
  footer: {
    position: "absolute",
    top: "auto",
    bottom: 0,
    left: 0,
    width: "100vw",
    display: "flex",
  },
});

class ViewProject extends React.Component {
  //create top level socket variable
  socket = io("/");

  //get id of current project
  projectId = this.props.match.params.id;

  //input states
  state = { addTodo: "", newChat: "" };

  componentDidMount() {
    //get id from url
    const { id } = this.props.match.params;
    this.props.fetchProject(id);

    //init socket.io

    //join specific room for project
    this.socket.on("connect", () => {
      this.socket.emit("room", this.projectId);
    });

    //listener for incoming messages
    this.socket.on("RECEIVE_MESSAGE", (data) => {
      console.log(data);
      // make sure we aren't duplicating the current user's chats
      // if (data.author !== this.props.currentUser.name) {
      this.props.addChat(data);
      // }
    });

    this.socket.on("UPDATE_PROJECT", () => {
      console.log("update");
      this.props.fetchProject(id);
    });
  }

  // componentDidUpdate() {
  //   this.socket.on("UPDATE_PROJECT", () => {
  //     console.log("update");
  //     this.props.fetchProject(this.props.match.params.id);
  //   });
  // }

  // live task card changes
  emitTaskChange = () => {
    setTimeout(() => {
      this.socket.emit("TASK_CHANGE", { data: null });
    }, 5000);
  };

  //controlled input for new todo
  onChange = (event) => {
    this.setState({ addTodo: event.target.value });
  };

  //controlled input for chat
  onChatChange = (event) => {
    this.setState({ newChat: event.target.value });
  };

  //handle chat submit
  onChatSubmit = (e) => {
    e.preventDefault();

    //create object with current user as author, message, and a timestamp
    const chat = {
      author: this.props.currentUser.name,
      message: this.state.newChat,
      createdAt: new Date().toLocaleString(),
    };

    //send message through socket
    this.socket.emit("SEND_MESSAGE", chat);

    // //call action creator to add new chat
    // this.props.addChat(this.projectId, chat);

    this.setState({ newChat: "" });

    axios.put(`/project/${this.projectId}/chat`, chat);
  };

  //handle submission for a new task
  onAddSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.currentUser)

    //get current user and add a status to the task
    const task = {
      author: this.props.currentUser.name,
      content: this.state.addTodo,
      status: "todo",
    };
    //call action creator with new task and project Id
    this.props.addTask(this.projectId, task);
    this.emitTaskChange();
    this.setState({ addTodo: "" });
  };

  handleTaskEdit = (taskId, currentStatus) => {
    const newStatus = currentStatus === "todo" ? "inprogress" : "completed";
    this.props.editTask(this.projectId, taskId, newStatus);
    this.emitTaskChange();
  };

  render() {
    //material ui classes
    const { classes } = this.props;
    //get chat and tasks from selected project
    const { tasks } = this.props;
    if (
      this.props.projectUsers &&
      this.props.projectUsers.some((id) => parseInt(id) === parseInt(this.props.currentUser.userId))
    ) {
      return (
        <div className={classes.wrapper}>
          <Container className={classes.container} maxWidth="lg">
            <Grid
              className={classes.grid}
              container
              xs={12}
              spacing={3}
              justify="space-between"
            >
              <Grid item xs={12} sm={4}>
                <ProjectCardColumn
                  header="Things To Do"
                  onChange={this.onChange}
                  addTodo={this.state.addTodo}
                  onAddSubmit={this.onAddSubmit}
                  cards={
                    tasks && tasks.filter((task) => task.status === "todo")
                  }
                  handleTaskEdit={this.handleTaskEdit}
                  emitTaskChange={this.emitTaskChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ProjectCardColumn
                  header="In Progress"
                  cards={
                    tasks &&
                    tasks.filter((task) => task.status === "inprogress")
                  }
                  handleTaskEdit={this.handleTaskEdit}
                  emitTaskChange={this.emitTaskChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ProjectCardColumn
                  header="Completed"
                  cards={
                    tasks && tasks.filter((task) => task.status === "completed")
                  }
                  emitTaskChange={this.emitTaskChange}
                />
              </Grid>
              <footer className={classes.footer}>
                <ProjectChat
                  className={classes.chat}
                  currentChat={this.state.newChat}
                  onChange={this.onChatChange}
                  onSubmit={this.onChatSubmit}
                  chat={this.props.chat}
                />
              </footer>
            </Grid>
          </Container>
        </div>
      );
    } else {
      return (
        <div className={classes.wrapper}>
          <ProjectAlert
            projectId={this.props.projectId}
            users={this.props.projectUsers}
            projectName={this.props.projectName}
            currentUser={this.props.currentUser}
          />
          <Container className={classes.container} maxWidth="lg">
            <Grid
              className={classes.grid}
              container
              spacing={3}
              justify="space-between"
            >
              <Grid item xs={12} sm={4}>
                <ProjectCardColumn header="Things To Do" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ProjectCardColumn header="In Progress" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ProjectCardColumn header="Completed" />
              </Grid>
              <footer className={classes.footer}>
                <ProjectChat />
              </footer>
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.selectProject) {
    const {
      users: projectUsers,
      _id: projectId,
      name: projectName,
      chat,
      tasks,
    } = state.selectProject;

    return {
      currentUser: state.auth,
      projectUsers,
      projectName,
      chat,
      projectId,
      tasks,
    };
  } else {
    return {
      currentUser: state.auth,
    };
  }
};

export default withStyles(styles)(
  connect(mapStateToProps, { fetchProject, addTask, addChat, editTask })(
    ViewProject
  )
);
