import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/


import picDS from '../assets/images/PicDS.png'

class savedJobs extends Component {
    constructor(props) {
        super(props);
        this.state={
            savedJobs : "3",    //number of connections user have
            savedPosition : "Electronic Engineering ",
            savedCompany : "NVIDIA",
            savedCompanyAddress : "San Jose, California",

            appliedJobs: "4",
            appliedPosition : "Software Engineering Intern",
            appliedCompany : "Adobe",
            appliedCompanyAddress : "San Jose, California",
            
            savedCompanyImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",
            appliedCompanyImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"
            
        }
    }   
    render() {
        require('../styles/savedJobs.css');
        let redirect = null;

        let DisplaySavedJobs = null;
        let DisplayAppliedJobs = null;
        
        DisplaySavedJobs = (    

                <div class="row userInvitations">
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <img src={this.state.savedCompanyImage} className="img savedjobImage" />
                    </div>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <h4>{this.state.savedPosition}</h4>
                        <h5>{this.state.savedCompany}</h5>  
                        <h6>{this.state.savedCompanyAddress}</h6>                 
                    </div>
                    
                    <div className="col-sm-4 col-md-4 col-lg-4" >
                        <button class="btn btn-primary myConnectionButton" 
                        style={{'float':'right' ,'width':'50%'}}>Apply</button>                
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" data-toggle="dropdown" 
                            style={{'float':'left', 'font-size':'150%'}}>
                                <span class="glyphicon glyphicon-bookmark"></span>
                            </a>      
                        </div>       
                    </div>
                    <hr></hr>

                    
                </div>              
        )
        DisplayAppliedJobs = (
            <div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                    <img src={this.state.appliedCompanyImage} className="img appliedjobImage" />
                </div>
                <div className="col-sm-5 col-md-5 col-lg-10"  style={{'textAlign':'left'}}>
                    <h4>{this.state.appliedPosition}</h4>
                    <h5>{this.state.appliedCompany}</h5>  
                    <h6>{this.state.appliedCompanyAddress}</h6>                 
                </div>
                    
                <hr></hr>

            </div>
        )
        
        return (    
            <div>
                
                <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'darkblue', "border-radius": "0px", marginBottom: "0px" }}>
                       hi
                </nav>
                <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'lightblue', "border-radius": "0px", marginBottom: "0px" }}>
                       searchbar
                </nav> 
                    <div class="row myNetworkBackground">

                        {/* column 1- This is the code for Saved Jobs */}

                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <div class="card myInvitations"> 
                                <div class="card-title "> 
                                    <h4>Saved Jobs({this.state.savedJobs})</h4>
                                    <hr></hr>
                                    {DisplaySavedJobs}
                                </div>
                            </div> 
                        </div>

                        {/* column 2-This is the code for applied Jobs */}
                        <div class="col-sm-4 col-md-4 col-lg-4" >
                            <div class="myadsborder"> 
                                <div className="row">
                                    <div class="col-sm-8 col-md-8 col-lg-8" style={{'textAlign':'left'}}>
                                        Applied Jobs({this.state.appliedJobs})
                                    </div>
                                    <div class="col-sm-4 col-md-4 col-lg-4" style={{'textAlign':'right'}}>
                                        <a href="/appliedJobs">See all</a>
                                    </div>
                                </div>
                                <hr></hr>
                                {DisplayAppliedJobs}
                                <br></br><br></br><br></br>
                            </div>
                            
                            <div class="myadsborder"> 
                                <br></br><br></br><a>About</a> <a> Help Center </a> <a> Privacy & Terms</a>
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

export default savedJobs;