var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for login request")

    // let email = msg.email;
    // let password = msg.password;
    // let type = msg.type;
    
    // userinfos.findOne({
    //     $and: [{ email: email }, { flag: type }]

    // }, async function (err, user) {
    //     if (err) {
    //         let res = "The email and password you entered did not match our records. Please double-check and try again.";
    //         console.log("Error in fecthing from database at kafka.")
    //         console.log(res);
    //         callback(err, "Error in fecthing from database at kafka.");

    //     } else if (user) {
    //         console.log(user.password)
    //         if (bcrypt.compareSync(password, user.password)) {
    //             console.log("Successfull login in kafka");
    //             let information = {
    //                 uid: user._id,
    //                 firstname: user.firstname,
    //                 lastname: user.lastname,
    //                 type: user.flag,
    //                 email: user.email,
    //                 profileImage: "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png",
    //                 images: user.image
    //             }
    //             data = {
    //                 status: 1,
    //                 msg: "Successful login",
    //                 info: information
    //             }
    //             // res.end(JSON.stringify(data));
    //             callback(null, data)

    //         } else {
    //             console.log("Invalid Credentials, Password incorrect!");
    //             data = {
    //                 status: -1,
    //                 msg: "Invalid credentials, password incorrect",
    //                 info: {}
    //             }
    //             callback(null, data)
    //         }
    //     }
    //     else {
    //         console.log("Invalid Credentials, User not found");
    //         data = {
    //             status: -1,
    //             msg: "Invalid credentials, user not found!",
    //             info: {}
    //         }
    //         callback(null, data)
    //     }
    // })


}


exports.handle_request = handle_request;