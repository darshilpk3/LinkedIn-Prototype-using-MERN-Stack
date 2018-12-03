var UserInfo = require('../models/userInfo');
var Job = require('../models/job')
var { mongoose } = require('../connections/mongo');

var redisClient = require('redis').createClient;
var redis1 = redisClient(6379, 'localhost');
//var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for get job list request");
    console.log("Inside get joblist. og ");
    let userID = msg.userID; 
  
    if (!userID) {
        callback(err,"Error no userid1");
    
    }
    else {
      getAllJobsPostedByUser_Caching(UserInfo, redis1, userID, function (user_data) {
        if (!userID) {
        //   res.status(500).send("Server error");
            callback(err,"Error no userid 2");
        }
        else {
           // console.log("The received result is : ", user_data);

            const data = {
                "status": 1,
                "msg": "Successfully obtained Job List",
                "info": user_data
            }

            callback(data, data);
       
        }
      });
    }
}

getAllJobsPostedByUser_Caching = function (UserInfo, redis1, userID, callback) {
    redis1.get(userID, function (err, reply) {
      if (err) callback(null);
      else if (reply) {
        console.log("___________________________from cache_______________________________")
        callback(JSON.parse(reply));
      } //user exists in cache
  
      else {
        //user doesn't exist in cache - we need to query the main database
        // const userID = req.params.userID
  
        try {
          UserInfo.findById(userID)
            .populate('jobs_posted')
            .exec()
            .then(result => {
              //console.log("The received result is : ", result);
              // res.writeHead(200, {
              //   'Content-Type': 'application/json'
              // })
              const data = {
                "status": 1,
                "msg": "Successfully obtained Job List",
                "info": result
              }
              // res.end(JSON.stringify(data))
  
              redis1.set(userID, JSON.stringify(data), function () {
                console.log("_____________setting in cache_________________ ")
                callback(data);
              });
            })
            .catch(err => {
              const data = {
                "status": 0,
                "msg": "No Such User",
                "info": {
                  "error": err
                }
              } 
              callback(data);
            })
        } catch (error) {
          callback(null);
        }
      }
    });
  };
  
exports.handle_request = handle_request;