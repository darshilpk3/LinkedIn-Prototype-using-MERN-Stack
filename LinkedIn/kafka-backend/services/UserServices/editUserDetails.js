var UserInfo = require('../../../backend/models/userInfo').users
var Application = require('../../../backend/models/application')
var Job = require('../../../backend/models/job')
var Message = require('../../../backend/models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for updating user details")
    console.log("\n\n User data is: ", msg)

    UserInfo.findByIdAndUpdate(msg.userId,
        {
          $set: {
            fname: msg.firstname,
            lname: msg.lastname,
            headline: msg.headline,
            address: msg.address,
            city: msg.city,
            state: msg.state,
            country: msg.country,
            zipcode: msg.zipcode,
            contact: msg.contact,
            profile_summary: msg.profile_summary,
            resume: msg.resume,
            job_current: msg.currentJobDetails
          },
          $push: {
            education: msg.education_data,
            experience: msg.experience_data,
            skills: msg.skills_data
          }
        },
        { upsert: true })
        .exec()
        .then(result => {
          callback(null,result)
        })
        .catch(err => {
          callback(err,err)
        })
}


exports.handle_request = handle_request;