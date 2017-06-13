import React, { Component } from 'react';
import { connect} from 'react-redux';
import * as MUI from 'material-ui';

class CrimeSummary extends Component{
    render(){
        return(
            <div>
                <MUI.Tabs>
                    <MUI.Tab icon={<Fingerprint/>} label="Crime">

                    </MUI.Tab>
                    <MUI.Tab label="Complaints"></MUI.Tab>
                    <MUI.Tab label="Missing Person"></MUI.Tab>
                </MUI.Tabs>
            </div>
        )
    }
}
export default connect()(CrimeSummary);