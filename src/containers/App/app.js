import React, { Component } from 'react';
import ReportMiddleware from '../.././store/middlewares/reportMiddleware';
import FirebaseAuthService from '../.././store/middlewares/authMiddleware';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as MUI from 'material-ui';
import { orange500, blueGrey600 } from 'material-ui/styles/colors';
// import Login from '.././login/login';
// import './App.css';

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.AuthReducer.isLoggedin,
    authUser: state.AuthReducer.authUser,
    // cityList: state.ReportReducer.cityList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListOfcities: () => {
      dispatch(ReportMiddleware.getListOfCities());
    },
    logout: () => {
      dispatch(FirebaseAuthService.logoutFromFirebase());
    },
    getReportCount: () => {
      dispatch(ReportMiddleware.getReportCount());
    }
  }
}

class App extends Component {
  constructor(props) {
    super();
    this.state = { open: false };

  }
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  logoutUser = () => {
    this.props.logout();
    browserHistory.push('/login');
  }
  actionButtons() {
    return (
      <div> <MUI.FlatButton label="Sign Up" secondary={true} onTouchTap={() => browserHistory.push('/signup')} />
        <MUI.FlatButton label="Login" onTouchTap={() => browserHistory.push('/login')} /></div>
    )
  }
  componentWillMount() {
    this.props.getListOfcities();
    this.props.getReportCount();
  }
  render() {
    const styles = {
      title: {
        cursor: 'pointer',
      },
      color: {
        color: orange500,
      },
      appbar: {
        backgroundColor: blueGrey600
      }
    };
    return (
      <div className="App">
        <div>
          <MUI.AppBar
            style={styles.appbar}

            titleStyle={styles.color}
            title={<span style={styles.title}>Crime App System</span>}
            label="Open Drawer"
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={this.props.isLoggedin ? <MUI.FlatButton label="Log Out" onTouchTap={this.logoutUser} /> : this.actionButtons()}
            /*onRightIconButtonTouchTap={()=>browserHistory.push('/login')}*/
            showMenuIconButton={this.props.isLoggedin ? true : false}
          />

          <MUI.Drawer open={this.state.open}
            docked={false}
            width={200}
            onRequestChange={(open) => this.setState({ open })}
          >
            {!this.props.authUser.isAdmin ?
              <div>
                <Link to="/dashboard"><MUI.MenuItem onTouchTap={this.handleClose}> <MUI.FlatButton label="Dashboard" /></MUI.MenuItem></Link>
                <Link to="/myReports"><MUI.MenuItem onTouchTap={this.handleClose}> <MUI.FlatButton label="My Reports" /></MUI.MenuItem></Link>
                <Link to="/fileReport"><MUI.MenuItem onTouchTap={this.handleClose}> <MUI.FlatButton label="File A Report" /></MUI.MenuItem></Link>
              </div>
              :
              <Link to="/dashboard"><MUI.MenuItem onTouchTap={this.handleClose}> <MUI.FlatButton label="Dashboard" /></MUI.MenuItem></Link>
            }


          </MUI.Drawer>
        </div>
        {/*{this.props.cityList}*/}
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);