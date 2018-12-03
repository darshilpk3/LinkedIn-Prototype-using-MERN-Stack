import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ROOT_URL } from '../constants/constants';

class searchResults extends Component {
    constructor(props) {
        super(props);


        this.state = {
            //search using these two on component did mount
            job_title: "IOT",            //this.props.location.jobTitle / jobLocation
            location: "san jose",

            jobResults: [],
            clickedAjob: false,

            clickedJobTitle: "",
            clickedJobId: "",
            clickedDescription: "",
            clickedIndustry: "",
            clickedEmploymentType: "",
            clickedPostedDate: "",
            clickedLocation: "",
            clickedJobFunction: "",
            clickedCompanyLogo: "",
            clickedApplyMethod: "",
            clickedPostedBy: "",
            clickedProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"


        }
        this.handleClickedViewJob = this.handleClickedViewJob.bind(this);
        this.handleSavedJob = this.handleSavedJob.bind(this);

    }

    componentDidMount() {
        window.scrollTo(0, 0);

        axios.defaults.withCredentials = true;
        const data = {
            job_title: this.state.job_title,
            location: this.state.location
        }
        axios.post(`${ROOT_URL}/job/search/`, data)

            .then(res => {

                console.log("------on load-------", res.data.length);
                console.log("------on load-------", res.data);

                this.setState({
                    jobResults: res.data
                });

            })
            .catch(err => {
                console.log("Error in job search get");
            });
    }

    handleClickedViewJob = (e) => {
        console.log("The jobid clicked is: ", e);

        this.setState({
            clickedJobId: e
        });

        axios.get(`${ROOT_URL}/job/${e}`)
            .then(res => {
                console.log("------on load-------", res.data.length);
                console.log("------on load-------", res.data.info.result.postedBy);
                this.setState({
                    clickedAjob: true,
                    clickedJobTitle: res.data.info.result.jobTitle,
                    clickedDescription: res.data.info.result.description,
                    clickedIndustry: res.data.info.result.industry,
                    clickedEmploymentType: res.data.info.result.employmentType,
                    clickedPostedDate: res.data.info.result.postedDate,
                    clickedLocation: res.data.info.result.location,
                    clickedJobFunction: res.data.info.result.jobFunction,
                    clickedCompanyLogo: res.data.info.result.companyLogo,
                    clickedApplyMethod: res.data.info.result.applyMethod,
                    clickedPostedBy: res.data.info.result.postedBy,
                    isSaved: ""
                });

            })
            .catch(err => {
                console.log("Error in job search get of clicked.");
            });
    }

    handleSavedJob = () => {

        const userID = "5c0313af1e6ee47530f590cb"; //localStorage.getItem(userId);
        const data = {
            jobId: this.state.clickedJobId
        }
        axios.post(`${ROOT_URL}/user/${userID}/save`, data)
            .then(res => {
                console.log("------on save-------", res.data.status);
                if (res.data.status == 1) {
                    this.setState({
                        isSaved: "The job is saved!"
                    });

                } else if (res.data.status == 0) {
                    this.setState({
                        isSaved: "The job is already saved."
                    });
                }
            })
            .catch(err => {
                console.log("Error in job save of clicked.");
            });
    }

    render() {
        require('../styles/searchResults.css');
        let redirect = null;

        let DisplayJobList = null;
        let clickedJobInfo = null;
        let savedModal = null;

        DisplayJobList = (
            <div class="row userInvitations ">
                {this.state.jobResults.map((jobResults, index) => (

                    <div key={index} onClick={() => this.handleClickedViewJob(jobResults._id)}>

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

        savedModal = (
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {this.state.isSaved}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        )

        if (this.state.clickedAjob) {
            clickedJobInfo = (
                <div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <img src={this.state.clickedCompanyLogo} className=" profileImage" />
                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 " >
                        <h3>{this.state.clickedJobTitle}</h3>
                        <h4>{this.state.clickedLocation}</h4>
                        <p>Posted on: {this.state.clickedPostedDate}</p>
                        <button className="savedButton" onClick={this.handleSavedJob} data-toggle="modal" data-target="#exampleModal">Save</button>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        {savedModal}
                        </div>

                        <button className="applyButton">{this.state.clickedApplyMethod}</button>

                        <br></br><br></br><hr></hr>
                        <h5>Job Description</h5>

                        <div className="row">
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <img src={this.state.clickedProfileImage} className=" profileImage" />
                            </div>
                            <div className="col-sm-9 col-md-9 col-lg-9">
                                <h6>Posted By:</h6>
                                <p>{this.state.clickedPostedBy.fname} {this.state.clickedPostedBy.lname}</p>
                                <h6>Contact:</h6><p>{this.state.clickedPostedBy.email}</p>
                            </div>
                        </div>

                        <hr></hr>
                        <p>{this.state.clickedDescription}</p><br></br>
                        <h5>Employment Type</h5>
                        <p>{this.state.clickedEmploymentType}</p>
                        <h5>Industry</h5>
                        <p>{this.state.clickedIndustry}</p>
                        <h5>Job Function</h5>
                        <p>{this.state.clickedJobFunction}</p>

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