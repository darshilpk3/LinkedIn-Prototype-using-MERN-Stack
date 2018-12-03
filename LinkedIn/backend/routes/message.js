var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
var mongoose = require('mongoose');
var kafka = require('../kafka/client')

var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users
var Job = require('../models/job')
var Message = require('../models/message')


//New Conversation
router.post("/", async function (req, res, next) {


    const data = {
        members: [req.body.member1, req.body.member2],
        sentBy: req.body.sentBy,
        body: req.body.body
    }
    console.log(data.members)



    UserInfo.findById(data.sentBy, { '_id': 0, 'fname': 1, 'lname': 1 })
        .exec()
        .then(userName => {
            const messageContent = {
                sentBy: userName.fname + " " + userName.lname,
                body: data.body
            }
            Message.findOne({
                members: { $all: data.members }
            }).exec()
                .then(result => {
                    // console.log(result)
                    if (result && result.length != 0) {
                        Message.findByIdAndUpdate(result._id, {
                            $push: {
                                messages: messageContent
                            }
                        }).exec()
                            .then(result => {
                                res.writeHead(200,{
                                    'Content-Type':'application/json'
                                })
                                res.end(JSON.stringify(result))
                            })
                    } else {
                        var message = new Message({
                            members: data.members,
                            messages: messageContent
                        })

                        message.save()
                            .then(result => {
                                res.writeHead(200,{
                                    'Content-Type':'application/json'
                                })
                                res.end("Conversation Started: "+JSON.stringify(result))
                            })
                            .catch(err => {
                                res.send(200, "error starting conversation")
                            })
                    }
                })
                .catch(err => {
                    res.send(400, JSON.stringify(err))
                })

        })
        .catch(err => {
            console.log("Server Error")
        })

})


//Existing
router.put("/:messageId", async function (req, res, next) {

    console.log("updating messages of: ", req.params.messageId)
    const data = {
        messageId: req.params.messageId,
        sentBy: req.body.sentBy,
        body: req.body.body
    }

    const messageContent = {
        sentBy: data.sentBy,
        body: data.body
    }

    Message.findByIdAndUpdate(data.messageId, {
        $push: {
            messages: messageContent
        }
    }).exec()
        .then(result => {
            res.send(200, "messaged")
        })
        .catch(err => {
            res.send(400, err)
        })
})

router.get("/:userId", async function (req, res, next) {
    console.log("Getting messages of user: ", req.params.userId)

    const data = {
        userId: req.params.userId
    }

    Message.find({
        members: data.userId
    })
        .populate({
            path: 'members',
            select: 'fname + lname'
        })
        .exec()
        .then(result => {
            console.log(result)
            res.writeHead(200, {
                'content-type': 'application/json'
            })
            res.end(JSON.stringify(result))
        })
        .catch(err => {
            res.send(400, JSON.stringify(err))
        })
})

module.exports = router;