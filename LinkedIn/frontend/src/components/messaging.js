import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import ad from '../assets/images/Ad_TDK.png'

class myNetwork extends Component {
    constructor(props) {
        super(props);
        this.state={

            clickedUser:"Lauren Miller",
            clickedUserDetails:"Amazon Recruiter",
            msgListUserName : "Alex White", 
            userName : "User",
            userMessage : "Hi there. How are you?",

            createMsgFlag : false,
            
            msgListProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",
            userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"
            
        }
        this.handleCreateNewMesage = this.handleCreateNewMesage.bind(this);
        this.handleClickedViewMsg = this.handleClickedViewMsg.bind(this);
    }   

    handleCreateNewMesage = () => {
        this.setState({
            createMsgFlag : true
        });
    }
    handleClickedViewMsg = () => {
        this.setState({
            createMsgFlag : false
        });
    }

    render() {
        require('../styles/messaging.css');
        let redirect = null;

        let DisplayMsgList = null;
        let DisplayMessage = null;
        let MsgInfo = null;
        let createMsg = null;

        DisplayMsgList = (
            <div class="row userInvitations">
                <div className="col-sm-3 col-md-3 col-lg-3">
                    <img src={this.state.msgListProfileImage} className="img-circle profileImage" />
                </div>
                 
                <div className="col-sm-9 col-md-9 col-lg-9" onClick={this.handleClickedViewMsg}>
                    <h4>{this.state.msgListUserName}</h4>
                </div>
                
            </div>
        )
 
        DisplayMessage = (
            <div class="row userInvitations">
                <div className="col-sm-3 col-md-3 col-lg-1">
                    <img src={this.state.userProfileImage} className="img-circle userprofileImage" />
                </div>
                <div className="col-sm-9 col-md-9 col-lg-11" style={{'textAlign':'left'}}>
                    <h5>{this.state.userName}</h5>
                    <p>{this.state.userMessage}</p>
                </div>
            </div>
        )

        if(!this.state.createMsgFlag){
            MsgInfo = (
                <div>
                    <div class="card-title upperheight">  
                        {this.state.clickedUser}
                        <p>{this.state.clickedUserDetails}</p>
                    </div>
                    <div class="card-body lowerheight">  
                        {DisplayMessage}          
                    </div>
                    <div class="card-body belowheight">  
                        <textarea className="textBox" placeholder="Enter your message here.." cols="50" rows="4"></textarea>
                        <button className="mysendButton"> Send</button>
                    </div>
                </div>
            )
        }

        if(this.state.createMsgFlag){
            createMsg = (
                <div>
                    hello
                </div>
            )
        }
        
        return (    
            <div>
                <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'darkblue', "border-radius": "0px", marginBottom: "0px" }}>
                       hi
                </nav>
                <div className="myMargin"></div>
                    <div class="row myNetworkBackground">
                        {/*column 1- This is the code for msg list */}
                        <div class="col-sm-3 col-md-3 col-lg-3 " >
                        <div class="card myConnections"> 
                                <div class="card-title upperheight"> 
                                    <div class="row"> 
                                        <div class="col-sm-8 col-md-8 col-lg-8 ">
                                            <h4>Messaging</h4> 
                                        </div>
                                        <div class="col-sm-4 col-md-4 col-lg-4 ">
                                            <a onClick={this.handleCreateNewMesage} className="msgGlyphicon"><span class="glyphicon glyphicon-edit"></span></a>    
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body msgListlowerheight">  
                                    {DisplayMsgList}  
                                </div>
                                
                            </div>
                        </div>

                        {/* column 2- This is the code for msg display */}
                        
                        <div class="col-sm-5 col-md-5 col-lg-5 ">
                            <div class="card myInvitations"> 
                                {MsgInfo}{createMsg}
                            </div> 
                        </div>

                        {/* column 3-This is the code for ads */}
                        <div class="col-sm-4 col-md-4 col-lg-4" >
                            <div class="card myads"> 
                                <div class="card-title ">
                                    <p style={{'float':'right'}}>Ad ...</p><br></br><br></br>
                                    <img className="myImg" src = {ad}></img>
                                    <p>Explore relevant opportunities with TDK InvenSense</p>
                                    <button class="btn btn-primary myConnectionButton">Follow</button>
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



export default myNetwork;