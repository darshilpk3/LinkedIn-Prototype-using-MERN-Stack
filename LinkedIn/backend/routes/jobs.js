var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users
var Job = require('../models/job')

var redisClient = require('redis').createClient;
var redis1 = redisClient(6379, 'localhost');





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
        required_skills: required_skills
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

//____________________________________redis caching area_________________________________

/*
* caching search route
*/
// router.post("/search", async function (req, res, next) {

//     console.log("\nInside the search request for jobs");
//     console.log("\nRequest obtained is : ");
//     console.log(JSON.stringify(req.body));

//     var searched_job_title = req.body.job_title
//     var searched_job_location = req.body.location

//     //making the regex for the mongo query
//     var splitted = searched_job_title.split(" ");
//     var regex_str = "^(.*";
//     for (let i = 0; i < splitted.length; i++) {
//         regex_str = regex_str + splitted[i] + ".*";
//     }
//     regex_str = regex_str + ")$";

//     Job.find({
//         //   jobTitle : {$regex : regex_str}, 
//         $or: [{ jobTitle: { $regex: regex_str } }, { required_skills: { $regex: regex_str } }],
//         location: searched_job_location
//     })
//         .then((result, err) => {
//             if (err) {
//                 res.writeHead(200, {
//                     'Content-Type': 'application/json'
//                 })
//                 const data = {
//                     "status": 0,
//                     "msg": "No Such Data found",
//                     "info": {
//                         "error": err
//                     }
//                 }
//                 res.end(JSON.stringify(data))
//             } else {
//                 //   console.log("Result obtained after the search query: \n",result)
//                 console.log("Search query executed successfully");
//                 res.writeHead(200, {
//                     'Content-Type': 'application/json'
//                 })
//                 const data = {
//                     "status": 1,
//                     "msg": "Successfully fetched the search results",
//                     "info": {
//                         "result": result
//                     }
//                 }
//                 res.end(JSON.stringify(data))
//             }
//         })
//         .catch(err => {
//             res.writeHead(400, {
//                 'Content-Type': 'application/json'
//             })
//             const data = {
//                 "status": 0,
//                 "msg": "Backend Error",
//                 "info": {
//                     "error": err
//                 }
//             }
//             res.end(JSON.stringify(data))
//         })
// })


getJobsSearch_Caching = function (Job, redis1, userID, callback) {
    console.log("_________userID________", userID);

    var searched_job_title = userID.job_title
    var searched_job_location = userID.location
    // console.log("_____________job title________", searched_job_title)

    //making the regex for the mongo query
    var splitted = searched_job_title.split(" ");
    var regex_str = "^(.*";
    for (let i = 0; i < splitted.length; i++) {
        regex_str = regex_str + splitted[i] + ".*";
    }
    regex_str = regex_str + ")$";

    const key = searched_job_location + searched_job_title
    console.log("_______________key_________________--",key)
    // redis1.hmget('offers',userID,function (err, reply) {
    redis1.get(key, function (err, reply) {

        if (err) callback(null);
        else if (reply) {
            console.log("___________________________from cache_______________________________")
            callback(JSON.parse(reply));
        } //user exists in cache

        else {
            //user doesn't exist in cache - we need to query the main database
            // const userID = req.params.userID

            Job.find({
                //   jobTitle : {$regex : regex_str}, 
                $or: [{ jobTitle: { $regex: regex_str } }, { required_skills: { $regex: regex_str } }],
                location: searched_job_location
            })
                .then((result, err) => {
                    if (err) {
                        // res.writeHead(200, {
                        //     'Content-Type': 'application/json'
                        // })
                        const data = {
                            "status": 0,
                            "msg": "No Such Data found",
                            "info": {
                                "error": err
                            }
                        }
                        callback(data);
                        // res.end(JSON.stringify(data))
                    } else {
                        //   console.log("Result obtained after the search query: \n",result)
                        console.log("Search query executed successfully");
                        // res.writeHead(200, {
                        //     'Content-Type': 'application/json'
                        // })
                        // console.log("**************result*************", result);
                        const data = {
                            "status": 1,
                            "msg": "Successfully fetched the search results",
                            "info": {
                                "result": result
                            }
                        }
                        // res.end(JSON.stringify(data))

                        // console.log("`````````````````````````````````userID", userID)
                        // console.log("`````````````````````````````````data", data)
                        const key = searched_job_location + searched_job_title
                        console.log("~~~~~~~~~~~~key~~~~~~~~~~~~~~~`````", key)

                        //redis1.hmset('offers',userID,JSON.stringify(data), function () {
                        redis1.set(key, JSON.stringify(data), function () {

                            console.log("_____________setting in cache_________________ ")
                            callback(data);
                        });



                    }
                })
                .catch(err => {
                    // res.writeHead(400, {
                    //     'Content-Type': 'application/json'
                    // })
                    // const data = {
                    //     "status": 0,
                    //     "msg": "Backend Error",
                    //     "info": {
                    //         "error": err
                    //     }
                    // }
                    // res.end(JSON.stringify(data))

                    callback(null);

                })




            // try {
            //     UserInfo.findById(userID)
            //         .populate('jobs_posted')
            //         .exec()
            //         .then(result => {
            //             console.log("The received result is : ", result);
            //             // res.writeHead(200, {
            //             //   'Content-Type': 'application/json'
            //             // })
            //             const data = {
            //                 "status": 1,
            //                 "msg": "Successfully obtained Job List",
            //                 "info": result
            //             }
            //             // res.end(JSON.stringify(data))

            //             redis1.set(userID, JSON.stringify(data), function () {
            //                 console.log("_____________setting in cache_________________ ")
            //                 callback(data);
            //             });
            //         })
            //         .catch(err => {
            //             // res.writeHead(200, {
            //             //   'Content-Type': 'application/json'
            //             // })
            //             const data = {
            //                 "status": 0,
            //                 "msg": "No Such User",
            //                 "info": {
            //                     "error": err
            //                 }
            //             }
            //             // res.end(JSON.stringify(data))
            //             callback(data);
            //         })
            // } catch (error) {
            //     // res.writeHead(400, {
            //     //   'Content-Type': 'application/json'
            //     // })
            //     // const data = {
            //     //   "status": 0,
            //     //   "msg": error,
            //     //   "info": {
            //     //     "error": error
            //     //   }
            //     // }
            //     // res.end(JSON.stringify(data))
            //     callback(null);
            // }





            
        }
    });
};



