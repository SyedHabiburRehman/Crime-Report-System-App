import ReportActions from '../../store/actions/reportActions';

const INITIAL_STATE = {
    isError: false,
    errorMessage: {},
    isProcessing: false,
    isReportSubmitted: false,
    cityList: [],
    reportCounts: {},
    reportList: [],
    reportDetail: {},
    isMyReportType: false,
    myReportList: [],
    isStatusUpdated: false


}

export const ReportReducer = (state = INITIAL_STATE, action) => {
    // console.log("+++++++++++++++++++++++++++",action.payload)
    switch (action.type) {

        case ReportActions.FILE_REPORT:
            return Object.assign({}, state, { isProcessing: true, isError: false, isReportSubmitted: false })
        case ReportActions.FILE_REPORT_SUCCESSFUL:
            console.log("+++++++++++++++++++++++++++", action.payload.reportType);
            return Object.assign({}, state, { isProcessing: false, isError: false, errorMessage: {}, isReportSubmitted: true })
        case ReportActions.FILE_REPORT_REJECTED:
            return Object.assign({}, state, { isProcessing: false, isError: true, errorMessage: action.payload, isReportSubmitted: false })

        case ReportActions.GET_REPORT_LIST:
            return Object.assign({}, state, { isProcessing: true, isError: false, reportList: [] })
        case ReportActions.GET_REPORT_LIST_SUCCESSFUL:
            console.log("action", action.payload);
            console.log(state.reportList)
            var newReportList = [...state.reportList];
            console.log(newReportList)
            newReportList.push(action.payload);
            console.log(newReportList)
            return Object.assign({}, state, { isProcessing: false, isError: false, reportList: newReportList })
        case ReportActions.GET_REPORT_LIST_REJECTED:
            return Object.assign({}, state, { isProcessing: false, isError: true, errorMessage: action.payload, reportList: [] })

        case ReportActions.GET_REPORT_DETAIL:
            return Object.assign({}, state, { isProcessing: true, isError: false, reportDetail: {} })
        case ReportActions.GET_REPORT_DETAIL_SUCCESSFUL:
            console.log("==========", action.payload)
            return Object.assign({}, state, { isProcessing: false, isError: false, reportDetail: action.payload })
        case ReportActions.GET_REPORT_DETAIL_REJECTED:
            return Object.assign({}, state, { isProcessing: false, isError: true, errorMessage: action.paylod, reportDetail: {} })

        case ReportActions.GET_MY_REPORTS:
            return Object.assign({}, state, { isProcessing: true, isError: false, myReportList: [] })
        case ReportActions.GET_MY_REPORTS_SUCCESSFUL:
            console.log("==========", action.payload)
            var newMyReportList = [];
            newMyReportList.push(...state.myReportList);
            newMyReportList.push(action.payload);
            console.log("new report list", newReportList)
            return Object.assign({}, state, { isProcessing: false, isError: false, myReportList: newMyReportList })
        case ReportActions.GET_MY_REPORTS_REJECTED:
            return Object.assign({}, state, { isProcessing: false, isError: true, errorMessage: action.payload, myReportList: [] })

        case ReportActions.STATUS_UPDATE:
            return Object.assign({}, state, { isProcessing: true, isError: false, isStatusUpdated: false });
        case ReportActions.STATUS_UPDATE_SUCCESSFUL:
            return Object.assign({}, state, { isProcessing: false, isError: false, isStatusUpdated: true });
        case ReportActions.STATUS_UPDATE_REJECTED:
            return Object.assign({}, state, { isProcessing: false, isError: true, errorMessage: action.payload, isStatusUpdated: false });

        case ReportActions.GET_LIST_OF_CITIES:
            return Object.assign({}, state, { isProcessing: true, isError: false, cityList: [] })
        case ReportActions.GET_LIST_OF_CITIES_SUCCESSFUL:
            return Object.assign({}, state, { isProcessing: false, isError: false, cityList: action.payload })
        case ReportActions.GET_LIST_OF_CITIES_REJECTED:
            return Object.assign({}, state, { isProcessing: false, isError: true, errorMessage: action.payload, cityList: [] })

        case ReportActions.GET_REPORT_COUNT:
            return Object.assign({}, state, { isProcessing: true, isError: false, reportCount: {} });
        case ReportActions.GET_REPORT_COUNT_SUCCESSFUL:
            return Object.assign({}, state, { isProcessing: false, isError: false, reportCount: action.payload });
        case ReportActions.GET_REPORT_COUNT_REJECTED:
            return Object.assign({}, state, { isProcessing: false, isError: true, errorMessage: action.payload, reportCount: {} });

        default:
            return state
    }

}
