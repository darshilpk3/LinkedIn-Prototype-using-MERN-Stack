var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')
var mongoose = require('mongoose');

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for applying a job")
    console.log("\n\n User data is: ", msg)

    var application = new Application({
        applicant: msg.userId,
        job: msg.jobId,
        howDidYouHear: msg.howDidYouHear,
        isDisabled: msg.isDisabled,
        resume: msg.resume,
        ethnicity: msg.ethnicity,
        sponsership: msg.sponsership
    })
    var id = mongoose.mongo.ObjectID(msg.userId)
    var j_id = mongoose.mongo.ObjectID(msg.jobId)

    UserInfo.find({
        $or: [
            {
                $and: [
                    { _id: id }, { jobs_applied: j_id }
                ]
            },
            {
                $and: [
                    { _id: id }, { jobs_posted: j_id }
                ]
            }
        ]
    }).exec()
        .then(result => {
            if (result.length != 0) {
                callback(null, "Cannot Apply to this job. Either already applied or you are the recruiter")
            } else {
                application.save()
                    .then((applicationResult, err) => {
                        if (err) {
                            callback(err, err)
                        } else {
                            Job.findByIdAndUpdate(msg.jobId,
                                {
                                    $push: {
                                        applications: applicationResult._id,
                                        jobApplied: msg.userId,
                                    },
                                    $pull: {
                                        jobSaved: id
                                    },
                                    $inc: { noOfViews_submitted: 1 }
                                }).exec()
                                .then(jobResult => {
                                    console.log("____________jobresult_________", jobResult)
                                    UserInfo.findByIdAndUpdate(msg.userId, {
                                        $push: {
                                            jobs_applied: msg.jobId,
                                            applications: applicationResult._id
                                        },
                                        $pull: {
                                            jobs_saved: j_id
                                        }
                                    }).exec()
                                        .then(userResult => {
                                            callback(null, "Success")
                                        })
                                        .catch(err => {
                                            callback(err, err)
                                        })
                                })
                                .catch(err => {
                                    callback(err, err)
                                })
                        }
                    })
                    .catch(err => {
                        callback(err, err)
                    })
            }
        })

}


exports.handle_request = handle_request;