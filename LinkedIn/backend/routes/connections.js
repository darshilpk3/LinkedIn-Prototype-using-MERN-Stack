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
var Connection = require('../models/connections')


//New Connection
router.post("/request", function (req, res, next) {
    console.log("Making a new connection request")
    const data = {
        sentBy: req.body.sentBy,
        sentTo: req.body.sentTo
    }

    UserInfo.find({
        $and:[
            {_id:data.sentBy},
            {
                $or:[
                    {pending_sent: data.sentTo},
                    {pending_receive: data.sentTo},
                    {connections: data.sentTo}
                ]
            }
        ]
    }).exec()
        .then(result => {
            if(result && result.length==0){
                UserInfo.findByIdAndUpdate(data.sentTo,{
                    $push:{
                        pending_receive : data.sentBy
                    }
                }).exec()
                    .then(result => {
                        UserInfo.findByIdAndUpdate(data.sentBy,{
                            $push:{
                                pending_sent:data.sentTo
                            }
                        }).exec()
                            .then(result => {
                                res.send(200,"Request sent")
                            })
                    })
            }else{
                res.send(200,"Already connected someway")
            }
            
        })
        .catch(err => {
            res.send(200,JSON.stringify(err))
        })
})

router.put("/:userId/accept",async function(req,res,next){
    console.log("Accepting connections")
    const data = {
        userId : req.params.userId,
        connection:req.body.connection
    }

    UserInfo.find({
        _id:data.userId,
        pending_receive:data.connection
    }).exec()
        .then(result => {
            if(result && result.length!=0){
                UserInfo.findByIdAndUpdate(data.userId,{
                    $pull: {
                        pending_receive : data.connection
                    },
                    $push:{
                        connections:data.connection
                    }
                }).exec()
                    .then(result => {
                        UserInfo.findByIdAndUpdate(data.connection,{
                            $pull:{
                                pending_sent: data.userId
                            },
                            $push:{
                                connections: data.userId
                            }
                        }).exec()
                            .then(result=>{
                                res.send(200,"Connection Accepted")
                            })
                    })
            }else{
                res.send(200,"Server Error")
            }
        })
        .catch(err => {
            res.send(400,"Server Error")
        })
})

router.get("/:userId/getConnections",async function(req,res,next){
    console.log("Getting total connections")

    const data = {
        userId:req.params.userId
    }

    UserInfo.findById(data.userId,{'connections':1})
    .populate({
        path:'connections',
        select:'fname + lname + headline + connections'
    })
    .exec()
        .then(result => {
            res.writeHead(200,{
                'Content-Type':'application/json'
            })
            const data = {
                status : 1,
                msg:"Succesfully got all the connections",
                info:result
            }
            res.end(JSON.stringify(data))
        })
        .catch(err => {
            res.writeHead(200,{
                'Content-Type':'application/json'
            })
            const data = {
                status : 0,
                msg:"Getting of connections failed",
                info:err
            }
            res.end(JSON.stringify(data))
        })
})

module.exports = router;