var UserInfo = require('../../models/userInfo').users
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for getting job details")
    console.log("\n\n User data is-msg: ", msg)
    console.log("\n\n User data is-jobid: ", msg.jobID)

    Job.findById(msg.jobId)
    .populate('postedBy')
    .populate('applications')
    .populate('jobSaved')
    .exec()
        .then(result => {
            console.log(result);
            callback(null,result)
        })
        .catch(err => {
            console.log(err);
            callback(err,err)
        })
    
}
exports.handle_request = handle_request;