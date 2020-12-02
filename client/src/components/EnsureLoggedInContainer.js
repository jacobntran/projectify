import React from "react"
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setRedirectUrl } from "../actions";
import LandingPage from "./LandingPage";
import { Route } from "react-router-dom";

class EnsureLoggedInContainer extends React.Component {
    
    componentDidMount() {
      const { history, currentURL } = this.props
      
      if (!this.props.isSignedIn) {
        // console.log("EnsureLoggedInContainer component called : " + currentURL);
        console.log(`EnsureLoggedInContainer component when signed in state is ${this.props.isSignedIn} called : ` + currentURL);
        console.log(currentURL)
        this.props.setRedirectUrl(currentURL);
        // if(history) history.push('/');
      }
    }
  
    render() {
     console.log("EnsureLoggedInContainer render called: " + this.props.isSignedIn);
      if (this.props.isSignedIn) {
        return this.props.children
      } else {
        return null
      }
    }
  }
  
  function mapStateToProps(state, ownProps) {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentURL: ownProps.location.pathname
      // currentURL: ownProps
    }
  }
  
  export default  withRouter(connect(mapStateToProps, {setRedirectUrl})(EnsureLoggedInContainer))