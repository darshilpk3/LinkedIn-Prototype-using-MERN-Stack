var mongoose =require('mongoose');

var users= mongoose.model('users',{
    email : {
        type : String,
        required: true,
        unique:true
    },
    password : {
        type : String,
        required: true
    },
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    }
    
})

module.exports = {users};