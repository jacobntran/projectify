import React from "react";
import {
  Typography,
  Divider,
  makeStyles,
  Button,
  TextField,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TaskCard from "./TaskCard";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editTask } from "../../actions";

const useStyles = makeStyles((theme) => ({
  //main outer column div
  div: {
    height: "75vh",
    backgroundColor: theme.palette.paper.light,
    padding: 15,
    border: theme.palette.paper.main === "#FFFFFF" ? "solid 1px #999999" : null,
    overflow: "auto",
    "&::-webkit-scrollbar-track-piece": {
      backgroundColor: theme.palette.paper.main,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 3,
    },
    "&::-webkit-scrollbar-button": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  divider: {
    // marginTop: 15,
    backgroundColor: "#999999",
  },
  cardContainer: {
    marginTop: 15,
  },
  addField: {
    backgroundColor: theme.palette.secondary.main,
  },
  expansionPanel: {
    background: "none",
    color: theme.palette.primary.main,
  },
  inputLabel: {
    color: theme.palette.info.main,
  },
  input: {
    color: theme.palette.info.main,
  },
  inputOutline: {
    borderColor: theme.palette.info.main,
  },
  expansionDetails: {
    display: "inline-block",
    justifyContent: "center",
    width: "85%",
    padding: "0 10px",
  },
  enterTask: {
    marginBottom: 5,
  },
  expansionPanelSummary: {
    height: 50
  }
}));

export default function ProjectCardColumn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const match = useRouteMatch({
    path: "/project/view/:id",
    exact: true,
    strict: true,
    sensitive: true,
  });

  //handle drag events
  function onDragOver(event) {
    event.preventDefault();
  }

  // change task status when drag&drop is done
  function onDrop(event) {
    const id = event.dataTransfer.getData("text");

    const colName = event.target.getAttribute("laneheader");

    event.dataTransfer.clearData();

    let status = {
      "Things To Do": "todo",
      "In Progress": "inprogress",
      Completed: "completed",
    }[colName];
    if (status) {
      dispatch(editTask(match.params.id, id, status));
      props.emitTaskChange();
    }
  }

  // specificly modify the todo column to have input when + is clicked
  const renderAddList = () => {
    return (
      <ExpansionPanel className={classes.expansionPanel}>
        <ExpansionPanelSummary
          className={classes.expansionPanelSummary}
          expandIcon={
            <IconButton color="secondary">
              <AddIcon />
            </IconButton>
          }
        >
          <Typography variant="h6" className={classes.heading}>
            {props.header}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionDetails}>
          <form onSubmit={props.onAddSubmit}>
            <TextField
              className={classes.enterTask}
              fullWidth
              variant="outlined"
              color="secondary"
              InputLabelProps={{ className: classes.inputLabel }}
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
              }}
              id="standard-basic"
              label="Enter a new task"
              value={props.addTodo}
              onChange={props.onChange}
            />
            <br />
            <Button
              type="submit"
              size="small"
              color="secondary"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  return (
    <div
      className={classes.div}
      onDragOver={onDragOver}
      onDrop={onDrop}
      laneheader={props.header}
    >
      {/* <div className={classes.header}> */}
      {props.header === "Things To Do" ? (
        renderAddList()
      ) : (
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary className={classes.expansionPanelSummary} disabled>
            <Typography variant="h6" className={classes.heading}>
              {props.header}
            </Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      )}
      <Divider variant="fullWidth" light={true} className={classes.divider} />

      <div className={classes.cardContainer} cardcontainer="true">
        {props.cards &&
          props.cards.map((task) => (
            <TaskCard
              handleTaskEdit={props.handleTaskEdit}
              key={task._id}
              task={task}
            />
          ))}
      </div>
    </div>
  );
}