router.post("/search", async function (req, res, next) {

    console.log("\nInside the search request for jobs");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body));

    var searched_job_title = req.body.job_title
    var searched_job_location = req.body.location

    //making the regex for the mongo query
    var splitted = searched_job_title.split(" ");
    var regex_str = "^(.*";
    for (let i = 0; i < splitted.length; i++) {
        regex_str = regex_str + splitted[i] + ".*";
    }
    regex_str = regex_str + ")$";

    if (!req.body) {
        // res.status(400).send("Please send a proper userID");
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        const data = {
            "status": 0,
            "msg": "No Such Data Found",
            "info": {
                "error": err
            }
        }
        res.end(JSON.stringify(data))
    }
    else {
        getJobsSearch_Caching(Job, redis1, req.body, function (book) {
            if (!req.body) {
                res.status(500).send("Server error");
            }
            else {
                // res.status(200).send(book);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                // console.log("__________book________________-", book)
                // const data = {
                //   "status": 1,
                //   "msg": "Successfully obtained Job List",
                //   "info": book
                // }
                res.end(JSON.stringify(book))

            }
        });
    }




    // Job.find({
    //     //   jobTitle : {$regex : regex_str}, 
    //     $or: [{ jobTitle: { $regex: regex_str } }, { required_skills: { $regex: regex_str } }],
    //     location: searched_job_location
    // })
    //     .then((result, err) => {
    //         if (err) {
    //             res.writeHead(200, {
    //                 'Content-Type': 'application/json'
    //             })
    //             const data = {
    //                 "status": 0,
    //                 "msg": "No Such Data found",
    //                 "info": {
    //                     "error": err
    //                 }
    //             }
    //             res.end(JSON.stringify(data))
    //         } else {
    //             //   console.log("Result obtained after the search query: \n",result)
    //             console.log("Search query executed successfully");
    //             res.writeHead(200, {
    //                 'Content-Type': 'application/json'
    //             })
    //             const data = {
    //                 "status": 1,
    //                 "msg": "Successfully fetched the search results",
    //                 "info": {
    //                     "result": result
    //                 }
    //             }
    //             res.end(JSON.stringify(data))
    //         }
    //     })
    //     .catch(err => {
    //         res.writeHead(400, {
    //             'Content-Type': 'application/json'
    //         })
    //         const data = {
    //             "status": 0,
    //             "msg": "Backend Error",
    //             "info": {
    //                 "error": err
    //             }
    //         }
    //         res.end(JSON.stringify(data))
    //     })



});









//____________________________________redis caching area ending___________________________




router.put("/:jobId", async function (req, res, next) {
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
            $set: {
                jobTitle: job_title,
                description: job_description,
                industry: job_industry,
                employmentType: employment_type,
                location: job_location,
                jobFunction: job_function,
                companyLogo: company_logo
            }
        }
    )
        .exec()
        .then((result, err) => {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                const data = {
                    "status": 0,
                    "msg": "No Such Data found",
                    "info": {
                        "error": err
                    }
                }
                res.end(JSON.stringify(data))
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                console.log("\nJob details updated successfully");
                const data = {
                    "status": 1,
                    "msg": "Successfully updated the job details",
                    "info": {
                        "result": result
                    }
                }
                res.end(JSON.stringify(data))
            }
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Backend Error",
                "info": {
                    "error": err
                }
            }
            res.end(JSON.stringify(data))
        })
})

module.exports = router;
