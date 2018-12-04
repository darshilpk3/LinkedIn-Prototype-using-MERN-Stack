var UserInfo = require('../../models/userInfo').users
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for saving a job")
    console.log("\n\n User data is: ", msg)

    Job.find({
        _id: msg.jobId,
        jobSaved: msg.userId
    }).exec()
        .then(checkResult => {
            console.log("length of result: ", checkResult.length)
            if (checkResult.length == 0) {
                Job.findByIdAndUpdate(msg.jobId, {
                    $push: {
                        jobSaved: msg.userId
                    }
                }).exec()
                    .then(jobResult => {
                        UserInfo.findByIdAndUpdate(msg.userId, {
                            $push: {
                                jobs_saved: msg.jobId
                            }
                        }).exec()
                            .then(userResult => {
                                callback(null, "Successfull saved a job")
                            })
                            .catch(err => {
                                callback(err, err)
                            })
                    })
                    .catch(err => {
                        callback(err, err)
                    })
            } else {
                callback(null, "Already saved a job")
            }
        })
        .catch(err => {
            callback(err, err)
        })

}


exports.handle_request = handle_request;