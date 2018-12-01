import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/


import picDS from '../assets/images/PicDS.png'
import axios from 'axios';

class savedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedJobs: 0,    //number of connections user have
            savedJobsDetails: null
        }
    }

    showJobDetails = (e) =>{
        console.log(e.target.id)
    }

    componentDidMount() {
        var headers = new Headers()
        axios.defaults.withCredentials = true;

        console.log("component did mount should be called")

        if (localStorage.getItem("userId")) {
            const userId = localStorage.getItem("userId")
            axios.get(`http://localhost:3001/user/${userId}/savedJobs`)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data.info)
                        this.setState({
                            savedJobsDetails: response.data.info,
                            savedJobs: response.data.info.length
                        })
                    }
                })
        }
    }


    render() {
        require('../styles/savedJobs.css');
        let redirect = null;

        let DisplaySavedJobs = null;
        let DisplayAppliedJobs = null;

        if (this.state.savedJobsDetails) {
            var displaySavedJobs = this.state.savedJobsDetails.map(job => {
                return (
                    <div class="row userInvitations">
                        <div className="col-sm-2 col-md-2 col-lg-2">
                            <img src={job.companyLogo} className="img savedjobImage" />
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <h4><a href="#" onClick={this.showJobDetails} id={job._id}>{job.jobTitle}</a></h4>
                            <h5>{job.postedBy.fname + " " + job.postedBy.lname}</h5>
                            <h6>{job.location}</h6>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4" >
                            <button class="btn btn-primary myConnectionButton"
                                style={{ 'float': 'right', 'width': '50%' }} id={job._id}>Apply</button>
                        </div>
                        <div className="col-sm-1 col-md-1 col-lg-1">
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" data-toggle="dropdown"
                                    style={{ 'float': 'left', 'font-size': '150%' }}>
                                    <span class="glyphicon glyphicon-bookmark"></span>
                                </a>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                )
            })
        }

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
                                {displaySavedJobs}
                            </div>
                        </div>
                    </div>

                    {/* column 2-This is the code for applied Jobs */}
                    <div class="col-sm-4 col-md-4 col-lg-4" >
                        <div class="myadsborder">
                            <div className="row">
                                <div class="col-sm-8 col-md-8 col-lg-8" style={{ 'textAlign': 'left' }}>
                                    Applied Jobs({this.state.appliedJobs})
                                    </div>
                                <div class="col-sm-4 col-md-4 col-lg-4" style={{ 'textAlign': 'right' }}>
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