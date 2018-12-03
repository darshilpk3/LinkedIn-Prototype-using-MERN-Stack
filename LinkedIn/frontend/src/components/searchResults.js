import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/


class searchResults extends Component {
    constructor(props) {
        super(props);

        const jobs = [];

        for (let i = 0; i < 6; i++) {
            jobs.push({
                jobID: i,
                jobTitle: "Machine Learning Software Engineer " + i,
                description: "Strong and proven system programming skills in Python/Javascript/C/C++ Experience in FDA-regulated software development. ",
                location: "San Jose",
                companyLogo: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",
                applyMethod: "Custom Apply"
            });
        }

        this.state = {

            jobResults: jobs,
            createMsgFlag: false,
            clickedAjob: false,

            clickedJobTitle: "abc",
            clickedDescription: "abs",
            clickedLocation: "sef", 
            clickedCompanyLogo: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",

            clickedApplyMethod: "Easy Apply"
        }
        this.handleClickedViewJob = this.handleClickedViewJob.bind(this);
    }

    handleClickedViewJob = (e) => {
        console.log("The jobid clicked is: ", e);
        this.setState({
            //change the job details to the job clicked
            clickedAjob: true

        });
    }

    render() {
        require('../styles/searchResults.css');
        let redirect = null;

        let DisplayJobList = null;
        let clickedJobInfo = null;

        DisplayJobList = (
            <div class="row userInvitations ">
                {this.state.jobResults.map((jobResults, index) => (

                    <div key={index} onClick={() => this.handleClickedViewJob(jobResults.jobID)}>

                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <img src={jobResults.companyLogo} className=" profileImage" />
                        </div>

                        <div className="col-sm-9 col-md-9 col-lg-9 hoverEffect" >
                            <h4>{jobResults.jobTitle}</h4>
                            <h5>{jobResults.location}</h5>
                            <p>{jobResults.description}</p>
                        </div>

                    </div>
                ))}
            </div>
        )

        if (this.state.clickedAjob) {
            clickedJobInfo = (
                <div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <img src={this.state.clickedCompanyLogo} className=" profileImage" />
                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 hoverEffect" >
                        <h4>{this.state.clickedJobTitle}</h4>
                        <h5>{this.state.clickedLocation}</h5>
                        <p>{this.state.clickedDescription}</p>
                        <button className="savedButton">Save</button>
                        <button className="applyButton">{this.state.clickedApplyMethod}</button>

                    </div>
                </div>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'darkblue', "border-radius": "0px", marginBottom: "0px" }}>
                    hi
                </nav>
                <div class="row myNetworkBackground">
                    {/*column 1- This is the code for msg list */}
                    <div class="col-sm-5 col-md-5 col-lg-5 " >
                        <div class="card myConnections">
                            <div class="card-body msgListlowerheight">
                                {DisplayJobList}
                            </div>
                        </div>
                    </div>

                    {/* column 2- This is the code for msg display */}

                    <div class="col-sm-7 col-md-7 col-lg-7 ">
                        <div class="card myInvitations">
                            {clickedJobInfo}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default searchResults;