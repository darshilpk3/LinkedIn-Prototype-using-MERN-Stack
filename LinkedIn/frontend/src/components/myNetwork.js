import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import linkedIn from '../assets/images/linkedIn.png'

class myNetwork extends Component {
    constructor(props) {
        super(props);
        this.state={
            userConnections : "205",    //number of connections user have
            userInvitations : "20",
            userName : "Alex White",
            userInfo : "Student at San Jose State University",
            userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"
        }
    }   
    render() {
        require('../styles/myNetwork.css');
        let redirect = null;

        let DisplayData = null;
        
        DisplayData = (
            
           

                <div class="row userInvitations">
                    <div className="col-sm-6 col-md-6 col-lg-2">
                        <img src={this.state.userProfileImage} className="img-circle profileImage" />
                    </div>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <h4>{this.state.userName}</h4>
                        <h5>{this.state.userInfo}</h5>                 
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <a href="" style={{'float':'right', 'font-size':'150%'}}>Ignore</a>             
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                      
                        <button class="btn btn-primary myConnectionButton">Accept</button>                
                    </div>
                </div>
                
           
        )
        
        
        return (    
            <div>
                
                <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'darkblue', "border-radius": "0px", marginBottom: "0px" }}>
                       hi
                </nav>
                <div className="myMargin"></div>
                    <div class="row myNetworkBackground">
                        {/*column 1- This is the code for user connections */}
                        <div class="col-sm-3 col-md-3 col-lg-3" >
                            <div class="card myConnections"> 
                                <div class="card-title myConnectionsUpper">
                                    <h2 className="myConnectionFontColor">{this.state.userConnections}</h2>
                                    <h4>Your connections</h4>
                                    <a href=""><h5 className="myConnectionFontColor">See All</h5></a>
                                    
                                </div>
                                <div class="card-body myConnectionsLower">
                                    <h5 class="card-title">Your contact import is ready</h5>
                                    <p class="card-text">Connect with your contacts and never lose touch</p>
                                    <button class="btn btn-primary myConnectionButton">Continue</button>
                                    <br></br><br></br>
                                    <p>More Options</p>
                                </div>
                            </div>
                        </div>

                        {/* column 2- This is the code for user invitations */}

                        <div class="col-sm-5 col-md-5 col-lg-5">
                            <div class="card myInvitations"> 
                                <div class="card-title "> 
                                    <h4>Invitations({this.state.userInvitations})<a style={{'float':'right'}}>Manage All</a></h4>
                                    <hr></hr>
                                    
                                    {DisplayData}

                                </div>
                            </div> 
                        </div>

                        {/* column 3-This is the code for ads */}
                        <div class="col-sm-4 col-md-4 col-lg-4" >
                            <div class="card myads"> 
                                <div class="card-title ">
                                    <p style={{'float':'right'}}>Ad ...</p><br></br><br></br>
                                    <p>California 2018 Fall Virtual Teaching Careers Fair Nov. 27-30, 2018</p>
                                    <img src="https://media.licdn.com/dms/image/C4E0BAQFaPaenF1fVoA/company-logo_100_100/0?e=1550707200&v=beta&t=ZDhj3O_txFA81y5iESViZAF12r3sfFE5w-xXS0C6O8s"/>
                                    <p>Explore the benefits of the teaching profession.</p>
                                    <button class="btn btn-primary myConnectionButton">Register</button>
                                </div>
                            </div> 
                            <div class="myadsborder"> 
                                <p>About  Help Center   Privacy & Terms
                                <br></br>Advertising   Business Services  
                                <br></br>Get the LinkedIn app   More<br></br>
                                LinkedIn Corporation © 2018</p>
                            </div>
                        </div>
                        
                    </div>
            </div>
        )
    }
}



export default myNetwork;