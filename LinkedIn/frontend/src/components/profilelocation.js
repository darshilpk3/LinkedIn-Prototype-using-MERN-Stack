import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../styles/profilelocation.css'
import Stepper from 'react-stepper-horizontal'

class ProfileLocation extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div>
            
            <div className ="profilelocationstepper">
            <Stepper steps ={[{title: <h5>Profile</h5>}, {title: 'Community'}, {title: 'Interests'}]} 
            activeStep={0} 
            lineMarginOffset = {30}
            defaultTitleColor = {"#595959"}
            size={20} 
            circleFontSize={0}
            activeBorderColor={"#3177a6"} 
            completeBorderColor={"#c2c2c2"} 
            defaultBorderColor={"#c2c2c2"} 
            activeColor={"#FFFFFFF"} 
            completeColor={"#FFFFFFF"}  
            defaultColor={"#FFFFFFF"} 
            defaultBorderStyle={"solid"}
            completeBorderStyle={"solid"}
            activeBorderStyle={"solid"} />
            </div>

            <p className="plWelcome">
            Welcome, Sanjna!
            </p>
            
            <h5 className= "welcomedescript">
            Let's start your profile, connect to people you know, and engage with them on topics you care about.
            </h5>
            <label for = "welcomelocation"><h5 className="welcomelocationlabels">Country/Region</h5></label>
            <div>
            <select name="welcomelocation" className = "welcomelocation">
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="Egypt">Egypt</option>
            <option value="Germany">Germany</option>
            </select>
            </div>
            <label for = "welcomezipcode"><h5 className="welcomelocationlabels">Postal code</h5></label>
            <div>
            <input type="text" name="welcomezipcode" className = "welcomezipcode" placeholder = "   95112" />
            </div>
            <div className="profilelocationbutton">
            <button className = "btn btn-primary" name="profilelocationbutton" >Next</button>
            </div>
            </div>
        )
    }
}

export default ProfileLocation;