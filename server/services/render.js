const axios = require('axios');
const { db } = require('../model/model');


exports.clientRoutes = (req, res) =>{
    // Make a get request to the API drivers
    axios.get('http://localhost:3000/send-loc/api/drivers')
    .then(function(response){
        res.render('index',{drivers:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}


exports.driverRoutes = (req, res) =>{
    res.render('driver_index');
}


exports.bookingRoutes = (req, res) =>{
    res.render('send_bookings');
}

exports.locationRoutes = (req, res) =>{
    axios.get('http://localhost:3000/send-loc/api/drivers')
    .then(function(response){
        var id_latest = response.data[response.data.length -1]._id;

        axios.get('http://localhost:3000/send-loc/api/drivers',{params:{id:id_latest}})
        .then(function(driverdata){
            res.render("send_loc",{driver:driverdata.data})
        })
        .catch(err=>{
            res.send(err);
        })
    })
    .catch(err=>{
        res.send(err);
    })
}

