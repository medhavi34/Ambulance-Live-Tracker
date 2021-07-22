const mongoose = require('mongoose');

// function for current location 

var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        uniuqe: true
    },
    gender:{
        type:String,
        required:true
    },
    longitude:{
        type: String,
        default: '0° N',

    },
    latitude:{
        type: String,
        default: '0° E',
    },
    location:{
        type: String,
    },
    status:{
        type:String,
        default: 'Available'
    }
});

const driverDB = mongoose.model('driverdb', schema);

module.exports =driverDB;