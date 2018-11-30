var UserInfo = require('../../models/userInfo').users
var Application = require('../../models/application')
var Job = require('../../models/job')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for applying a job")
    console.log("\n\n User data is: ", msg)

    var application = new Application({
        applicant: msg.userId,
        job: msg.jobId,
        howDidYouHear: msg.howDidYouHear,
        isDisabled: msg.isDisabled,
        resume: msg.resume,
        ethnicity: msg.ethnicity
    })

    application.save()
        .then((applicationResult, err) => {
            if (err) {
                callback(err, err)
            } else {
                Job.findByIdAndUpdate(msg.jobId, {
                    $push: {
                        applications: applicationResult._id
                    }
                }).exec()
                    .then(jobResult => {
                        UserInfo.findByIdAndUpdate(msg.userId, {
                            $push: {
                                jobs_applied: msg.jobId
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


exports.handle_request = handle_request;