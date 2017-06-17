import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import  FirebaseAuthService  from '../../store/middlewares/authMiddleware';

//this mapStateToProps call componentWillReceiveProps and 

const mapStateToProps = (state)=>{
  console.log("'state' form login compo", state.AuthReducer);
  return{
    //   user: state.authUser,
      isLoggedin : state.AuthReducer.isLoggedin,
    //   isRegistered : state.isRegistered
  }
  //whatever values this object possess this object will be passed to componentWillReceiveProps   and
  // where it is receive by nextProps argument with some more values
}


const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userAuth) => {
            dispatch(FirebaseAuthService.loginOnFirebase(userAuth))
        }
    }
}

class Login extends Component{
    constructor() {
    super();
    this.login = this.login.bind(this)
};

componentWillReceiveProps(nextProps){
    console.log("'next prop' from login compo" ,  nextProps);
  if(nextProps.isLoggedin){
      alert("Log In");
    browserHistory.push('/dashboard');
  }
}

    login(){
        let userInfo={
          email:this.refs.email.getValue(),
          password : this.refs.password.getValue()
        }
//          this.context.router.push({
//             pathname: '/home'
// })
this.props.loginUser(userInfo);
    }
    render(){
        console.log("'user' from login compo",this.props.user)
       
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
            <div className="App2">
            <Paper>
            <div>
            <h1>Login</h1>
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
            /><br /> <br />
            </div>

            <div className="button">
        <RaisedButton label="Login" primary={true} onClick={this.login}/> 
         </div>
         </Paper>
         </div>
    </div>
       )
}
}
// Login.contextTypes = {
//     router: React.PropTypes.object
//  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);