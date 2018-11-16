var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
var bcrypt = require('bcryptjs')
/* GET users listing. */
router.post('/', async function (req, res, next) {


  console.log('\n\nIn user signup');
  console.log("Request Got: ",req.body)
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
          (err,result) => {
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
              res.end(JSON.stringify(data))
            } else if (err) {
              console.log("User already exists ",err.sqlMessage)
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
              res.end(JSON.stringify(data))
            }
          })
      } else {
        console.log("Connection Refused ",err)
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Connection Refused")
      }

    })
});

module.exports = router;
