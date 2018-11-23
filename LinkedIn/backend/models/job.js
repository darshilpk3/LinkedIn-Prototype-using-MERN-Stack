var mongoose =require('mongoose');

var job= mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    jobTitle:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    industry:{
        type:String,
        required:true
    },
    employmentType:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobFunction:{
        type:String
    },
    companyLogo:{
        type:String
    },
    applicants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        }
    ],
    noOfViews:{
        type:Number
    },
    postedDate:{
        type:String,
        required:true
    },
    jobSaved:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        }
    ]
})

module.exports = mongoose.model('Job',job);