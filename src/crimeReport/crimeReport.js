import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as MUI from 'material-ui';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Face from 'material-ui/svg-icons/action/face';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';


class CrimeReport extends Component {
    constructor() {
        super();
        this.handleshowDetail = this.handleshowDetail.bind(this);
    }

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
                            console.log("=================", report)
                            console.log("=================", report.key)
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

    render() {

        console.log(this.props.location.pathname)
        const reportList = this.props.location.pathname === "/dashboard" ? this.props.reportList : this.props.myReportList;
        console.log(reportList)
        return (
            <div>

                <MUI.Tabs>
                    <MUI.Tab icon={<Fingerprint />} label="Crime">
                        {
                            (() => {
                                {/*function filterfunction(value) {
                                    return (value.reportType === "Crime");
                                }*/}
                                var filterList = reportList.filter(report => {
                                    return report.reportType === "Crime";
                                });
                                {/*console.log(report.reportType)}*/ }
                                console.log(filterList)
                                return filterList.length > 0 ? this.renderList(filterList, <Fingerprint />) : <div>No report</div>
                            })()
                        }
                    </MUI.Tab>
                    <MUI.Tab icon={<Face />} label="Missing Person">
                        {
                            (() => {
                                {/*function filterfunction(value) {
                                    return (value.reportType === "Complaint");
                                }*/}
                                var filterList = reportList.filter(report => {
                                    return report.reportType === "Missing Person";
                                });
                                {/*console.log(report.reportType)}*/ }
                                console.log(filterList)
                                return filterList.length > 0 ? this.renderList(filterList, <Face />) : <div>No report</div>
                            })()
                        }
                    </MUI.Tab>
                    <MUI.Tab icon={<RecordVoiceOver />} label="Complaints">
                        {
                            (() => {
                                {/*function filterfunction(value) {
                                    return (value.reportType === "Complaint");
                                }*/}
                                var filterList = reportList.filter(report => {
                                    return report.reportType === "Complaint";
                                });
                                {/*console.log(report.reportType)}*/ }
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