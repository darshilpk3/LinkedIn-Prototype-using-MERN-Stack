import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import myNetwork from './myNetwork';
import connections from './connections'; 
import savedJobs from './savedJobs';
import appliedJobs from './appliedJobs';
import Messaging from './messaging';
import navbar from './navbar';
import homepage from './homepage';
import Profilelocation from './profilelocation';
import Newsfeed from './newsfeed';
import UserDelete from './userdelete';
import JobPosting from './jobposting';
import JobSearch from './jobsearch';
import JobResults from './jobresults';


class Main extends Component {
    render() {
        return (
            <div>

				<Route exact path="/myNetwork" component={myNetwork} />
                <Route exact path="/connections" component={connections} /> 
                <Route exact path="/savedJobs" component={savedJobs} /> 
                <Route exact path="/appliedJobs" component={appliedJobs} /> 
                <Route exact path="/messaging" component={Messaging} />                 
				<Route exact path="/navbar" component={navbar} />
                <Route exact path="/" component={homepage} />
                <Route exact path="/profilelocation" component={Profilelocation} />
                <Route exact path="/newsfeed" component={Newsfeed} />
                <Route exact path="/user/delete" component={UserDelete} />
                <Route exact path="/job/post" component={JobPosting} />
                <Route exact path="/jobs/" component={JobSearch} />
                <Route exact path="/jobs/results" component={JobResults} />
                {/* <Route path="/TravelerLogin" component={Login} /> */}

            </div>
        )
    }
}
//Export The Main Component
export default Main;