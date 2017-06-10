import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FirebaseAuthService from '../../store/middlewares/authMiddleware';
// import "../../src/App.css";
const mapStateToProps = (state) => {
  console.log('state from sign up' ,state)
  return{
      isRegistered: state.AuthReducer.isRegistered
  }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        signUpUser: (userAuth)=> {
                dispatch(FirebaseAuthService.registerUserOnFirebase(userAuth))
}         
    }
}

class SignUp extends Component{
    constructor(props){
        super();
        this.signup = this.signup.bind(this);
    }
    signup(){
        // e.preventDefault();
        // console.log("-------------------------------------------")
        let user = {
            email: this.refs.email.getValue(),
            password : this.refs.password.getValue(),
            firstName : this.refs.firstname.getValue(),
            lastName : this.refs.lastname.getValue(),
        }
        this.props.signUpUser(user);
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps" , nextProps);
        if(nextProps.isRegistered){
            alert("sign up");
            browserHistory.push("/login");
        }
    }
    render(){
        const styles = {
        underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

        return(
            <div >
          <div className="App">
          <Paper>
          <div>
            <div>
                <h1>Sign Up</h1>
    <TextField
      floatingLabelText="First Name"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      ref="firstname"
    /><br />
    <TextField
      floatingLabelText="Last Name"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      ref="lastname"
    /><br />
    <TextField
      floatingLabelText="Email"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      ref="email"
      
    /><br />
    <TextField
      floatingLabelText="Password"
      type="password"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      ref="password"
    /><br />
    
  </div>
  <div className="button">
    <RaisedButton label="Sign Up" onClick={this.signup} primary={true}  color={styles.RaisedButton} /> <br/> <br/> <br/> 
    <Link to="/login"><RaisedButton label="Login" primary={true}/> </Link>
  
  </div>
  </div>
  </Paper>
  </div>
    </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);