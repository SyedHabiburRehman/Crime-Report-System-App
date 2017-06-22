import React, { Component } from 'react';
import * as MUI from 'material-ui'
// import styles from './ReportDetailStyles';
import Person from 'material-ui/svg-icons/social/person';
import ReportMiddelware from '../../store/middlewares/reportMiddleware'
import { connect } from 'react-redux';

const mapStateToProps=(state)=>{
    console.log("state.reportDetail" , state.ReportReducer.reportDetail)
    return{
        isLoggedin: state.AuthReducer.isLoggedin,
        authUser: state.AuthReducer.authUser,
        reportDetail: state.ReportReducer.reportDetail
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getReportDetail: (city,id)=>{
            console.log(city,id);
            dispatch(ReportMiddelware.getReportDetail(city,id));
        },
        statusUpdate: (status,reportDetail)=>{
            dispatch(ReportMiddelware.statusUpdate(status,reportDetail));
        }
    }
}

class ReportDetail extends Component{
    renderSpecificDetails(reportType){
        if(reportType!=="Missing Person"){
            const details = (
                <div>
                    <p>Title: {this.props.reportDetail.title}</p>
                    <p>Description: {this.props.reportDetail.description}</p>
                </div>
            );
            return details;
        }
        else {
            return (
                <div>
                    <p>Identification: {this.props.reportDetail.identification}</p>
                    <p>Contact No.: {this.props.reportDetail.contact}</p>
                    <p>Age: {this.props.reportDetail.age}</p>
                    <p>Date Since Missing: {this.props.reportDetail.dateSinceMissing}</p>
                    <p>Address: {this.props.reportDetail.address}</p>
                </div>
            );
        }
    }
    handleStatusUpdate(){
        var status = this.refs.status.getValue();
        console.log("status", status);
        this.props.statusUpdate(status,this.props.reportDetail);
    }
    renderAdminStatusFields(){
        console.log("working")
        return(
            <div>
                <MUI.TextField 
                    floatingLabelText="Status"
                    name="status"
                    ref="status"
                    required={true}
                    />
                    <MUI.RaisedButton
                        label="Update Status"
                        primary={true}
                        onTouchTap={this.handleStatusUpdate.bind(this)}
                    />

            </div>
        )
    }
    renderStatus(reportDetail){
    //    console.log(reportDetail.statusList)
    //     var statusArray = [];
    //     if(reportDetail.statusList){
    //      statusArray = Object.keys(reportDetail.statusList);
    //     }
    //     console.log("Status Array ",statusArray)
        
    //     statusArray.map(key=>{console.log(key);
    //         console.log(reportDetail.statusList[key].statusMessage)
    //           return(
    //         <MUI.Card key={key}>
    //             <MUI.CardText >
    //                {reportDetail.statusList[key].statusMessage}
    //              </MUI.CardText>
    //            </MUI.Card>
    //     )})
        var statusListKeys=[]
    if(reportDetail.statusList){
      statusListKeys = Object.keys(reportDetail.statusList);
    }
    console.log("Status Array ",statusListKeys)
    return (
      <div>
        <div style={{margin:20}}>
          Status Updates From Admin
        </div>
        {
            statusListKeys.map(key=>{
              return (
              <MUI.Card key={key}>
                <MUI.CardText >
                  {reportDetail.statusList[key].statusMessage}
                </MUI.CardText>
              </MUI.Card>);
            })
        }
      </div>
    );
    }
    componentWillMount(){
    console.log("-----------------")
        this.props.getReportDetail(this.props.location.state.city,this.props.params.id);
    }
    render(){
        return(
            <div>
                {console.log(this.props.reportDetail.key)}
                <MUI.Card>
                    <MUI.CardHeader title={this.props.reportDetail.reportType==="Missing Person"?this.props.reportDetail.fullName:this.props.reportDetail.title}
                                    subtitle={this.props.reportDetail.city}  
                                    avatar={<MUI.Avatar icon={<Person/>}/>}    />
                    <MUI.CardText>
                        {this.renderSpecificDetails(this.props.reportDetail.reportType)}
                    </MUI.CardText>
                </MUI.Card>
                {this.renderStatus(this.props.reportDetail)}
                {(this.props.authUser.isAdmin && this.props.isLoggedin)?this.renderAdminStatusFields():null}
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReportDetail);