var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users
var Job = require('../models/job')
var Application = require('../models/application')
var kafka = require('../kafka/client')

router.post("/", async function (req, res, next) {

    const data = {
        postedBy: req.body.postedBy,
        jobTitle: req.body.jobTitle,
        description: req.body.description,
        industry: req.body.industry,
        employmentType: req.body.employmentType,
        postedDate: req.body.postedDate,
        location: req.body.location,
        jobFunction: req.body.jobFunction,
        required_skills: req.body.required_skills
    }

    kafka.make_request('jobPost',data,function(err,result){
        if(err){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Posting of job failed",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        }else if(result && (result.message || result.errmsg)){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Posting of job failed",
                "info": {
                    "error": result.message
                }
            }
            res.end(JSON.stringify(data))
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Job successfully posted",
                "info": {
                    "result": result
                }
            }
            res.end(JSON.stringify(data))
        }
    })
})


router.get("/:jobId", async function (req, res, next) {
    console.log("Inside get joblist.")
    
    const data = {
        jobId: req.params.jobId
    }

    kafka.make_request('getJobDetails',data,function(err, result){
        if(err){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Couldn't fetch job details",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        }else if(result && (result.message || result.errmsg)){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Couldn't fetch job details",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Job details successfully fetched",
                "info": {
                    "result": result
                }
            }
            res.end(JSON.stringify(data))
        }
    })
})

router.post("/search", async function (req, res, next) {

    console.log("\nInside the search request for jobs");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body));

    const data = {
    searched_job_title : req.body.job_title,
    searched_job_location : req.body.location
    }
    
    kafka.make_request("jobSearch",data,function(err,result){
        if(err){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Couldn't search for job details provided",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        }else if(result && (result.message || result.errmsg)){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Couldn't search for job details provided",
                "info": {
                    "error": result.message
                }
            }
            res.end(JSON.stringify(data))
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Job Search Successfull",
                "info": {
                    "result": result
                }
            }
            res.end(JSON.stringify(data))   
        }
    })

    //making the regex for the mongo query
})

router.put("/:jobId", async function (req, res, next) {
    console.log("\nInside the edit request for jobs");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body));

    const data = {
        setJobId : req.params.jobId,
        job_title : req.body.jobTitle,
        job_description : req.body.description,
        job_industry : req.body.industry,
        employment_type : req.body.employmentType,
        job_location : req.body.location,
        job_function : req.body.jobFunction,
        company_logo : req.body.companyLogo
    }
    

    kafka.make_request('editJobDetails',data,function(err,result){
        if(err){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Couldn't edit job details provided",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        }else if(result && (result.message || result.errmsg)){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Couldn't edit job details provided",
                "info": {
                    "error": result.message
                }
            }
            res.end(JSON.stringify(data))
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Job successfully updated",
                "info": {
                    "result": result
                }
            }
            res.end(JSON.stringify(data))   
        }
    })
})


router.get("/:jobId/applications",async function(req,res,next){
    console.log("Getting all the applications for jobId: ",req.params.jobId)
    
    const data = {
        jobId: req.params.jobId
    }

    Application.find({
        job: data.jobId
    })
    //.populate('job')
    .populate('applicant')
    .exec()
        .then(result => {
            res.send(200,result)
        })
        .catch(err =>{
            res.send(400,err)
        })
})


module.exports = router;
