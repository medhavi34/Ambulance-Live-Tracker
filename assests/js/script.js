var keys = ['longitude', 'latitude'];


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
}

function showPosition(position) {
  document.getElementsByName(keys[0])[0].value = position.coords[keys[0]];
  document.getElementsByName(keys[1])[0].value = position.coords[keys[1]];
}


