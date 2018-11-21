var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users
 

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
                "msg": "User already exists",
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

router.get("/:userId", async function(req,res,next){
  try {
  UserInfo.findById(req.params.userId)
  .populate('jobs_applied')
  .populate('jobs_posted')
  .populate('jobs_saved')
  .exec()
    .then(result => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":1,
        "msg":"Successfully fetched",
        "info": result
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":0,
        "msg":"No Such User",
        "info": {
          "error":err
        } 
      }
      res.end(JSON.stringify(data))
    })
  } catch (error) {
    res.writeHead(400,{
      'Content-Type':'application/json'
    })
    const data = {
      "status":0,
        "msg":error,
        "info": {
          "error":error
        }
    }        
    res.end(JSON.stringify(data))
  }
})

router.delete("/:userID", async function(req,res,next){
  console.log('\n\nIn user Delete');
  console.log("Request Got: ", req.body);
  const email = req.body.email;
  const userID = req.params.userID;

  pool.getConnection((
    err, connection) => {
    if (connection) {
      console.log("Connection obtained")
      const sql = "DELETE FROM userinfo WHERE email="+mysql.escape(email);
      console.log("\nSQL QUERY: " + sql);
      connection.query(sql,
        (err, result) => {
          if (result) {
            console.log("Successfully deleted from MySQL");
            //mongo query here
            try {
              UserInfo.deleteOne( { "_id" : userID } )
              .exec()
                .then(result => {
                  console.log("\nSuccessfully deleted from MongoDB");
            
                  res.writeHead(200,{
                    'Content-Type':'application/json'
                  })
                  const data = {
                    "status":1,
                    "msg":"Successfully deleted",
                    "info": result
                  }
                  res.end(JSON.stringify(data))
                })
                .catch(err => {
                  console.log("\nNo Such User");
                  res.writeHead(200,{
                    'Content-Type':'application/json'
                  })
                  const data = {
                    "status":0,
                    "msg":"No Such User",
                    "info": {
                      "error":err
                    } 
                  }
                  res.end(JSON.stringify(data))
                })
              } catch (error) {
                console.log("\nError in query.");
                
                res.writeHead(400,{
                  'Content-Type':'application/json'
                })
                const data = {
                  "status":0,
                    "msg":error,
                    "info": {
                      "error":error
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

router.post("/:userID/apply", async function(req,res,next){
  console.log("Inside post apply of job.")
  const jobId = req.body.job_id
  try {
  UserInfo.findByIdAndUpdate(req.params.userID,{
    $push:{
      jobs_applied:jobId
    }    
  })
  .exec()
    .then(result => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":1,
        "msg":"Successfully applied to the job",
        "info": result
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":0,
        "msg":"No Such User",
        "info": {
          "error":err
        } 
      }
      res.end(JSON.stringify(data))
    })
  } catch (error) {
    res.writeHead(400,{
      'Content-Type':'application/json'
    })
    const data = {
      "status":0,
        "msg":error,
        "info": {
          "error":error
        }
    }        
    res.end(JSON.stringify(data))
  }
})

router.post("/:userID/save", async function(req,res,next){
  console.log("Inside post of job save.")
  const jobId = req.body.job_id
  const userID = req.params.userID
  try {
  UserInfo.findByIdAndUpdate(userID,{
    $push:{
      jobs_saved:jobId
    }    
  })
  .exec()
    .then(result => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":1,
        "msg":"Successfully saved the job",
        "info": result
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":0,
        "msg":"No Such User",
        "info": {
          "error":err
        } 
      }
      res.end(JSON.stringify(data))
    })
  } catch (error) {
    res.writeHead(400,{
      'Content-Type':'application/json'
    })
    const data = {
      "status":0,
        "msg":error,
        "info": {
          "error":error
        }
    }        
    res.end(JSON.stringify(data))
  }
})

///////////////////////////YET TO CHECK/////////////////////////////
router.get("/:userID/joblist", async function(req,res,next){
  console.log("Inside get joblist.") 
  const userID = req.params.userID

  try {
  UserInfo.findById(userID)
  .populate('jobs_posted')
  .exec()
    .then(result => {
      console.log("The received result is : ", result);
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":1,
        "msg":"Successfully saved the job",
        "info": result
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":0,
        "msg":"No Such User",
        "info": {
          "error":err
        } 
      }
      res.end(JSON.stringify(data))
    })
  } catch (error) {
    res.writeHead(400,{
      'Content-Type':'application/json'
    })
    const data = {
      "status":0,
        "msg":error,
        "info": {
          "error":error
        }
    }        
    res.end(JSON.stringify(data))
  }
})

router.get("/:jobID", async function(req,res,next){
  console.log("Inside get joblist.") 
  const jobID = req.params.jobID

  try {
  UserInfo.findById(jobID,
    {jobs_posted: 1}
  )
   
  .exec()
    .then(result => {
      console.log("The received result is : ", result);
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":1,
        "msg":"Successfully saved the job",
        "info": result
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200,{
        'Content-Type':'application/json'
      })
      const data = {
        "status":0,
        "msg":"No Such User",
        "info": {
          "error":err
        } 
      }
      res.end(JSON.stringify(data))
    })
  } catch (error) {
    res.writeHead(400,{
      'Content-Type':'application/json'
    })
    const data = {
      "status":0,
        "msg":error,
        "info": {
          "error":error
        }
    }        
    res.end(JSON.stringify(data))
  }
})

module.exports = router;
