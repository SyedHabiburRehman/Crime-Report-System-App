import ReportActions from '../../store/actions/reportActions';
import * as firebase from 'firebase';


export default class ReportMiddleware{
    static fileReport(reportFile){
        return (dispatch)=>{
            dispatch(ReportActions.fileReport());
            ReportMiddleware.addReportToFirebase(dispatch,reportFile);
        }
    }
    static addReportToFirebase(dispatch,reportFile){
        firebase.database().ref('/')
        .child(`reports/${reportFile.city}`)
        .set(reportFile)
        .then(()=>{
            console.log("report updated");
        })
        .catch((error)=>{
            dispatch(ReportActions.fileReportRejected(error));
        });
        dispatch(ReportActions.fileReportSuccessful());
    }
    static getListOfCities(){
        return (dispatch)=>{
            dispatch(ReportActions.getListOfCities());
            ReportMiddleware.getListOfCitiesFromFirebase(dispatch);
        };
    }
    static getListOfCitiesFromFirebase(dispatch){
            firebase.database().ref('/')
                .child(`cities`)
                .on('value', function(snapshot){
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
}