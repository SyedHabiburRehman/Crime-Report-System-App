import React,{ Component } from 'react';
import { Router,Route,IndexRoute,browserHistory } from 'react-router';
import SignUp from './containers/signUp/signup';
import Login from './containers/login/login';
import FileReport from './containers/fileReport/fileReport';
import App from './containers/App/app';
import Dashboard from './containers/Dashboard/dashboard';
import ReportDetail from './containers/reportDetail/reportDetail';
import MyReports from './containers/myReports/myReports';

export default class Routes extends Component{
    render(){
        return(
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={SignUp} />

                    <Route path="/signup" component={SignUp}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/fileReport" component={FileReport}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/reportItem/:id" component={ReportDetail}/>
                    <Route path="/myReports" component={Dashboard}/>
                </Route>
                
            </Router>
        )
    }
}