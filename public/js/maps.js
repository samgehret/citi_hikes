
function initMap () {
  var directionsService = new google.maps.DirectionsService()
  var directionsDisplay = new google.maps.DirectionsRenderer()
  var mapOptions = {
    center: new google.maps.LatLng(38.9014847, -77.0391641)
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions)
  directionsDisplay.setMap(map)
  var selectedMode = 'DRIVING'
  var request = {
    origin: 'Washington, DC',
    destination: document.getElementById('title').innerHTML,
    travelMode: google.maps.TravelMode[selectedMode]
  }
  directionsService.route(request, function (response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response)
    }
  })
}
