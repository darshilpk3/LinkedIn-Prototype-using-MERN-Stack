var UserInfo = require('../../models/userInfo').users
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for fetching jobs ")
    console.log("\n\n User data is: ", msg)

    console.log(Job)
    Job.find({
        postedBy: msg.userId
    }).exec()
        .then(result => {
            // console.log("\nSending the result");
            callback(null,result)
        })
        .catch(err => {
            console.log("\nSome error occured");
            callback(err, "Some error occured")
        })
}


exports.handle_request = handle_request;