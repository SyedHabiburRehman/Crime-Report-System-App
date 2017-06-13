import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportMiddleware from '../../store/middlewares/reportMiddleware';
import * as MUI from 'material-ui';

const mapStateToProps = (state)=>{
    return{
        reportList: state.ReportReducer.reportList,
        cityList: state.ReportReducer.cityList
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        getReportList: (cityName)=>{
            dispatch(ReportMiddleware.getReportList(cityName));
        }
    }
}

class Dashboard extends Component{
    constructor(props){
        super();
        this.state={
            city:"",
        }
    }
    handleCityChange(event,index,value){
        this.setState({
            city:value
        })
        this.props.getReportList(value);
    }
    renderFilterCity(){
        var cityFilter = (
            <div>
                <span style={{paddingRight:20}}>Select City To Filter Reports</span> 
                
                <MUI.SelectField
                ref="city"
                floatingLabelText="City"
                value={this.state.city}
                onChange={this.handleCityChange.bind(this)}
                autoWidth={true}
                                
                >
                {
                    this.props.cityList.map(city=>{
                       return <MUI.MenuItem key={city} value={city} primaryText={city}/>
                    })
                }
                </MUI.SelectField>
            </div>
        );
        return cityFilter;
    }
    render(){
        return(
            <div>
                {this.renderFilterCity()}
                {/*{Object.assign({},this.props)}*/}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);