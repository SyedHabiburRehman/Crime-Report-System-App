export default class ReportActions{
    static FILE_REPORT = "FILE_REPORT";
    static FILE_REPORT_SUCCESSFUL = "FILE_REPORT_SUCCESSFUL";
    static FILE_REPORT_REJECTED = "FILE_REPORT_REJECTED";

    static GET_REPORT_LIST = "GET_REPORT_LIST";
    static GET_REPORT_LIST_SUCCESSFUL = "GET_REPORT_LIST_SUCCESSFUL";
    static GET_REPORT_LIST_REJECTED = "GET_REPORT_LIST_REJECTED;"

    static GET_REPORT_DETAIL = "GET_REPORT_DETAIL";
    static GET_REPORT_DETAIL_SUCCESSFUL = "GET_REPORT_DETAIL_SUCCESSFUL";
    static GET_REPORT_DETAIL_REJECTED = "GET_REPORT_DETAIL_REJECTED";

    static GET_MY_REPORTS = "GET_MY_REPORTS";
    static GET_MY_REPORTS_SUCCESSFUL = "GET_MY_REPORTS_SUCCESSFUL";
    static GET_MY_REPORTS_REJECTED = "GET_MY_REPORTS_REJECTED";


    static GET_LIST_OF_CITIES = "GET_LIST_OF_CITIES";
    static GET_LIST_OF_CITIES_SUCCESSFUL = "GET_LIST_OF_CITIES_SUCCESSFUL";
    static GET_LIST_OF_CITIES_REJECTED = "GET_LIST_OF_CITIES_REJECTED";

    static fileReport(){
        return{
            type:ReportActions.FILE_REPORT,
        }
    }
    static fileReportSuccessful(){
        return{
            type: ReportActions.FILE_REPORT_SUCCESSFUL,
        }
    }
    static fileReportRejected(errorMessage){
        return{
            type: ReportActions.FILE_REPORT_REJECTED,
            payload: errorMessage
        }
    }
    static getReportList(){
        return{
            type: ReportActions.GET_REPORT_LIST
        }
    }
    static getReportListSuccessful(reportList){
        console.log("report action", reportList)
        return{
            type: ReportActions.GET_REPORT_LIST_SUCCESSFUL,
            payload: reportList
        }
    }
    static getReportListRejected(errorMessage){
        return{
            type: ReportActions.GET_REPORT_LIST_REJECTED,
            payload: errorMessage
        }
    }

    static getReportDetail(){
        return{
            type: ReportActions.GET_REPORT_DETAIL
        }
    }
    static getReportDetailSuccessful(reportDetail){
        return{
            type: ReportActions.GET_REPORT_DETAIL_SUCCESSFUL,
            payload: reportDetail
        }
    }
    static getReportDetailRejected(errorMessage){
        return{
            type: ReportActions.GET_REPORT_DETAIL_REJECTED,
            payload: errorMessage
        }
    }

    static getMyReports(){
        return{
            type: ReportActions.GET_MY_REPORTS
        }
    }
    static getMyReportsSuccessful(myReports){
        return{
            type: ReportActions.GET_MY_REPORTS_SUCCESSFUL,
            payload: myReports
        }
    }
    static getMyReportsRejected(errorMessage){
        return{
            type: ReportActions.GET_MY_REPORTS_REJECTED,
            payload: errorMessage
        }
    }
    static getListOfCities(){
        return{
            type: ReportActions.GET_LIST_OF_CITIES,
        }
    }

    static getListOFCitiesSuccessful(listOfCities){
        return{
            type: ReportActions.GET_LIST_OF_CITIES_SUCCESSFUL,
            payload: listOfCities
        }    
    }    
    static getListOFCitiesRejected(errorMessage){
        return{
            type: ReportActions.GET_LIST_OF_CITIES_REJECTED,
            payload: errorMessage
        }
        
    }    
}