import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/
import '../styles/peoplesearchresults.css'
import Login from './Navbar'
import picDS from '../assets/images/PicDS.png'

class PeopleSearchResults extends Component {
    constructor(props) {
        super(props);
        this.state={
            noofpeople : "275",
            userName : "Alex White",
            userInfo : "Student at San Jose State University",
            userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",

        }

        this.handleSendConnection = this.handleSendConnection.bind(this);
    }
    
    handleSendConnection = (e) => {
        e.preventDefault();
    e.target.value="Pending"
        }
    render() {
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
                        <input type = "button" class="btn btn-primary myConnectionButton" id="connectbutton" onClick={this.handleSendConnection} style={{'float':'right' ,'width':'50%'}} value="Connect"></input>                
                    </div>
                    <hr style={{'float':'bottom' ,'width':'100%', 'margin-top':'15%'}} ></hr>
                </div>   
                           
        )
        
        return (    
            <div>
                
                <Login/>
                <div className="myMargin"></div>
                    <div class="row myNetworkBackground">
                        

                        {/* column 1- This is the code for user connections */}

                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <div class="card myInvitations"> 
                                <div class="card-title "> 
                                    <p>Showing {this.state.noofpeople} results</p><br></br>
     


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



export default PeopleSearchResults;