var mongoose =require('mongoose');

var experience_schema = require('./experienceInfo').experience
var education_scheme = require('./educationInfo').education

var users= mongoose.model('Users',{
    email : {
        type : String,
        required: true,
        unique:true
    },
    fname : {
        type : String,
        required: true
    },
    lname : {
        type : String,
        required: true     
    },
    type : {
        type : String,
        required: true
    },
    headline : {
        type : String
    },
    address : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    },
    zipcode : {
        type : String
    },
    contact : {
        type : String
    },
    job_current : {
        type : JSON
    },
    experience : [experience_schema],
    education : [education_scheme],
    skills : {
        type : Array
    },
    profile_summary : {
        type : String
    },
    resume : {
        type : String
    },
    jobs_applied : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    jobs_posted : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    jobs_saved : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    applications : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]  
})

// mongoose.model('Users',users);

module.exports = {users};