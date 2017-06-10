import AuthAction from './../actions/authActions';
import firebase from 'firebase';

export default class FirebaseAuthService{

static hello(){
    console.log("dasdasdasd")
}
    static registerUserOnFirebase(credentials) {
        return (dispatch) => {
            
            console.log('credentials', credentials)
            firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
                .then((userResponseFromFirebase) => {
                    console.log(userResponseFromFirebase)

                    FirebaseAuthService.createUserOnFirebaseWithUid(dispatch, credentials, userResponseFromFirebase)
                    // browserHistory.push('/login');    
                })
                .catch((error) => {
                    console.log(error.message)
                    dispatch(AuthAction.signupReject(error))
                });
        }
    }

    static createUserOnFirebaseWithUid(dispatch, credentials, userResponseFromFirebase) {
        console.log('credentials', credentials)

        delete credentials.pass
        firebase.database().ref('/')
            .child(`newUsers/${userResponseFromFirebase.uid}`)
            .set(credentials)
            .then(() => {
                dispatch(AuthAction.signupSuccessFull())
            })
    }


    static loginOnFirebase(credentials) {
        console.log("'credentials' from login auth", credentials);
        return (dispatch) => {
            firebase.auth()
                .signInWithEmailAndPassword(credentials.email, credentials.password)
                .then((authUser) => {
                    console.log("'authUser' from loginOn login auth", authUser);
                    FirebaseAuthService.getUserFromFirebase(dispatch, authUser)
                    // browserHistory.push('/home');

                })
                .catch((error) => {
                    console.log(error.message)
                    dispatch(AuthAction.loginReject(error))
                });
        }
    }

    static getUserFromFirebase(dispatch, authUser) {
        console.log("'authUser' from getUser login auth", authUser);
        firebase.database().ref('/')
            .child(`newUsers/${authUser.uid}`)
            .once('value', (snap) => {
                dispatch(AuthAction.loginSuccessFull(snap.val()))
            })
    }

    static logoutFromFirebase() {
        return (dispatch) => {
            firebase.auth().signOut()
                .then(function () {
                    dispatch(AuthAction.logOutUser())
                })
                .catch((error) => {
                    console.log(error.message)
                    dispatch(AuthAction.logOutUserReject(error))
                });
        }
    }
}
