import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportMiddleware from '../../store/middlewares/reportMiddleware';
import * as MUI from 'material-ui';

const mapStateToProps=(state)=>{
    console.log(state.ReportReducer.myReportList);
    return{
        authUser: state.AuthReducer.authUser,
        myReportList: state.ReportReducer.myReportList
    }
}
const mapDisptachToProps=(dispatch)=>{
    console.log("==========")
    return{
        getMyReports: (uid)=> {dispatch(ReportMiddleware.getMyReports(uid))}
    }
}
class MyReports extends Component{
        componentWillMount(){
        console.log("--------------------")
        this.props.getMyReports(this.props.authUser.uid)
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(MyReports);