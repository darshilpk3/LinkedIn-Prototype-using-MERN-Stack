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
    required_skills:[{
        type:String
    }],
    companyLogo:{
        type:String
    },
    companyName:{
        type:String
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ],
    noOfViews_applied:{
        type:Number
    },
    noOfViews_submitted:{
        type:Number
    },
    noOfViews:{
        type:Number
    },
    applyMethod:{
        type:String
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
    ],
    jobApplied:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        }
    ]
})

job.index({'postedBy':1,'jobTitle':1,'description':1,'industry':1,'employmentType':1,'location':1},{unique:true})
module.exports = mongoose.model('Job',job);