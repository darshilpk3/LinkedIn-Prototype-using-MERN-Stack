var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:admin123@ds153123.mlab.com:53123/linkedin');

module.exports = {mongoose};