var UserInfo = require('../../models/userInfo') //.users
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {
    const connections = []
    console.log("\n\nInside kafka backend for editing details of job")
    console.log("\n\n User data is: ", msg)
    // console.log("\n\n User data is: ", msg.setJobId)
    const username = "^" + msg.username;
    UserInfo.find({
        $or: [{ fname: { $regex: username, $options: 'i' } }, { lname: { $regex: username, $options: 'i' } }]
    })
        .then(result => {
            result.forEach((user) => {
                console.log("User is: ", user._id, " and connections are : ", user.connections)
                if (user.connections.indexOf(msg.userId) != -1) {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        isConnected: "true"
                    }
                    connections.push(connectionInfo)
                } else if (user.pending_receive.indexOf(msg.userId) != -1) {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        isConnected: "Accept"
                    }
                    connections.push(connectionInfo)
                } else if (user.pending_sent.indexOf(msg.userId) != -1) {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        isConnected: "pending"
                    }
                    connections.push(connectionInfo)
                } else {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        isConnected: "false"
                    }
                    connections.push(connectionInfo)
                }
            })
            //   const data = {
            //     "status": "1",
            //     "msg": "Successfully Searched",
            //     "info": connections
            //   }
            //   res.writeHead(200, {
            //     'Content-Type': 'application/json'
            //   })
            //   res.end(JSON.stringify(data))
            console.log("__________________result_______________", connections);
            callback(null, connections)
        })
        .catch(err => {
            // res.send(400, err)
            //   res.writeHead(400, {
            //     'Content-Type': 'application/json'
            //   })
            //   const data = {
            //     "status": 0,
            //     "msg": "Backend Error",
            //     "info": {
            //       "error": err
            //     }
            //   }
            //   res.end(JSON.stringify(data))
            console.log("_____________err__________________", err)
            callback(err, err)
        })



    // Job.findByIdAndUpdate(msg.setJobId,
    //     {
    //         $set: {
    //             jobTitle: msg.job_title,
    //             description: msg.job_description,
    //             industry: msg.job_industry,
    //             employmentType: msg.employment_type,
    //             location: msg.job_location,
    //             jobFunction: msg.job_function,
    //             companyLogo: msg.company_logo
    //         }
    //     }
    // )
    //     .exec()
    //     .then((result, err) => {
    //         if (err) {
    //             console.log("__________err_________________",err)

    //             callback(err,err)
    //         } else {
    //             console.log("__________result_________________",result)
    //             callback(null,result)
    //         }
    //     })
    //     .catch(err => {
    //         console.log("__________err_________________",err)

    //         callback(err,err)
    //     })

}


exports.handle_request = handle_request;