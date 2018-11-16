import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import homepage from './homepage';


class Main extends Component {
    render() {
        return (
            <div>
                
                <Route exact path="/" component={homepage} />
                {/* <Route path="/TravelerLogin" component={Login} /> */}
                
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;