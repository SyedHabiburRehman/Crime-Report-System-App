import React, { Component } from 'react';
import * as MUI from 'material-ui'
// import styles from './ReportDetailStyles';
import Person from 'material-ui/svg-icons/social/person';
import ReportMiddelware from '../../store/middlewares/reportMiddleware'
import { connect } from 'react-redux';

const mapStateToProps=(state)=>{
    console.log("state.reportDetail" , state.ReportReducer.reportDetail)
    return{
        reportDetail: state.ReportReducer.reportDetail
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getReportDetail: (city,id)=>{
            console.log(city,id);
            dispatch(ReportMiddelware.getReportDetail(city,id));
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

    componentWillMount(){
    console.log("-----------------")
        this.props.getReportDetail(this.props.location.state.city,this.props.params.id);
    }
    render(){
        return(
            <div>
                {console.log(this.props.reportDetail.reportType)}
                <MUI.Card>
                    <MUI.CardHeader title={this.props.reportDetail.reportType==="Missing Person"?this.props.reportDetail.fullName:this.props.reportDetail.title}
                                    subtitle={this.props.reportDetail.city}  
                                    avatar={<MUI.Avatar icon={<Person/>}/>}    />
                    <MUI.CardText>
                        {this.renderSpecificDetails(this.props.reportDetail.reportType)}
                    </MUI.CardText>
                </MUI.Card>
                {/*<p>{this.props.reportDetail.title}</p>
                <p></p>
                <p></p>
                <p></p>*/}
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReportDetail);