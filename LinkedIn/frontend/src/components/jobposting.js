import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../styles/jobposting.css'
import Stepper from 'react-stepper-horizontal'
import bulb from '../assets/images/postjobbulb.PNG'

class JobPosting extends Component{
    constructor(props){
        super(props);
        this.state={
            userName : "Alex White",
            userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",
        }
    }

    render(){
        return(
            <div>
<div class="stepwizard">
    <div class="stepwizard-row setup-panel">
        <div class="stepwizard-step">
            <a href="#step-1" type="button" class="btn btn-primary btn-circle firstbtn">1</a>
        </div>
        <div class="stepwizard-step">
            <a href="#step-2" type="button" class="btn btn-default btn-circle secondbtn" disabled="disabled">2</a> 
        </div>
        <div class="stepwizard-step">
            <a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
        </div>
    </div>
</div>
<form onSubmit={this.onSubmit}>
    <div class="row setup-content" id="step-1">
    <div className="page1background">
        <div class="col-xs-12">
            <div class="col-md-12">
            <div className="jobpostpage1">
                <h1 className="jobpostheadline1stpage">Reach the quality candidates you can't find anywhere else.</h1>
                <div className = "containerjobpostpage1">
                <br></br>
                    <div className ="form-group">
                        <input type="text" placeholder="Company" name="jobpostpage1input-company" className ="form-control jobpostpage1input"/>
                    </div>
                    <div className ="form-group">
                        <input type="text" placeholder="Job title" name="jobpostpage1input-jobtitle" className ="form-control jobpostpage1input"/>
                    </div>
                    <div className ="form-group">
                        <input type="text" placeholder="Job address or city" name="jobpostpage1input-city" className ="form-control jobpostpage1input"/>
                    </div>
                <button class="btn btn-primary nextBtn btn-lg page1jobpostbutton" type="button" ><b>Start job post</b></button>
                </div>
                </div>
                </div>
        </div>
        </div>
    </div>
    <div class="row setup-content" id="step-2">
    <div className="page2background">
        <div class="col-xs-12">
            <div class="col-md-12">
                <div className="jobpostingcontainer">
                    <p className="headlinejobpost"><b>Step 1:</b> What job do you want to post?</p>
                    <div className="jobpostform">
                        <div className = "row">
                            <div className ="form-group">
                                <p className="control-label jobpostrow1label">Company * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Job title * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location *</p>
                                <input type="text" name="company" placeholder="Company" className ="form-control jobpostcompany"/>
                           </div>
                            <div className ="form-group">
                                <input type="text" name="jobtitle" placeholder="Job title" className ="form-control jobposttitle"/>
                            </div>
                            <div className ="form-group">
                                <input type="text" name="jobcity" placeholder="Job address or city" className ="form-control jobpostlocation"/>
                            </div>
                        </div>
                        <br></br>
                        <div className ="form-group">
                            <p className="control-label jobpostrow1label">Job function (Select up to 3) * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Employment type *</p>
                            <input type="text" name="jobfunction" placeholder="Add job function" className ="form-control jobpostfunction"/>
                        </div>
                        <div className ="form-group">
                            <input type="text" name="jobtype" placeholder="Choose one..." className ="form-control jobpostlocation"/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className ="form-group">
                            <p className="control-label jobpostrow1label">Company Industry (Select up to 3) * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Seniority Level *</p>
                            <input type="text" name="companyindustry" placeholder="Add company industry" className ="form-control jobpostfunction"/>
                        </div>
                        <div className ="form-group">
                            <input type="text" name="senioritylevel" placeholder="Choose one..." className ="form-control jobpostlocation"/>
                        </div>
                        <br></br><br></br>
                        <div className ="form-group">
                            <p className="control-label jobpostrow1label">Job description *</p>
                            <input type="text" placeholder="" name="jobdescription" className ="form-control jobpostdescription"/>
                        </div>
                        <br></br><br></br>
                        <p className="control-label jobpostrow1label">How would you like to receive your applicants?</p>
                        <div className ="form-group">
                            <input type="text" placeholder="example@example.com" name="throughlinkedin" className ="form-control jobpostfunction"/>
                        </div>
                        <br></br><br></br>
                        <div className ="form-group">
                            <input type="text" placeholder="http://yourcompany.com/job123" name="directapply" className ="form-control jobpostfunction"/>
                        </div>
                        <br></br><br></br>
                        <div className ="form-group">
                            <p className="control-label jobpostrow1label">How did you hear about us?</p>
                            <input type="text" placeholder="Choose one..." name="jobdescription" className ="form-control jobpostfunction"/>
                        </div>
                    </div>
                    <button class="btn btn-primary nextBtn btn-lg" type="button" >Continue</button>
                </div>
                <div className="postjobtip">  
                <img src = {bulb} className="postjobtipimage"></img>  
                <p><h4>Show your job to the right candidates</h4>
                Include more details such as relevant job functions, industries, and seniority level to help us advertise your job post to qualified candidates and recommend matches for you to reach out to.</p>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="row setup-content" id="step-3">
    <div className="page2background">
    <div class="col-xs-12">
        <div class="col-md-12">
            <div className="jobpostingcontainerlast">
                <p className="headlinejobpost"><b>Step 2:</b> What are the right qualifications and budget for your job?</p>
                <div className="jobpostform">
                        <div className ="form-group">
                            <p className="control-label jobpostrow1label">What are some of the skills needed for this job? *</p>
                            <input type="text" name="skillspostjob" placeholder="Accounting, Business Analysis, Communication, etc.." className ="form-control jobpostfunction"/>
                       </div>
                    <br></br>
                    <br></br>
                    <div className ="form-group">
                        <p className="control-label jobpostrow1label">How many years of relevant experience are you looking for? *</p>
                        <input type="text" name="jobpostexperience" placeholder="1, 2, 3 .. years of experience." className ="form-control jobpostfunction"/>
                    </div>
                   <br></br>
                    <br></br>
                    <div className ="form-group">
                        <p className="control-label jobpostrow1label">What level of education are you looking for? *</p>
                        <input type="text" name="companyindustry" placeholder="Add company industry" className ="form-control jobpostfunction"/>
                    </div>
                    <br></br>
                    <br></br>
                    <div className ="form-group">
                        <p className="control-label jobpostrow1label">Daily Budget? *</p>
                        <input type="text" name="postjobbudget" placeholder="0 $" className ="form-control jobpostfunction"/>
                    </div>
                </div>
                <button class="btn btn-primary btn-lg finishpostjob" type="submit" ><b>Post My Job</b></button>
            </div>
            <div className="postjobtippage3">  
            <img src = {bulb} className="postjobtipimage"></img>  
            <p><h4>Improve the quality of your applications</h4>
            Increase the quality of your candidates by defining your job audience so that you can help us get your job in front of the right people.</p>
            </div>
        </div>
    </div>
    </div>
    </div>
</form>

            </div>
        )
    }
    
}

export default JobPosting;