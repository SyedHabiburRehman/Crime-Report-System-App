import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ReportMiddleware from '../../store/middlewares/reportMiddleware';
import CrimeReport from '../../crimeReport/crimeReport';
import * as MUI from 'material-ui';

const mapStateToProps = (state) => {
    console.log("state.ReportReducer.reportCount", state.ReportReducer.reportCount);
    return {
        uid: state.AuthReducer.authUser.uid,
        reportList: state.ReportReducer.reportList,
        cityList: state.ReportReducer.cityList,
        myReportList: state.ReportReducer.myReportList,
        reportCount: state.ReportReducer.reportCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReportList: (cityName) => {
            dispatch(ReportMiddleware.getReportList(cityName));
        },
        //     getMyReports: (uid)=> {dispatch(ReportMiddleware.getMyReports(uid))}
    }
}

class Dashboard extends Component {
    constructor(props) {
        super();
        this.state = {
            city: "",
        }
    }
    handleCityChange(event, index, value) {
        this.setState({
            city: value
        })
        this.props.getReportList(value);
    }
    renderFilterCity() {
        var cityFilter = (
            <div>
                <span style={{ paddingRight: 20 }}>Select City To Filter Reports</span>

                <MUI.SelectField
                    ref="city"
                    floatingLabelText="City"
                    value={this.state.city}
                    onChange={this.handleCityChange.bind(this)}
                    autoWidth={true}

                >
                    {
                        this.props.cityList.map(city => {
                            return <MUI.MenuItem key={city} value={city} primaryText={city} />
                        })
                    }
                </MUI.SelectField>
            </div>
        );
        return cityFilter;
    }

    //when my reports button click first it will get data from firebase then change the router path
    // showMyReports() {
    //     this.props.getMyReports(this.props.uid);
    //     browserHistory.push("/myReports");
    // }
    // goDashboard() {
    //     browserHistory.push('/fileReport')
    // }

    render() {
        return (
            <div>
                {/*<MUI.RaisedButton label="file Report" onTouchTap={this.goDashboard.bind(this)} />
                <MUI.RaisedButton label="My Report" onTouchTap={this.showMyReports.bind(this)} />*/}

                {this.props.location.pathname !== "/myReports" ? this.renderFilterCity() : null}

                <CrimeReport {...this.props} city={this.state.city} />
                {console.log(this.props.reportCount.Complaint)}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);