var hikeID = document.querySelector('.title').innerHTML
console.log(hikeID)

var lat = ''
var long = ''

var url = `https://www.hikingproject.com/data/get-trails-by-id?ids=${hikeID}&key=200230209-ca9b0a0f9bb083f7f5ee4ddc59a95de1`
fetch(url)
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    populateHike(res)
  })
  .catch((err) => {
    console.log('something went wrong...', err)
  })

function populateHike (response) {
  document.querySelector('.title').innerHTML = response.trails[0].name
//   document.getElementById('summary').innerHTML = response.trails[0].summary
  document.querySelector('.length').innerHTML = response.trails[0].length
  document.querySelector('.difficulty').innerHTML = response.trails[0].difficulty
  document.querySelector('.status').innerHTML = response.trails[0].conditionStatus
  document.querySelector('.statusdetails').innerHTML = response.trails[0].conditionDetails
  document.querySelector('.ascent').innerHTML = response.trails[0].ascent
  lat = response.trails[0].latitude
  lat = response.trails[0].latitude
  lat = response.trails[0].latitude
  long = response.trails[0].longitude
  getRoute()
}

// map.on('load', function () {
//   getRoute()
// })

function getRoute () {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2VocmV0IiwiYSI6ImNqZWExcDdwNTAxYnEyeG1tZnQ4MTNsODkifQ.68r_UjBeRkubf5eUs4uw-g'
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [((-77.01 + long) / 2), ((38.89 + lat) / 2)],
    zoom: 7
  })
  var start = [-77.01, 38.89]
  var end = [long, lat]
  var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1Ijoic2FtZ2VocmV0IiwiYSI6ImNqZWExcDdwNTAxYnEyeG1tZnQ4MTNsODkifQ.68r_UjBeRkubf5eUs4uw-g'
  $.ajax({
    method: 'GET',
    url: directionsRequest
  }).done(function (data) {
    var route = data.routes[0].geometry
    console.log(data)
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      },
      paint: {
        'line-width': 2,
        'line-color': 'red'
      }
    })
    map.addLayer({
      id: 'start',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: start
          }
        }
      }
    })
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: end
          }
        }
      }
    })
    var distance = (data.routes[0].distance / 1609.344).toFixed(0)
    document.querySelector('.distance').innerHTML = distance
    console.log(distance)
            // this is where the code from the next step will go
  })
}
