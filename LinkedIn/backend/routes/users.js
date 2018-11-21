var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
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

router.get("/:userId", async function (req, res, next) {
  try {
    UserInfo.findById(req.params.userId)
      .populate('jobs_applied')
      .populate('jobs_posted')
      .populate('jobs_saved')
      .exec()
      .then(result => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        const data = {
          "status": 1,
          "msg": "Successfully fetched",
          "info": result
        }
        res.end(JSON.stringify(data))
      })
      .catch(err => {
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

})



router.put("/:userId", async function (req, res, next) {

  req.params.userId

  try {
    UserInfo.update({
      _id: req.body.userId
    }, {
        $push: {

          received_connections:[{
            request_by: req.params.userId,
            request_to: req.body.userId
          }],
        }
      }, async function (err, resp) {


        console.log(err);
        console.log(resp)
      })







    // .then(result => {
    //   res.writeHead(200, {
    //     'Content-Type': 'application/json'
    //   })
    //   const data = {
    //     "status": 1,
    //     "msg": "Successfully fetched",
    //     "info": result
    //   }
    //   res.end(JSON.stringify(data))
    // })
    // .catch(err => {
    //   res.writeHead(200, {
    //     'Content-Type': 'application/json'
    //   })
    //   const data = {
    //     "status": 0,
    //     "msg": "No Such User",
    //     "info": {
    //       "error": err
    //     }
    //   }
    //   res.end(JSON.stringify(data))
    // })
  } catch (error) {
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

})

module.exports = router;
