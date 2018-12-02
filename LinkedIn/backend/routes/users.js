var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
var mongoose = require('mongoose');
var kafka = require('../kafka/client')


//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users
var Job = require('../models/job')
/* User Sign up */
router.post('/', async function (req, res, next) {

  console.log('\n\nIn user signup');
  console.log("Request Got: ", req.body)
  const email = req.body.email
  const pwd = bcrypt.hashSync(req.body.pwd, 10)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const type = req.body.type

  pool.getConnection((
    err, connection) => {
    if (connection) {
      console.log("Connection obtained")
      const sql = `insert into userinfo(email,pwd,firstName,lastName,type) values(${mysql.escape(email)},${mysql.escape(pwd)},${mysql.escape(firstName)},${mysql.escape(lastName)},${mysql.escape(type)})`
      connection.query(sql,
        (err, result) => {
          if (result) {
            console.log("Successfully registered")

            //mongo query here
            var user = new UserInfo({
              fname: firstName,
              lname: lastName,
              type: type,
              email: email,
              password: pwd
            })
            console.log(`user ${user}`);
            user.save().then(user => {
              console.log("user created in mongo");
              // console.log(`user in then is ${user}`);

              res.writeHead(200, {
                'Content-Type': 'application/json'
              })
              const data = {
                "status": 1,
                "msg": "Successfully Signed Up",
                "info": {
                  "id": result.insertId,
                  "fullname": firstName + " " + lastName,
                  "type": type,
                  "email": email
                }
              }
              console.log("data being sent to frontend:\n", JSON.stringify(data))
              res.end(JSON.stringify(data))


            }, (err) => {
              console.log("__________err___________", err)
              console.log(`Signup Failed in mongo`);
              console.log("User already exists ", err.sqlMessage)
              res.writeHead(200, {
                'Content-Type': 'application/json'
              })
              const data = {
                "status": 0,
                "msg": err.sqlMessage,
                "info": {
                  "error": err.sqlMessage
                }
              }
              console.log("data being sent to frontend:\n", JSON.stringify(data))
              res.end(JSON.stringify(data))


            })

          } else if (err) {
            console.log("User already exists ", err.sqlMessage)
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            const data = {
              "status": 0,
              "msg": "User already exists",
              "info": {
                "error": err.sqlMessage
              }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
          }
        })
    } else {
      console.log("Connection Refused ", err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Connection Refused")
    }

  })

});

/* User Login */
router.post('/login', async function (req, res, next) {

  console.log('\n\nIn user login');
  console.log("Request Got: ", req.body)
  const email = req.body.email
  const pwd = req.body.pwd;

  pool.getConnection((
    err, connection) => {
    if (connection) {
      console.log("Connection obtained for Login")
      const sql = "select * from userinfo WHERE email = " + mysql.escape(email);
      connection.query(sql,
        (err, result) => {
          const password = bcrypt.compareSync(pwd, result[0].pwd);
          if (result && password) {
            console.log("Successfully Logged In")
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            const data = {
              "status": 1,
              "msg": "Successfully Logged In",
              "info": {
                "fullname": result[0].firstName + " " + result[0].lastName,
                "email": email,
                "type": result[0].type
              }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
          } else if (err) {
            console.log("Some error in sql query", err.sqlMessage)
            res.writeHead(400, {
              'Content-Type': 'application/json'
            })

            res.end("some error in sql query")
          } else {
            //password doesn't match
            console.log("Password doesn't match!")
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            const data = {
              "status": 0,
              "msg": "Error in login,Incorrect  password",
              "info": {}
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))

          }
        })
    } else {
      console.log("Connection Refused ", err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Connection Refused")
    }
  })
});
////////////////////////ADDED BY DEVU////////////////////////////////
router.delete("/:userID", async function (req, res, next) {
  console.log('\n\nIn user Delete');
  console.log("Request Got: ", req.body);


  const email = req.body.email;
  const userID = req.params.userID;

  pool.getConnection((
    err, connection) => {
    if (connection) {
      console.log("Connection obtained")
      const sql = "DELETE FROM userinfo WHERE email=" + mysql.escape(email);
      console.log("\nSQL QUERY: " + sql);
      connection.query(sql,
        (err, result) => {
          if (result) {
            console.log("Successfully deleted from MySQL");
            //mongo query here
            try {
              UserInfo.deleteOne({ "_id": userID })
                .exec()
                .then(result => {
                  console.log("\nSuccessfully deleted from MongoDB");

                  res.writeHead(200, {
                    'Content-Type': 'application/json'
                  })
                  const data = {
                    "status": 1,
                    "msg": "Successfully deleted",
                    "info": result
                  }
                  res.end(JSON.stringify(data))
                })
                .catch(err => {
                  console.log("\nNo Such User");
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
            } catch (error) {
              console.log("\nError in query.");

              res.writeHead(400, {
                'Content-Type': 'application/json'
              })
              const data = {
                "status": 0,
                "msg": error,
                "info": {
                  "error": error
                }
              }
              res.end(JSON.stringify(data))
            }

          } else if (err) {
            console.log("User already exists ", err.sqlMessage)
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            const data = {
              "status": 0,
              "msg": "User already exists",
              "info": {
                "error": err.sqlMessage
              }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
          }
        })
    } else {
      console.log("Connection Refused ", err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Connection Refused")
    }

  })

});

router.post("/:userID/apply", async function (req, res, next) {
  console.log("Inside post apply of job.")

  const data = {
    userId: req.params.userID,
    jobId: req.body.jobId,
    howDidyouHear: req.body.howDidyouHear,
    isDisabled: req.body.isDisabled,
    resume: req.body.resume,
    ethnicity: req.body.ethnicity
  }

  kafka.make_request("userJobApply", data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Error while applying to job",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully applied to a job",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})

router.post("/:userID/save", async function (req, res, next) {
  console.log("Inside post of job save.")

  const data = {
    jobId: req.body.jobId,
    userId: req.params.userID
  }


  kafka.make_request('userJobSave', data, function (err, result) {
    console.log(err && err)
    console.log(result && result)
    if (err) {
      const data = {
        "status": 0,
        "msg": "Error while saving a job",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else if (result == "Already saved a job") {
      const data = {
        "status": 0,
        "msg": "Already saved a job",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully saved a job",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})

router.get("/:userID/joblist", async function (req, res, next) {
  console.log("Inside get joblist.")

  const data = {
    userId: req.params.userID
  }


  kafka.make_request('userJobList', data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Unable to fetch jobs",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully fetched jobs",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})

//////////////////////////////End - Devu code/////////////////////////////////

router.get("/:userId", async function (req, res, next) {

  const data = {
    userId: req.params.userId
  }

  kafka.make_request('getUserDetails', data, function (err, result) {

    if (err) {
      const data = {
        "status": 0,
        "msg": "Error in fetching result",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully fetched details",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})

router.put("/:userId", async function (req, res, next) {

  console.log("\nInside user profile updation");
  console.log("Request obtained is : ");
  console.log(JSON.stringify(req.body));

  const data = {
    userId: req.params.userId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    headline: req.body.headline,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipcode: req.body.zipcode,
    contact: req.body.contact,
    profile_summary: req.body.profile_summary,
    resume: req.body.resume,
    currentJobDetails: {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      start_workDate: req.body.start_workDate,
      end_workDate: req.body.end_workDate,
      description: req.body.description
    },
    education_data: req.body.education_data,
    experience_data: req.body.experience_data,
    skills_data: req.body.skills_data,
  }

  kafka.make_request('editUserDetails', data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Failed updating the details",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }else if(result.message){
      const data = {
        "status": 0,
        "msg": "Failed updating the details",
        "info": result.message
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }else {
      const data = {
        "status": 1,
        "msg": "Successfully updated the details",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})



///////////////////////////////////////////////////////////
// Had to be added

router.get("/:userId/savedJobs",async function(req,res,next){

  console.log("Getting saved jobs for the user: ",req.params.userId)

  const data = {
    userId:req.params.userId
  }

  kafka.make_request('userSavedJobs',data,function(err,result){
    if(err){
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs saved",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }else if(result.message){
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs saved",
        "info": result.message
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }else{
      const data = {
        "status": 1,
        "msg": "Successfully fetched the details of all the saved jobs",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})

router.get("/:userId/appliedJobs",async function(req,res,next){

  console.log("Request to get details of jobs applied by the user: ",req.params.userId)

  const data = {
    userId:req.params.userId
  }

  kafka.make_request('userAppliedJobs',data,function(err,result){
    if(err){
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs applied",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }else if(result.message){
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs applied",
        "info": result.message
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }else{
      const data = {
        "status": 1,
        "msg": "Successfully fetched the details of all the applied jobs",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})
module.exports = router;