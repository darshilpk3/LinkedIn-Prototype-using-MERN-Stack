import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../styles/jobposting.css'
import Stepper from 'react-stepper-horizontal'
import noJobsImage from '../assets/images/NoJobListings.PNG'
import gifticon from '../assets/images/gift-icon.png'

class JobListing extends Component{
    constructor(props){
        super(props);
        this.state={
            information : []
        }
    }

    render(){
        require('../styles/jobListing.css');

        let noJobsDisplay = null;
        if(this.state.information.length==0)
        {
            noJobsDisplay = (
                <div class="center">
                    <img src= {noJobsImage}></img>
                </div>
            )
        }

        return(
            <div>
                <div class="row" id="mainbody">
                    <div class="col-md-7 left-content">
                            <br/>
                            <p class="title">&nbsp;&nbsp;&nbsp;Jobs</p>
                            <hr class="linebreak"></hr>
                            <div class="row">
                                <div class = "col-md-4">
                                    <input type = "text" name="search" id="search" placeholder="Search ..." class="form-control search-bar" />
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-primary go-button">
                                        <span>Go</span>
                                    </button>
                                </div>
                            </div>
                            <hr class="linebreak"></hr>
                    </div>
                    <div class="col-md-3 right-content">
                        <h3>&nbsp;&nbsp; No job posting budget</h3>
                        <span style={{float:'left', width: "20%"}}>
                            <img src={gifticon} width="70" height="70" class="giftimage"></img>
                        </span>
                        <span style={{float:'right', width : "70%"}}>
                            <p class= "para"> Save up to 35% by adding to your job posting budget </p>
                        </span>
                        <br/><br/><br/><br/>
                        <button class="button1">Add job posting budget</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default JobListing;