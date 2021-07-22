//FOR DRIVER 
var longitude = document.getElementById("long");
var latitude = document.getElementById("lat");
var availability = document.getElementsByClassName("is_available")[0]; //("available");
var booked = getStoredValue('myBooking');

var x= 0, y= 0,X,Y;
if (booked == null) booked = 'Available';

// Functions

function notAvail(){
    booked = "Not available";
    storeValue('myBooking', booked);
    availability.innerHTML =  booked;
    document.getElementById('status').value = booked;
    updateStatus(booked);
}

function avail(){
    booked = "Available";
    storeValue('myBooking', booked);
    availability.innerHTML =  booked;
    document.getElementById('status').value = booked;
    updateStatus(booked);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }

    setTimeout(getLocation, 5000);
}

function showPosition(position) {
    if (Math.abs(x-position.coords.latitude)>0.0001 || Math.abs(y - position.coords.longitude)>0.0001)  {
        x = position.coords.latitude,y = position.coords.longitude;

        x = Math.round(x*10000)/10000;
        y = Math.round(y*10000)/10000;
    
        if (x < 0) X = Math.abs(x) + '° S';
        else if (x =>0) X = Math.abs(x)  + '° N';
    
        if (y < 0) Y = Math.abs(y) + '° W';
        else Y = y + '° E';

        latitude.innerHTML = X;
        longitude.innerHTML = Y;

        updateLocation(X,Y)

    }
    
};

getLocation();

function storeValue(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        $.cookies.set(key, value);
    }
}

function getStoredValue(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    } else {
        return $.cookies.get('Available');
    }
}


function updateLocation(long, lat){
    var data = {
        id: document.getElementsByName('id')[0].value,
        longitude: long,
        latitude: lat,
        status:booked
    };


    putData(data);
}


function updateStatus(booked){
    var data = {
        id: document.getElementsByName('id')[0].value,
        status:booked
    };

    putData(data);
}

function putData(data){
    var request = {
        "url":`http://localhost:3000/send-loc/api/drivers/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        console.log("Data Updated Successfully")
    })
}