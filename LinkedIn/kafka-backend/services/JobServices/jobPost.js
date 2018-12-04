// var UserInfo = require('../../../backend/models/userInfo').users
var UserInfo = require('../../models/userInfo').users

var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for posting job")
    console.log("\n\n User data is: ", msg)

    const newJob = new Job({
        postedBy: msg.postedBy,
        jobTitle: msg.jobTitle,
        description: msg.description,
        industry: msg.industry,
        employmentType: msg.employmentType,
        postedDate: msg.postedDate,
        location: msg.location,
        jobFunction: msg.jobFunction,
        required_skills: msg.required_skills,
        noOfViews:0

    })

    // console.log("__________new Job is_______________",newJob)

    newJob.save()
        .then((jobResult, err) => {
            if (err) {
                console.log("____________err_____________",err)
                callback(err, err)
            } else {
                console.log("Job posted: ", jobResult)
                UserInfo.findByIdAndUpdate(msg.postedBy, {
                    $push: {
                        jobs_posted: jobResult._id
                    }
                }).exec()
                    .then(userResult => {
                        callback(null, userResult)
                    })
                    .catch(err => {
                        callback(err,err)
                    })
            }
        })
        .catch(err => {
            callback(err, err)
        })
}


exports.handle_request = handle_request;