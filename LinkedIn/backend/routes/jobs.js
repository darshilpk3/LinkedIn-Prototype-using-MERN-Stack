var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users
var Job = require('../models/job')


router.post("/", async function (req, res, next) {
    const posted_by = req.body.posted_by
    const jobTitle = req.body.jobTitle
    const description = req.body.description
    const industry = req.body.industry
    const employmentType = req.body.employmentType
    const postedDate = req.body.postedDate
    const location = req.body.location
    const jobFunction = req.body.jobFunction
    const required_skills = req.body.required_skills

    const newJob = new Job({
        posted_by: posted_by,
        jobTitle: jobTitle,
        description: description,
        industry: industry,
        employmentType: employmentType,
        postedDate: postedDate,
        location: location,
        jobFunction: jobFunction,
        required_skills : required_skills
    })
    newJob.save()
        .then((jobResult, err) => {
            if (err) {
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
            } else {
                console.log("Job posted: ", jobResult)
                //console.log("UserId to be searched ",posted_by)
                UserInfo.findByIdAndUpdate(posted_by, {
                    $push: {
                        jobs_posted: jobResult._id
                    }
                }).exec()
                    .then(userResult => {
                        console.log("User Updated ", userResult)
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 1,
                            "msg": "Successfully posted a job",
                            "info": {
                                "jobResult": jobResult
                            }
                        }
                        res.end(JSON.stringify(data))
                    })
            }

        })
        .catch(err => {
            console.log("Job posted has error: ", err)
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Server Error",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        })
})

router.get("/:jobID", async function (req, res, next) {
    console.log("Inside get joblist.")
    const jobID = req.params.jobID

    Job.find({ "_id": jobID })
        .exec()
        .then(result => {
            console.log("The received result is : ", result);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Successfully got job details",
                "info": result
            }
            res.end(JSON.stringify(data))
        })
        .catch(err => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "No Such User",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        })
})

router.post("/search", async function(req, res, next){

    console.log("\nInside the search request for jobs");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body));

    var searched_job_title = req.body.job_title
    var searched_job_location = req.body.location

    //making the regex for the mongo query
    var splitted = searched_job_title.split(" ");
    var regex_str = "^(.*";
    for(let i=0;i<splitted.length;i++)
    {
        regex_str = regex_str + splitted[i] + ".*";
    }
    regex_str = regex_str + ")$";

    Job.find({
    //   jobTitle : {$regex : regex_str}, 
      $or : [ {jobTitle : {$regex : regex_str}}, {required_skills : {$regex : regex_str}} ],    
      location : searched_job_location
    })
    .then((result,err) => {
        if(err){
          res.writeHead(200,{
            'Content-Type':'application/json'
          })
          const data = {
            "status":0,
            "msg":"No Such Data found",
            "info": {
              "error":err
            }
          }
          res.end(JSON.stringify(data))  
        }else{
        //   console.log("Result obtained after the search query: \n",result)
          console.log("Search query executed successfully");
          res.writeHead(200,{
            'Content-Type':'application/json'
          })
          const data = {
            "status":1,
            "msg":"Successfully fetched the search results",
            "info": {
              "result":result
            }
          }
          res.end(JSON.stringify(data))
        }
    })
    .catch(err => {
        res.writeHead(400,{
          'Content-Type':'application/json'
        })
        const data = {
          "status":0,
          "msg":"Backend Error",
          "info": {
            "error":err
          } 
        }
        res.end(JSON.stringify(data))
    })
})

router.put("/:jobId", async function(req, res, next){
    console.log("\nInside the edit request for jobs");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body));

    var setJobId = req.params.jobId

    var job_title = req.body.jobTitle
    var job_description = req.body.description
    var job_industry = req.body.industry
    var employment_type = req.body.employmentType
    var job_location = req.body.location
    var job_function = req.body.jobFunction
    var company_logo = req.body.companyLogo

    Job.findByIdAndUpdate(setJobId,
        {
          $set:{
            jobTitle: job_title,
            description : job_description,
            industry : job_industry,
            employmentType : employment_type,
            location : job_location,
            jobFunction : job_function,
            companyLogo : company_logo
          }
        }
    )
    .exec()
    .then((result,err) => {
        if(err){
          res.writeHead(200,{
            'Content-Type':'application/json'
          })
          const data = {
            "status":0,
            "msg":"No Such Data found",
            "info": {
              "error":err
            }
          }
          res.end(JSON.stringify(data))  
        }else{
          res.writeHead(200,{
            'Content-Type':'application/json'
          })
          console.log("\nJob details updated successfully");
          const data = {
            "status":1,
            "msg":"Successfully updated the job details",
            "info": {
              "result":result
            }
          }
          res.end(JSON.stringify(data))
        }
    })
    .catch(err => {
        res.writeHead(400,{
          'Content-Type':'application/json'
        })
        const data = {
          "status":0,
          "msg":"Backend Error",
          "info": {
            "error":err
          } 
        }
        res.end(JSON.stringify(data))
    })
})
module.exports = router;
