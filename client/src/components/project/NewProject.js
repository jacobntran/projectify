import React from "react";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  withStyles,
  Container,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";
import { createProject } from "../../actions";

const styles = (theme) => ({
  wrapper: {
    width: "100vw",
    maxWidth: "100%",
    backgroundColor: theme.palette.paper.main,
    height: "94.5vh",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  multilineColor: {
    color: "white",
  },
  notchedOutline: {
    borderColor: theme.palette.info.main,
  },
  inputLabel: {
    color: theme.palette.info.main,
  },
  input: {
    color: theme.palette.info.main,
  },
  createHeading: {
    color:
      theme.palette.paper.main === "#f0eef1"
        ? theme.palette.primary.main
        : "white",
  },
});

class NewProject extends React.Component {
  state = { projectName: "", redirect: false };

  //set controlled input value for newly created project
  handleChange = (event) => {
    this.setState({ projectName: event.target.value });
  };

  // submit new project name
  onSubmit = (event) => {
    event.preventDefault();

    //redux action creator
    this.props.createProject({
      name: this.state.projectName,
    });

    //redirect to all projets list
    this.setState({ redirect: true });
  };

  render() {
    //handle redirect if user submitted new project
    if (this.state.redirect) {
      return <Redirect to="/project/view/all"></Redirect>;
    }
    //JSS classes
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Container maxWidth={"lg"}>
          <Grid
            className={classes.grid}
            container
            spacing={3}
            justify="space-between"
          >
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <AddCircleIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h6"
                  className={classes.createHeading}
                >
                  Create New Project
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={this.onSubmit}
                >
                  <TextField
                    variant="outlined"
                    color="primary"
                    margin="normal"
                    required
                    fullWidth
                    id="newProject"
                    label="Project Name"
                    name="newProject"
                    autoComplete="newProject"
                    autoFocus
                    onChange={this.handleChange}
                    InputLabelProps={{ className: classes.inputLabel }}
                    InputProps={{
                      className: classes.multilineColor,
                      classes: {
                        root: classes.input,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </Container>
          </Grid>
        </Container>
      </div>
    );
  }
}

//connect redux action creators to component
const wrapped = connect(null, { createProject })(NewProject);

//connect material ui styles
export default withStyles(styles)(wrapped);
