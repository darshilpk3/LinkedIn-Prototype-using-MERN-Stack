import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/


import picDS from '../assets/images/PicDS.png'

class connections extends Component {
    constructor(props) {
        super(props);
        this.state={
            userConnections : "205",    //number of connections user have
            userConnections : "20",
            userName : "Alex White",
            userInfo : "Student at San Jose State University",
            userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"
        }
    }   
    render() {
        require('../styles/connections.css');
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
                    
                    <div className="col-sm-3 col-md-3 col-lg-4" >
                        <button class="btn btn-primary myConnectionButton" style={{'float':'right' ,'width':'50%'}}>Message</button>                
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-1">
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" data-toggle="dropdown" style={{'float':'left', 'font-size':'150%'}}>...</a>
                                <ul class="dropdown-menu"> 
                                    <li><a>Remove Connection</a></li>
                                </ul>
                        </div>       
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
                        

                        {/* column 1- This is the code for user connections */}

                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <div class="card myInvitations"> 
                                <div class="card-title "> 
                                    <h4>{this.state.userConnections} Connections</h4><br></br>

                                    <div className="row aligntextleft">
                                        <div class="col-sm-2 col-md-2 col-lg-2" style={{'textAlign':'right'}}>
                                        <h5>Sort By:</h5>
                                        </div>
                                        
                                        <div class="col-sm-3 col-md-3 col-lg-3">
                                            <div class="dropdown">
                                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Recently added
                                                <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li class="dropdown-header">Recently Added</li>
                                                    <li><a href="#">First name</a></li>
                                                    <li><a href="#">Last Name</a></li>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                    
                                        <div class="col-sm-4 col-md-4 col-lg-4" style={{'textAlign':'right', 'height':'100%','marginTop':'0.5%'}}>
                                            <input type="text" placeholder="Search.." name="search"/>
                                            <button type="submit" className="submitbutton"><i class="fa fa-search"></i></button> 
                                        </div>
                                        
                                        <div class="col-sm-3 col-md-3 col-lg-3">
                                        <a><h5>Search with filters</h5></a>
                                        </div>
                                        
                                    </div>

                                    <hr></hr>
                                    
                                    {DisplayData}

                                </div>
                            </div> 
                        </div>

                        {/* column 2-This is the code for ads */}
                        <div class="col-sm-4 col-md-4 col-lg-4" >
                            <div class="myadsborder"> 
                                <p>Manage Synced and imported contacts</p><br></br>
                                <h6>Your contact import is ready</h6>
                                <p>Connect with your contacts and never lose touch</p>
                                <button class="btn btn-primary myConnectionButton">Continue</button>
                            </div>

                            <div class="card myads"> 
                                <div class="card-title ">
                                    <h5 style={{'float':'left'}}>Promoted</h5><br></br>
                                    <hr></hr> 
                                    <div className="row">
                                        <div class="col-sm-2 col-md-2 col-lg-2" >
                                            <img style={{ 'width':'200%', 'height':'200%' }}src={picDS}/>
                                        </div>
                                        <div class="col-sm-10 col-md-10 col-lg-10" style={{'float':'left'}}>
                                            <a>Data Science masters</a>
                                            <p> Earn your Master's in Data Science from Syracuse. GRE waivers available. </p>
                                        </div>
                                    </div> 
                                </div>
                            </div> 
                            <div class="myadsborder"> 
                                <a>About</a> <a> Help Center </a> <a> Privacy & Terms</a>
                                <br></br><a>Advertising</a>  <a> Business Services</a>  
                                <br></br><a>Get the LinkedIn app</a> <a>  More</a><br></br>
                                <a>LinkedIn Corporation © 2018</a>
                            </div>
                        </div>
                        
                    </div>
            </div>
        )
    }
}



export default connections;