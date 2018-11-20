import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import homepage from './homepage';
import myNetwork from './myNetwork';
import connections from './connections'; 
import savedJobs from './savedJobs';
import appliedJobs from './appliedJobs';


class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={homepage} />
                <Route exact path="/myNetwork" component={myNetwork} />
                <Route exact path="/connections" component={connections} /> 
                <Route exact path="/savedJobs" component={savedJobs} /> 
                <Route exact path="/appliedJobs" component={appliedJobs} /> 
                {/* <Route path="/TravelerLogin" component={Login} /> */}
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;