import ReportActions from '../../store/actions/reportActions';
    const INITIAL_STATE = {
        isError: false,
        errorMessage: {},
        isProcessing: false,
        isReportSubmitted: false,
        cityList:[]
    }

   export const ReportReducer = (state = INITIAL_STATE, action)=> {
        // console.log("sadasd",action.payload)
        switch(action.type){
            case ReportActions.FILE_REPORT:
                return Object.assign({},state,{isProcessing:true, isError:false, isReportSubmitted: false })
            case ReportActions.FILE_REPORT_SUCCESSFUL:
                return Object.assign({},state,{isProcessing:false, isError: false, errorMessage: {}, isReportSubmitted:true})
            case ReportActions.FILE_REPORT_REJECTED:
                return Object.assign({},state,{isProcessing:false, isError:true, errorMessage:action.payload, isReportSubmitted:false})

            case ReportActions.GET_LIST_OF_CITIES:
                return Object.assign({}, state, {isProcessing:true, isError:false, cityList:[]})
            case ReportActions.GET_LIST_OF_CITIES_SUCCESSFUL:
                return Object.assign({}, state, {isProcessing: false, isError: false, cityList:action.payload} )
            case ReportActions.GET_LIST_OF_CITIES_REJECTED:
                return Object.assign({}, state,{isProcessing: false, isError:true, errorMessage:action.payload, cityList:[] })
            default :
                return state
        }
        
    }
