var mongoose = require('mongoose');

var connectionInfo = mongoose.Schema('connection', {
    request_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    request_to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type:boolean
    }

})

module.exports = { connectionInfo };