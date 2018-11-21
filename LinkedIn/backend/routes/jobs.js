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

    const newJob = new Job({
        posted_by: posted_by,
        jobTitle: jobTitle,
        description: description,
        industry: industry,
        employmentType: employmentType,
        postedDate: postedDate,
        location: location,
        jobFunction: jobFunction
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

module.exports = router;
