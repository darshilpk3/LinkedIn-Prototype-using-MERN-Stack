var mongoose =require('mongoose');

var connections= mongoose.model('Connections',{
    req_by : {
        type : String
    },
    req_to:{
        type : String
    },
    status:{
        type: String
    }
})



module.exports = {connections};