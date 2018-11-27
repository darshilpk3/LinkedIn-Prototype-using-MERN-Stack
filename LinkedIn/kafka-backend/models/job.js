var mongoose =require('mongoose');
//var { mongoose } = require('../connections/mongo');

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

 /*job.pre('save', function(next) {
    // Remove all the assignment docs that reference the removed person.

    // this.model('Users').remove({ person: this._id }, next);
 
    console.log('-------------------------Removing doc!');
}); */
 
module.exports = mongoose.model('Job',job);