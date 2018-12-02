var UserInfo = require('../../../backend/models/userInfo').users
var Application = require('../../../backend/models/application')
var Job = require('../../../backend/models/job')
var Message = require('../../../backend/models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for fetching saved jobs")
    console.log("\n\n User data is: ", msg)

    Job.find({
        jobApplied: msg.userId
    })
    .populate('postedBy')
    .exec()
        .then(result => {
            callback(null,result)
        })
        .catch(err => {
            callback(err,err)
        })
}


exports.handle_request = handle_request;