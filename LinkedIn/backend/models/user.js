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
    flag :{
        type : Number
    },
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    about:{
        type : String
    },
    t_city:{
        type : String
    },
    t_country:{
        type : String
    },
    t_image:{
        type : String
    },
    t_phone_no:{
        type : String
    },
    t_company:{
        type : String
    },
    t_school:{
        type : String
    },
    t_hometown:{
        type : String
    },
    t_languages:{
        type : String
    },
    t_gender:{
        type : String
    },
    owner_property_info:{
        type : Array
    },
    traveler_booking_info:{
        type:Array
    },
    traveler_inbox:{
        type:Array
    },
    owner_inbox:{
        type:Array
    }
    
})

module.exports = {users};