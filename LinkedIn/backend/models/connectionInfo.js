var mongoose = require('mongoose');

var connectionInfo = mongoose.Schema({
    request_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    request_to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

})

module.exports = { connectionInfo };