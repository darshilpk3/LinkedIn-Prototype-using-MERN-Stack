import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../styles/jobposting.css'
import Stepper from 'react-stepper-horizontal'
import noJobsImage from '../assets/images/NoJobListings.PNG'
import gifticon from '../assets/images/gift-icon.png'
import {ROOT_URL} from '../constants/constants';


class JobApplicantsList extends Component{

    constructor(props){
        super(props);
        this.state={
            information : []
        }
    }

    componentDidMount(){ 

        const job_id = this.props.location.state.job_id

        axios.defaults.withCredentials = true;
        // axios.get(`${ROOT_URL}/job/5c0315515e24fc5d383ac47e/applications`)
        axios.get(`${ROOT_URL}/job/`+job_id+`/applications`)
            .then((response) => {
                console.log("Response received from backend");
                // console.log("\nPrinting the response body");
                // console.log(response.data);
                if(response.data.status==1)
                {
                    this.setState({
                        information : response.data.info
                    })
                }
                else{
                    console.log("Some error occured in the query execution");
                    // alert("Some error occured!");
                }
                
            });

    }

    render(){
        require('../styles/jobApplicantsList.css');

        console.log(" ---- Printing this.state.information ----");
        console.log(this.state.information);

        let noApplicantsDisplay = null;
        let ApplicantsDisplay = null;
        if(this.state.information.length==0)
        {
            noApplicantsDisplay = (
                <div class="center">
                <br/><br/>
                    <center>
                        <img src= {noJobsImage}></img>
                        <br></br>
                        <p class="para">No applicants have applied yet</p>
                    </center>
                </div>
            )
        }

        else if(this.state.information.length>0){
            
            ApplicantsDisplay = this.state.information.map(applist => {
                return(
                    <div>
                        <div class="job-listing">
                            <Link class = "joblisttitle" to={{ pathname: '/', state: { applicant_id: applist.applicant._id} }}>{applist.applicant[0].fname} {applist.applicant[0].lname}</Link>
                            <p class="paragraph1">Email id : {applist.applicant[0].email}</p>
                            <p class="paragraph">Ethnicity : {applist.ethnicity}</p>
                            <p class="paragraph">Disabled : {applist.isDisabled.toString()}</p>
                            <p class = "paragraph">Resume : </p>
                        </div>
                        <hr class="linebreak"></hr>
                    </div>
                )
            })
        }

        return(
            <div>
                <div class="row" id="mainbody">
                    <div class="container left-content">
                        <br/>
                        <p class="title">&nbsp;&nbsp;&nbsp;Applicants</p>
                        <hr class="linebreak"></hr>                        
                        {noApplicantsDisplay}
                        {ApplicantsDisplay}
                        <br/><br/>
                    </div>
                </div>
            </div>
        )
    }

}

export default JobApplicantsList;