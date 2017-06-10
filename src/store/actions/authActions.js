export default class AuthAction{
    static SIGN_UP = "SIGN_UP";
    static SIGN_UP_SUCCESSFUL = "SIGN_UP_SUCCESSFUL";
    static lOGIN = "LOGIN";
    static LOGIN_SUCCESSFUL = "LOGIN_SUCESSFUL";
    static LOGOUT = "LOGOUT";
    static LOGOUT_SUCCESSFUL = "LOGIN_SUCCESSFUL";
    static LOGOUT_REJECT = "LOGOUT_REJECT";
    static SIGNUP_REJECT = "SIGNUP_REJECT";
    static LOGIN_REJECT = "LOGIN_REJECT";

    static loginSuccessFull(authUser) {
        return {
            type: AuthAction.LOGIN_SUCCESSFUL,
            value: authUser
        }
    }
    static loginReject(reason) {
        return {
            type: AuthAction.SIGNUP_REJECT,
            value: reason
        }
    }
    static signupSuccessFull(){
    return{
        type: AuthAction.SIGN_UP_SUCCESSFUL,
    }
}

    static signupReject(reason) {
        return {
            type: AuthAction.SIGNUP_REJECT,
            value: reason
        }
    }
    static logOutUser() {
        return {
            type: AuthAction.LOGOUT_SUCCESSFUL
        }
    }

    static logOutUserReject(reason) {
        return {
            type: AuthAction.LOGOUT_REJECT,
            value: reason
        }
    }
}

