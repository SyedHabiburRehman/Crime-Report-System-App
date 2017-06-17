import ReportActions from '../../store/actions/reportActions';
import * as firebase from 'firebase';


export default class ReportMiddleware {
    // Reporting File starts
    static fileReport(reportFile) {
        return (dispatch) => {
            dispatch(ReportActions.fileReport());
            ReportMiddleware.addReportToFirebase(dispatch, reportFile);
        }
    }
    static addReportToFirebase(dispatch, reportFile,reportCounts) {
        var pushkey = firebase.database().ref('/')
            .child(`reports/${reportFile.city}`)
            .push().key;
        console.log(pushkey);

        firebase.database().ref('/')
            .child(`reports/${reportFile.city}/${pushkey}`)
            .set(reportFile)
            .then(() => {
                firebase.database().ref('/')
                    .child(`userReports/${reportFile.userId}/${pushkey}`)
                    .set(reportFile)
                    .then(() => {
                        dispatch(ReportActions.fileReportSuccessful());
                        ReportMiddleware.updatingReportCounts(dispatch,reportFile,reportCounts);
                    })
                console.log("report updated");
            })
            .catch((error) => {
                dispatch(ReportActions.fileReportRejected(error));
            });
    }
    //Reporting File Ends

    // Update Count Starts
    static updatingReportCounts(dispatch,reportFile,reportCounts){
        console.log("report counts" , reportCounts)
        var cityCount = {
            complaints:0,
            crimes:0,
            missingPersons:0
        };
        var totalCount = {
            complaints:0,
            crimes:0,
            missingPersons:0
        };
        if(reportCounts && reportCounts[reportFile.city]){
            console.log("====================");
            cityCount = {...reportCounts[reportFile.city]}
        }
        if(reportCounts && reportCounts.totalCount){
            console.log("--------------------");
        console.log("report conunts" , reportCounts.totalCounts)
            totalCount = {...reportCounts.totalCounts}
        }
        
        if(reportFile.reportType==="Complaint"){
            totalCount["complaints"] = ++totalCount["complaints"]
            cityCount["complaints"] = ++cityCount["complaints"]
        }
        if(reportFile.reportType==="Crime"){
            totalCount["crimes"] = ++totalCount["crimes"]
            cityCount["crimes"] = ++cityCount["crimes"]
        }
        if(reportFile.reportType==="Missing Person"){
            totalCount["missingPersons"] = ++totalCount["missingPersons"]
            cityCount["missingPersons"] = ++cityCount["missingPersons"]
        }

        var reportTotalCountRef = firebase.database().ref('/')
            .child(`reportCounts/totalCounts/`);
        var reportCityCountRef = firebase.database().ref('/')
            .child(`reportCounts/${reportFile.city}`);

        reportTotalCountRef.set(totalCount);
        reportCityCountRef.set(cityCount);
    }
// Updating Count Ends

// Get Report List Starts
    static getReportList(cityName){
        return(dispatch)=>{
            dispatch(ReportActions.getReportList());
            ReportMiddleware.getReportListFromFirebase(dispatch, cityName);
        }
    }
    static getReportListFromFirebase(dispatch, cityName){
        firebase.database().ref('/')
            .child(`reports/${cityName}`)
            .on("child_added",function(snapshot){        // "child_added" is used because it goes to given node's all children
                var report = snapshot.val();  
                console.log(report);           // direct but one by one; means it fetch first children then    
                report.key = snapshot.key;               // we save it in array then it again goes next children until 
                                                        //  reached to the last children of given node 
                console.log("report", report);
                dispatch(ReportActions.getReportListSuccessful(report));
            })
    }
// Get Report List Ends

// Get My Reports Starts
    static getMyReports(uid){
        console.log(uid)
        return(dispatch)=>{
            dispatch(ReportActions.getMyReports());
            ReportMiddleware.getMyReportsFromFirebase(dispatch,uid)
        }
    }
    static getMyReportsFromFirebase(dispatch,uid){
        firebase.database().ref('/').child(`userReports/${uid}`)
            .on("child_added",(snapshot)=>{
                console.log(snapshot.val());
                var data = snapshot.val();
                data.key=snapshot.key;
                dispatch(ReportActions.getMyReportsSuccessful(data));
                // var Array = []
                // for(var props in snapshot.val()){
                //     Array.push(snapshot.val()[props])
                // }
                // console.log(Array);
            })
    }
// Get My Reports Ends

// Get Report Detail Starts
static getReportDetail(city,id){
    console.log("city" , city + "id", id);
    return(dispatch)=>{
        dispatch(ReportActions.getReportDetail())
        ReportMiddleware.getReportDetailFromFirebase(dispatch,city,id);
    }
}
static getReportDetailFromFirebase(dispatch,city,id){
    {
        firebase.database().ref('/').child(`reports/${city}/${id}`)
            .on("value",(snapshot)=>{
                var data = snapshot.val();
                console.log("data", data)
                dispatch(ReportActions.getReportDetailSuccessful(data));
            })
    }
}
// Get Report Detail Ends

// get List Of Cities Starts
    static getListOfCities() {
        return (dispatch) => {
            dispatch(ReportActions.getListOfCities());
            ReportMiddleware.getListOfCitiesFromFirebase(dispatch);
        };
    }
    static getListOfCitiesFromFirebase(dispatch) {
        firebase.database().ref('/')
            .child(`cities`)
            .on('value', function (snapshot) {
                console.log("snapshot", snapshot.val());
                var data = Object.keys(snapshot.val());
                // console.log("key",Object.keys(snapshot.val()));

                // var Array = []
                // for(var props in data){
                //     console.log("props", props)
                //     Array.push(data[props])
                // }
                // console.log(Array)
                dispatch(ReportActions.getListOFCitiesSuccessful(data));
            });

    }
    // Get List Of Cities Ends
}