import React from 'react';
import {
  Grid,
  Container,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';

import collabPicture from '../images/collaborate.svg';
import remotePicture from '../images/remote.svg';
import GoogleAuth from './GoogleAuth';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  wrapper: {
    width: '100vw',
    maxWidth: '100%',
  },
  container: {
    height: '80vh',
    margin: 'auto',
  },
  subWrapper1: {
    minHeight: '80vh',
    width: '100%',
    backgroundColor: theme.palette.paper.main,
  },
  subWrapper2: {
    minHeight: `80vh`,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  description: {
    marginTop: 'auto',
  },
  descriptionContainer: {
    marginBottom: 20,
  },

  getStarted: {
    textDecoration: 'none',
  },

  //animations
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  descriptionAnimation: {
    animationName: '$fadeIn',
    animationDuration: '8s',
  },
});

class LandingPage extends React.Component {
  buttonLink = () => {
    if (this.props.isSignedIn) {
      return (
        <React.Fragment>
          <Link
            style={{ textDecoration: 'none' }}
            className={this.props.classes.getStarted}
            to='/projects/new'
          >
            <Button
              className={this.props.classes.getStarted}
              size='small'
              color='secondary'
              variant='contained'
            >
              Get Started
            </Button>
          </Link>
        </React.Fragment>
      );
    } else {
      return <GoogleAuth type='landing' />;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.subWrapper1}>
          <Container maxWidth='lg'>
            <Grid
              className={classes.container}
              item
              container
              alignItems='center'
              justify={'center'}
              spacing={3}
              xs={12}
              md={10}
            >
              <Grid item xs={12} md={4}>
                <img height='100%' width='100%' src={collabPicture} alt='' />
              </Grid>
              <Grid item container justify='space-around' xs={12} md={8}>
                <Grid
                  item
                  sm={12}
                  container
                  justify='space-between'
                  className={classes.descriptionContainer}
                >
                  <Grid item xs={5}>
                    <Typography
                      className={classes.descriptionAnimation}
                      align='center'
                      variant='h3'
                      color='primary'
                    >
                      /prəˈjekt/
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      className={classes.descriptionAnimation}
                      align='center'
                      variant='h3'
                      color='primary'
                    >
                      /ˈpräˌjekt/
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      className={classes.descriptionAnimation}
                      align='center'
                      variant='body2'
                      color='primary'
                    >
                      to extend outward beyond something else.
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      className={classes.descriptionAnimation}
                      align='center'
                      variant='body2'
                      color='primary'
                    >
                      an individual or collaborative enterprise that is
                      carefully planned and designed to achieve a particular
                      aim.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item sm={6}>
                  <Typography
                    className={classes.descriptionAnimation}
                    variant='subtitle1'
                    color='primary'
                  >
                    Project your project with real time collaboration and
                    communication.
                  </Typography>
                  <GoogleAuth type='landing' />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>

        <div className={classes.subWrapper2}>
          <Container maxWidth='lg'>
            <Grid
              className={classes.container}
              item
              container
              alignItems='center'
              justify={'center'}
              spacing={3}
              xs={12}
              md={10}
            >
              <Grid item xs={12} md={6}>
                <Typography variant='h6'>
                  Modern Problems Require Modern Solutions
                </Typography>
                <Typography variant='caption'>
                  As the world shifts to remote workspaces, convenience and
                  responsiveness are key. With Projectify, communicating with
                  co-workers and collaborating on projects is now centralized in
                  one application.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  height='100%'
                  width='100%'
                  src={remotePicture}
                  alt='Working Remotely'
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

const wrapped = connect(mapStateToProps)(LandingPage);
export default withStyles(styles)(wrapped);
