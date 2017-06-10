import React, { Component } from 'react';
import ReportMiddleware from '../.././store/middlewares/reportMiddleware';
import { connect } from 'react-redux';
// import Login from '.././login/login';
// import './App.css';

const mapStateToProps = (state)=>{
  return{
    // cityList: state.ReportReducer.cityList
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    getListOfcities: ()=>{
      dispatch(ReportMiddleware.getListOfCities());
    }
  }
}

class App extends Component {
  constructor(props){
    super();
  }
  componentWillMount(){
    this.props.getListOfcities();
  }
  render() {
    return (
      <div className="App">
        {/*{this.props.cityList}*/}
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);