import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from './routes';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import firebase from 'firebase';
injectTapEventPlugin();



var config = {
    apiKey: "AIzaSyCtum4UF_3KdRJuwcQGwUpcTwnUEYGVlmA",
    authDomain: "crime-report-system-app.firebaseapp.com",
    databaseURL: "https://crime-report-system-app.firebaseio.com",
    projectId: "crime-report-system-app",
    storageBucket: "crime-report-system-app.appspot.com",
    messagingSenderId: "1061428234732"
  };
  firebase.initializeApp(config);


ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
        <Routes/>
    </Provider>
    </MuiThemeProvider>, 
    document.getElementById('root'));
// registerServiceWorker();
