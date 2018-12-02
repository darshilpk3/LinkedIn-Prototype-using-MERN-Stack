var UserInfo = require('../../../backend/models/userInfo').users
var Application = require('../../../backend/models/application')
var Job = require('../../../backend/models/job')
var Message = require('../../../backend/models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for editing details of job")
    console.log("\n\n User data is: ", msg)

    Job.findByIdAndUpdate(setJobId,
        {
            $set: {
                jobTitle: msg.job_title,
                description: msg.job_description,
                industry: msg.job_industry,
                employmentType: msg.employment_type,
                location: msg.job_location,
                jobFunction: msg.job_function,
                companyLogo: msg.company_logo
            }
        }
    )
        .exec()
        .then((result, err) => {
            if (err) {
                callback(err,err)
            } else {
                callback(null,result)
            }
        })
        .catch(err => {
            callback(err,err)
        })
    
}


exports.handle_request = handle_request;