import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.paper.main,
    marginBottom: 5,
    border: theme.palette.paper.main === "#FFFFFF" ? `solid 1px #999999` : null,
  },
  author: {
    float: "right",
    color: theme.palette.info.main,
  },
  dragStyle: {
    backgroundColor: "#a30309",
    color: "white",
    opacity: 1,
  },
  draggedActive: {
    opacity: 0,
  },
}));

export default function TaskCard(props) {
  const classes = useStyles();

  // get current task => get content of task
  const { task } = props;
  const { content, author, status, _id } = task;

  function dragStart(event) {
    event.target.classList.add(classes.dragStyle);

    let draggedElement = event.target;
    setTimeout(function () {
      draggedElement.classList.remove(classes.dragStyle);
      draggedElement.classList.add(classes.draggedActive);
    }, 1);

    event.dataTransfer.setData("text", event.target.id);
  }
  function dragEnd(event) {
    let draggedElement = event.target;
    setTimeout(function () {
      draggedElement.classList.remove(classes.draggedActive);
    }, 100);
  }
  console.log(author)

  return (
    <Card
      className={classes.card}
      id={_id}
      draggable="true"
      onDragStart={(e) => dragStart(e)}
      onDragEnd={(e) => dragEnd(e)}
    >
      <CardContent>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          {content}
        </Typography>
        <Typography
          className={classes.author}
          variant="caption"
          color="secondary"
        >
          - {author}
        </Typography>
      </CardContent>
      {status === "todo" || status === "inprogress" ? (
        <CardActions disableSpacing>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <Button
                className={classes.arrow}
                color="secondary"
                onClick={() => props.handleTaskEdit(task._id,task.status)}
              >
                <ArrowForwardIcon color="secondary" />
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      ) : null}
    </Card>
  );
}
