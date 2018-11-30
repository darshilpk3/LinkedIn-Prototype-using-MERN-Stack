var UserInfo = require('../models/userInfo').users;
var Job = require('../models/job')
var { mongoose } = require('../connections/mongo');
//var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
function handle_request(msg, callback) {
   console.log("\n\nInside kafka backend for get job list request")
   let userID = msg.userID;
   console.log("\nUserID: " + userID);
   UserInfo.findById(userID)
       .populate('jobs_posted')
       .exec()
       .then(result => {
           console.log("The received result is : ", result.skills);
           const data = {
               "status": 1,
               "msg": "Successfully obtained Job List",
               "info": result.skills
           }
           callback(data, data);
       })
       .catch(err => {
           console.log("This is an error-----" + err);
           callback(err, "Error");
       })
}
exports.handle_request = handle_request;

