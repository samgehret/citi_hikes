
const url = 'https://www.hikingproject.com/data/get-trails?lat=38.89&lon=-77.15&maxDistance=150&maxResults=100&key=200230209-ca9b0a0f9bb083f7f5ee4ddc59a95de1'
var trailResponse = ''
// const url ='https://pokeapi.co/api/v2/pokemon/7'
// fetch takes a url, and an object with a few optional parameters.
// Ex: {method: 'POST', headers: {'Content-Type': 'application/json'}}
// The default method of fetch is a GET request
// For now all we have to pass fetch is the url

document.querySelector('.removelayer').addEventListener('click', removeMyLayers)

function removeMyLayers () {
  var layers = map.getStyle().layers
  var myLayers = layers.filter(layer => layer.metadata === 'custom')
  console.log(myLayers)
  for (let layer of myLayers) {
    map.removeLayer(layer.id)
  }
}

function doSomething (response) {
  for (let trail of response.trails) {
    // console.log(trail.name)
    var hikeCard = document.createElement('div')
    hikeCard.className = 'hikecard'
    var hikeTitle = document.createElement('p')
    var hikeLink = document.createElement('a')
    hikeLink.className = 'listlink'
    hikeLink.href = `/hikes/${trail.id}`
    hikeTitle.innerHTML = trail.name
    hikeLink.appendChild(hikeCard)
    hikeCard.appendChild(hikeTitle)
    document.querySelector('.hikecontainer').appendChild(hikeLink)
  }
  // document.querySelector('.hiketitle').innerHTML = response.trails[0].name
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2VocmV0IiwiYSI6ImNqZWExcDdwNTAxYnEyeG1tZnQ4MTNsODkifQ.68r_UjBeRkubf5eUs4uw-g'
var map = new mapboxgl.Map({
  container: 'mapall',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [-77.01, 38.89],
  zoom: 6
})
map.on('load', function () {
  getRoute()
})

function getRoute () {
  fetch(url)
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    // console.log('success!', res)
    doSomething(res)
    printRoutes(res)
  })
  .catch((err) => {
    console.log('something went wrong...', err)
  })
}

function printRoutes (response) {
  var allTrails = response.trails
  console.log(allTrails)
  for (let trail of allTrails) {
    map.loadImage('../img/hikingicon.png', function (error, image) {
      if (error) throw error
      map.addImage(trail.name, image)
      map.addLayer({
        'id': trail.name,
        'type': 'symbol',
        'metadata': 'custom',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [trail.longitude, trail.latitude]
              }
            }]
          }
        },
        'layout': {
          'icon-image': trail.name,
          'icon-size': 0.2,
          'icon-allow-overlap': true
        }
      })
    })
    map.on('click', trail.name, function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var description = e.features[0].properties.description

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<p>${trail.name}</p><p>Hike Length: ${trail.length} miles</p><p>Ascent: ${trail.ascent} ft</p><p><a href = '/hikes/${trail.id}'>Detailed Information</a></p>`)
          .addTo(map)
    })

              // this is where the code from the next step will go
  }
}
