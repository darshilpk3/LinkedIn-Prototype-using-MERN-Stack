var mongoose = require('mongoose');

var userinfos = mongoose.model('userinfos', {
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    country: {
        type: String
    },
    company: {
        type: String
    },
    school: {
        type: String
    },
    hometown: {
        type: String
    },
    languages: {
        type: String
    },
    gender: {
        type: String
    },
    city: {
        type: String
    },
    image: {
        type: String
    },
    phoneno: {
        type: String
    },
    flag: {
        type: String,
        required: true
    },
    propertyList:{
        type: Array
    },
    pastPropertyList:{
        type: Array
    },
    conversation:{
        type: Array
    }
    



});

module.exports = { userinfos };