import AuthAction from './../actions/authActions';

const INITIAL_STATE = {
    authUser: {},
    isRegistered: false,
    isLoggedin: false,
    isError: false,
    errorMessage: {},
}

export const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case AuthAction.SIGN_UP_SUCCESSFUL:
            return Object.assign({}, state, { isRegistered: true })
        case AuthAction.SIGNUP_REJECT:
            return Object.assign({}, state, { errorMessage: action.value, isError: true })

        case AuthAction.LOGIN_SUCCESSFUL:
            return Object.assign({}, state, { isLoggedin: true, authUser: action.value })
        case AuthAction.LOGIN_REJECT:
            return Object.assign({}, state, { errorMessage: action.value, isError: true })

        case AuthAction.LOGOUT_SUCCESSFUL:
            return Object.assign({},state, {isLoggedin:false,authUser:{}})
        case AuthAction.LOGOUT_REJECT:
            return Object.assign({}, state, { errorMessage: action.value, isError: true })

        default:
            return state
    }

}