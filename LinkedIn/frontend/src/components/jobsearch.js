import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import "../styles/jobsearch.css";
import Login from './navbar'

class JobSearch extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.searchResultsHandler = this.searchResultsHandler.bind(this);
    this.handleJobTitle = this.handleJobTitle.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.state = {
        redirectToJobResultsPage: false
    }
  }

  searchResultsHandler = (e) => {
    var data = {
        jobTitle : this.state.jobTitle,
        location : this.state.location
    }
    console.log("Inside search results")

    this.props.saveSearchFieldToStore(data);
    this.setState({
        redirectToJobResultsPage : true
      });
       
}

    handleJobTitle = (e) => {
        this.setState({
            jobTitle : e.target.value
        })
    }

    handleLocation = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    render(){
        var redirectVar = null;
        console.log(this.state.redirectToJobResultsPage)
        if(this.state.redirectToJobResultsPage == true){
          redirectVar = <Redirect to="/jobs/results"/>
        }
        return(
            <div>
                {redirectVar}
                <Login/>
                      <div className="jobs-landing-header-container pad-top-1-pc">
                       <form>
                            <input type = "text" onChange = {this.handleJobTitle} className = "jobs" placeholder = "Search Jobs"></input>
                            &nbsp;&nbsp;
                            
                            <input type = "text" onChange = {this.handleLocation} className = "location" placeholder = "Search Location"></input>
                            &nbsp;&nbsp;
                            <button onClick={this.searchResultsHandler} className="btn btn-outline-default white-outline btn-md searchbox-submit" type="button">
                            Search
                            </button>
                      </form>
                   </div>

                  

                   <div className = "jobs-landing-main-bg">

                        <div className="row mt-3 pull-center-1 pull-center-2">
                                    
                            <div className="jobs-landing-bar-container ">
                              <div className= "links-to-savedandapplied">
                                    <span className="pad-1-pc">5 Saved Jobs &nbsp;&nbsp; | &nbsp;&nbsp;</span>
                                    <span className="pad-2-pc">10 Applied Jobs &nbsp;&nbsp; | &nbsp;&nbsp;</span>
                                    <span className="pad-3-pc">Career Interests</span>
                                    <span className="pad-6-pc">LinkedIn Salary  &nbsp;&nbsp; | &nbsp;&nbsp;</span>
                                    <span className="pad-8-pc">Looking for talent? &nbsp;&nbsp;</span>
                                    <span className="pad-3-pc"><button class="btn linkedin-post-job" type="submit"><b>Post a Job</b></button></span>
                                  </div>

                            </div>                
                        </div>

        <div class="album py-5 bg-light">
        <div class="container-jobsearch">

        
            <h4 className="JobsInterestedJobSearch">Jobs you may be interested in</h4>
          <b style={{'margin-left':'2%'}}>Because you viewed</b>
          <p style={{'margin-left':'2%'}}>Machine Learning Intern at Adobe</p>
        <div class="row jobsearchrow">
        <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Scientist Summer Intern</b></p>
              <p>WeWork</p>
              <p>New York, NY, US</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">3 days ago</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Engineer</b></p>
              <p>Amazon Lab126</p>
              <p>Sunnyvale, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">6 days ago</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Machine Learning Scientist Intern</b></p>
              <p>Adobe</p>
              <p>San Francisco, CA, US</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">7 days ago</small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-3" style={{'margin-bottom':'4%'}}>
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Modeler</b></p>
              <p>Nisum</p>
              <p>San Francisco, California</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">3 days ago</small>
                </div>
              </div>
            </div>
          </div>
          <b style={{'margin-top':'2%'}}>Based on your Profile and Career interests</b>
          <p style={{'margin-bottom':'4%'}}>Any job title • Any location • Any industry • 0 to 10,000+ employees ... Update Career interests</p>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Quality Analyst</b></p>
              <p>Butch Works</p>
              <p>Redwood City, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">1 week ago</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Android Developer</b></p>
              <p>Guidebook Inc.</p>
              <p>San Jose, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">3 weeks ago</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Software Developer</b></p>
              <p>Amiseq Inc.</p>
              <p>San Bruno, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">1 day ago</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Engineering Intern</b></p>
              <p>Esurance</p>
              <p>San Francisco, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">2 weeks ago</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

      
                  
          </div>

          </div>
       
    // </div>
  );
}
}


//mapStateToProps

const mapStateToProps  = state =>({
    saveSearchFieldToStore : state.jobSearchFieldsStateStore
  });
  
  
//export default JobsLandingPage;
export default connect(mapStateToProps, {})(JobSearch);