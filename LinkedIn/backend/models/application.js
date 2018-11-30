var mongoose =require('mongoose');

var application= mongoose.Schema({
    applicant : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    job:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    howDidYouHear:{
        type:String
    },
    isDisabled : {
        type:Boolean
    },
    Ethnicity:{
        type:String
    }
})

module.exports = mongoose.Schema('Application',application)


module.exports = {connections};