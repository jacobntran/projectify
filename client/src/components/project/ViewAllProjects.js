import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Container,
  Typography,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
} from "@material-ui/core";

//fetch streams action
import { fetchProjects } from "../../actions";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "93vh",
    backgroundColor: theme.palette.paper.main,
  },
  tableContainer: {
    backgroundColor: theme.palette.paper.light,
    height: "70vh",
  },
  tableRow: {
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.paper.lighter,
    },
  },
  tableCell: {
    color: theme.palette.info.main,
  },
}));

function ViewAllProjects() {
  const classes = useStyles();

  //redux dispath hook
  const dispatch = useDispatch();

  //get userId from state
  const userId = useSelector((state) => state.auth.userId);
  //get all projects loaded into state and turn into array
  const projects = useSelector((state) => Object.values(state.projects));

  //call for user projects when sign in registers
  useEffect(() => {
    dispatch(fetchProjects(userId));
  }, [userId]);

  // render all projects as a table row
  const renderProjectList = () => {
    return projects.map((proj) => {
      return (
        <TableRow
          className={classes.tableRow}
          component={Link}
          to={`/project/view/${proj && proj._id}`}
        >
          <TableCell className={classes.tableCell}>{proj && proj.name}</TableCell>
          <TableCell className={classes.tableCell} align="right">
            {proj && proj.users.length}
          </TableCell>
          <TableCell className={classes.tableCell} align="right">
            {proj && proj.tasks.length}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="sm">
        <Typography variant="h6" color="primary" gutterBottom>
          Your Projects
        </Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>Name</TableCell>
                <TableCell className={classes.tableCell} align="right">
                  Users
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  Current Tasks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{projects ? renderProjectList() : null}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ViewAllProjects;
