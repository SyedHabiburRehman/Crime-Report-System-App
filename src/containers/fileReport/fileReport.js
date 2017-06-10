import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReportMiddleware from '../.././store/middlewares/reportMiddleware';
import * as MUI from 'material-ui'
import "../.././App.css"

const mapStateToProps = (state) => {
    console.log(state);
    return {
        // authUser: state.AuthReducer.authUser,
        cityList: state.ReportReducer.cityList,
        isReportSubmitted: state.ReportReducer.isReportSubmitted
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        reportFile: (reportFile)=>{
            dispatch(ReportMiddleware.fileReport(reportFile))
        }
    }
}
class FileReport extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            reportType: "",
            city: "",
            fullName: "",
            address: "",
            age: "",
            identification: "",
            picture: "",
            title: "",
            description: "",
            dateSinceMissing: new Date(),
        };
        this.handleSave = this.handleSave.bind(this);
         this.handleChangeInput = this.handleChangeInput.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.isReportSubmitted){
            alert("Report Submitted");
        }
    }

    handleReportChange(event, index, value) {
        this.setState({ reportType: value });
        console.log(value)
    }

    handleCityChange(event, index, value) {
        this.setState({ city: value });
    }
    handleChangeInput(event,index,value){
        this.setState({[event.target.name]: event.target.value});
    }
    handleChangeInDate(event,newDate){
        this.setState({dateSinceMissing:newDate});
    }
    handleSave() {
        let userReportInfo = {
            reportType: this.state.reportType,
            city: this.state.city,
            // userId : this.props.authUser.uid
        };
        if(this.state.reportType==="Complaint" || this.state.reportType === "Crime"){
            userReportInfo.title = this.state.title,
            userReportInfo.description = this.state.description
        }
        if(this.state.reportType==="Crime"){
            userReportInfo.picture = this.state.picture
        }
        if(this.state.reportType==="Missing Person"){
            userReportInfo.fullName = this.state.fullName,
            userReportInfo.address = this.state.address,
            userReportInfo.age = this.state.age,
            userReportInfo.identification = this.state.identification,
            userReportInfo.dateSinceMissing = this.state.dateSinceMissing.getTime();
        }
        this.props.reportFile(userReportInfo);
    }

    renderMissingPersonsFields(){
        const fields = (
            <div>
                <MUI.TextField
                        ref="fullName"
                        name="fullName"
                        floatingLabelText="Full Name"
                        hintText="Full Name"
                        value={this.state.fullName}
                        onChange={this.handleChangeInput}                        
                        fullWidth={true}
                    />
                    <MUI.TextField
                        ref="address"
                        name="address"
                        floatingLabelText="Address"
                        hintText="Address"
                        value={this.state.address}
                        onChange={this.handleChangeInput}                        
                        fullWidth={true}
                    />
                    <MUI.TextField
                        ref="age"
                        name="age"
                        floatingLabelText="Age"
                        hintText="Age"
                        value={this.state.age}
                        onChange={this.handleChangeInput}                        
                        fullWidth={true}
                        type="number"
                    />
                    <MUI.TextField
                        ref="identification"
                        name="identification"
                        floatingLabelText="Identification"
                        hintText="Identification"
                        value={this.state.identification}
                        onChange={this.handleChangeInput}                        
                        fullWidth={true}
                    />
                    <MUI.DatePicker
                        ref="dateSinceMissing"
                        name="dateSinceMissing"
                        hintText="Date Since Missing"
                        floatingLabelText="Date Since Missing"
                        value={this.state.dateSinceMissing}
                        onChange={this.handleChangeInDate.bind(this)}
                        fullWidth={true}
                    />
                    {this.renderPictureField()}
            </div>
        );
        return fields;
    }
    renderPictureField(){
        return(
            <MUI.TextField
                        ref="picture"
                        name="picture"
                        floatingLabelText="Picture"
                        hintText="Picture"
                        value={this.state.picture}
                        onChange={this.handleChangeInput}                        
                        fullWidth={true}
                        required={true}
                    />
        );
    }

    renderReportTypeSpecifiedFields(reportType){
        if(reportType !== "Missing Person"){
            const fields = (
                <div>
                    <MUI.TextField
                        ref="title"
                        name="title"
                        floatingLabelText="Title"
                        hintText="Title"
                        value={this.state.title}
                        onChange={this.handleChangeInput}                        
                        fullWidth={true}
                        required={true}
                    />
                    <MUI.TextField
                        ref="description"
                        name="description"
                        floatingLabelText="Description"
                        hintText="Description"
                        value={this.state.description}
                        onChange={this.handleChangeInput}                        
                        fullWidth={true}
                        required={true}
                    />
                    {reportType==="Crime"?this.renderPictureField():null}
                </div>
            );
            return fields;
        }
        else {
            return this.renderMissingPersonsFields();
        }
    }
    render() {
        return (
            <div className="App">
                <MUI.Paper>
                    <h3>File A Report</h3>
                    <MUI.SelectField
                        ref="reportType"
                        floatingLabelText="ReportType"
                        value={this.state.reportType}
                        fullWidth={true}
                        autoWidth={true}
                        onChange={this.handleReportChange.bind(this)}
                    >
                        <MUI.MenuItem key="complaint" value="Complaint" primaryText="Complaint" />
                        <MUI.MenuItem key="crime" value="Crime" primaryText="Crime" />
                        <MUI.MenuItem key="missing person" value="Missing Person" primaryText="Missing Person" />
                    </MUI.SelectField>
                    <MUI.SelectField
                        ref="city"
                        floatingLabelText="City"
                        value={this.state.city}
                        fullWidth={true}
                        autoWidth={true}
                        onChange={this.handleCityChange.bind(this)}>
                        {

                            this.props.cityList.map(city => {
                                return <MUI.MenuItem key={city} value={city} primaryText={city} />
                            })
                        }
                    </MUI.SelectField>
                    
                    {this.renderReportTypeSpecifiedFields(this.state.reportType)}

                    <Link to="/"><MUI.RaisedButton label="Cancel" /></Link>
                    <MUI.RaisedButton label="Save" onTouchTap={this.handleSave} primary={true} />

                </MUI.Paper>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileReport)