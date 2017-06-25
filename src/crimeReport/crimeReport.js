import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as MUI from 'material-ui';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Face from 'material-ui/svg-icons/action/face';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';


class CrimeReport extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     total:0,
        //     crimes: 0,
        //     complaints: 0,
        //     missingPersons: 0
        // }
        this.handleshowDetail = this.handleshowDetail.bind(this);

    }
    // componentWillMount() {
    //     setTimeout(() => {
    //         console.log(this.props.allReports);
    //         this.cityRender(this.props.allReports, "cityRender");
    //     }, 2000)

    // }

    handleshowDetail = (city, key) => {
        console.log(city, key)
        browserHistory.push({ pathname: "/reportItem/" + key, state: { city: city } });
    }
    renderList(filterList, iconComponent) {
        console.log(filterList)
        return (
            <div>
                <MUI.List>
                    {
                        filterList.map(report => {
                            return (
                                <div key={report.key}>
                                    <MUI.ListItem
                                        leftAvatar={<MUI.Avatar icon={iconComponent} />}
                                        rightIcon={<ActionInfo />}
                                        primaryText={(report.reportType === "Crime" || report.reportType === "Complaint") ? "TITLE: " + report.title : "FULL NAME: " + report.fullName}
                                        secondaryText={(report.reportType === "Crime" || report.reportType === "Complaint") ? "DESCRIPTION: " + report.description : "IDENTIFCATION: " + report.identification}
                                        onTouchTap={() => this.handleshowDetail(report.city, report.key)}
                                    />
                                </div>
                            )
                        })
                    }
                </MUI.List>


            </div>
        )

    }
    cityRender(reportList) {
        var total = 0;
        var missingPersons = 0;
        var crimes = 0;
        var complaints = 0;
        reportList.forEach((report) => {
            if (report.reportType === "Complaint") {
                // console.log(Object.keys(report.val()).length)
                complaints = complaints + 1;

            }
            if (report.reportType === "Crime") {
                // console.log(Object.keys(report.val()).length)
                crimes = crimes + 1;

            }
            if (report.reportType === "Missing Person") {
                // console.log(Object.keys(report.val()).length)
                missingPersons = missingPersons + 1;

            }
        });

        total = missingPersons + crimes + complaints;

        return (
            this.renders(total, missingPersons, crimes, complaints)
        )
    };
    renders(total, missingPersons, crimes, complaints) {
        return (
            <div>
                <div><p>Total: {total}</p></div>
                <div><p>Crimes: {crimes}</p></div>
                <div><p>Complaints: {complaints}</p></div>
                <div><p>Missing Persons: {missingPersons}</p></div>
            </div>
        )

    }
    // renderCount(city) {
    //     const { reportCount } = this.props;
    //     const d = reportCount[city]
    //     console.log(reportCount[city].Crime)
    //     console.log(reportCount["Crime"])


    //     var totalCounts = {
    //         total: 0,
    //         complaints: 0,
    //         crimes: 0,
    //         missingPersons: 0
    //     }
    //     if (reportCount && reportCount[city]) {
    //         console.log(reportCount && reportCount[city])
    //     }
    //     else {
    //         console.log("false")
    //     }
    //     totalCounts.crimes = reportCount && reportCount[city] ? reportCount[city].Crime : 0;
    //     totalCounts.missingPersons = reportCount && reportCount[city] ? reportCount[city].MissingPerson : 0;
    //     totalCounts.complaints = reportCount && reportCount[city] ? reportCount[city].Complaint : 0;
    //     totalCounts.total = totalCounts.crimes
    //         + totalCounts.missingPersons
    //         + (this.props.isLoggedin ? totalCounts.complaints : 0)
    //     console.log(totalCounts.complaints)
    //     return (

    //         <div>
    //             <p>{totalCounts.complaints}</p>
    //         </div>
    //     )
    // }

    render() {

        console.log(this.props, "----------------")
        // console.log(this.props.city)
        // console.log(this.props.location.pathname)
        const reportList = this.props.location.pathname === "/dashboard" ? this.props.reportList : this.props.myReportList;
        console.log(reportList)
        return (
            <div>
                {this.props.city ? (alert(this.props.city), this.cityRender(this.props.reportList)) : this.cityRender(this.props.allReports)}
                {/*{this.cityRender(this.props.reportList)}*/}
                {/*{this.renderCount(this.props.city)}*/}
                <MUI.Tabs>
                    <MUI.Tab icon={<Fingerprint />} label="Crime">
                        {
                            (() => {
                                /*function filterfunction(value) {
                                    return (value.reportType === "Crime");
                                }*/
                                var filterList = reportList.filter(report => {
                                    return report.reportType === "Crime";
                                });
                                /*console.log(report.reportType)}*/
                                console.log(filterList)
                                return filterList.length > 0 ? this.renderList(filterList, <Fingerprint />) : <div>No report</div>
                            })()
                        }
                    </MUI.Tab>
                    <MUI.Tab icon={<Face />} label="Missing Person">
                        {
                            (() => {
                                /*function filterfunction(value) {
                                    return (value.reportType === "Complaint");
                                }*/
                                var filterList = reportList.filter(report => {
                                    return report.reportType === "Missing Person";
                                });
                                /*console.log(report.reportType)}*/
                                console.log(filterList)
                                return filterList.length > 0 ? this.renderList(filterList, <Face />) : <div>No report</div>
                            })()
                        }
                    </MUI.Tab>
                    <MUI.Tab icon={<RecordVoiceOver />} label="Complaints">
                        {
                            (() => {
                                /*function filterfunction(value) {
                                    return (value.reportType === "Complaint");
                                }*/
                                var filterList = reportList.filter(report => {
                                    return report.reportType === "Complaint";
                                });
                                /*console.log(report.reportType)}*/
                                console.log(filterList)
                                return filterList.length > 0 ? this.renderList(filterList, <RecordVoiceOver />) : <div>No report</div>
                            })()
                        }
                    </MUI.Tab>

                </MUI.Tabs>
            </div>
        )
    }
}
export default (CrimeReport);