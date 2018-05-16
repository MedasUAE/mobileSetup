var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    name: String,
    baseUrl: String,
    doctors:Array,
    news:Array,
    departments:Array,
    pharmacies:Array,
    insurances:Array,
    aboutus:Array,
    facilities:Array,
    call:String,
    address:{type:mongoose.Schema.Types.Mixed},
    layout:{type:mongoose.Schema.Types.Mixed}
},{strict:false});

module.exports = mongoose.model('Client', clientSchema);