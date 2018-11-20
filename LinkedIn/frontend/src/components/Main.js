import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import homepage from './homepage';
import Profilelocation from './profilelocation';
import Newsfeed from './newsfeed';

class Main extends Component {
    render() {
        return (
            <div>
                
                <Route exact path="/" component={homepage} />
                <Route exact path="/profilelocation" component={Profilelocation} />
                <Route exact path="/newsfeed" component={Newsfeed} />
                {/* <Route path="/TravelerLogin" component={Login} /> */}
                
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;