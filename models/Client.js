var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    name: String,
    baseUrl: String,
    doctors:Array
},{strict:false});

module.exports = mongoose.model('Client', clientSchema);