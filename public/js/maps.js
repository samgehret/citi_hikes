// var globalCoordinates = {
//   coordinates: 0
// }
$(document).ready(function () {
  $('select').material_select()
  var elevationSlider = document.getElementById('elevation-slider')
  var distanceSlider = document.getElementById('distance-slider')
  noUiSlider.create(elevationSlider, {
    start: [0, 6200],
    connect: true,
    step: 100,
    tooltips: true,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
      'min': 0,
      'max': 6200
    },
    format: wNumb({
      decimals: 0
    })
  })
  noUiSlider.create(distanceSlider, {
    start: [0, 6200],
    connect: true,
    step: 0.5,
    tooltips: true,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
      'min': 0,
      'max': 30
    },
    format: wNumb({
      decimals: 0
    })
  })

  var allTrails = []
  var index = 0
  var uID = ''

// const url ='https://pokeapi.co/api/v2/pokemon/7'
// fetch takes a url, and an object with a few optional parameters.
// Ex: {method: 'POST', headers: {'Content-Type': 'application/json'}}
// The default method of fetch is a GET request
// For now all we have to pass fetch is the url

  document.getElementById('filter-button').addEventListener('click', updateMap)

  function updateMap () {
    var layers = map.getStyle().layers
    var myLayers = layers.filter(layer => layer.metadata === 'custom')
    for (let layer of myLayers) {
      map.removeLayer(layer.id)
    }
  // var newArray = allTrails
    var filterDifficulty = $('#difficulty').val()
    var elevationGain = elevationSlider.noUiSlider.get()
    var hikeDistance = distanceSlider.noUiSlider.get()
    var filteredResults = allTrails.filter((trails) => {
      return filterDifficulty.includes(trails.difficulty) && trails.ascent < elevationGain[1] && trails.ascent > elevationGain[0] && trails.length < hikeDistance[1] && trails.length > hikeDistance[0]
    })
    printRoutes(filteredResults)
  }

// function doSomething (response) {
//   for (let trail of response.trails) {
//     var hikeCard = document.createElement('div')
//     hikeCard.className = 'hikecard'
//     var hikeTitle = document.createElement('p')
//     var hikeLink = document.createElement('a')
//     hikeLink.className = 'listlink'
//     hikeLink.href = `/hikes/${trail.id}`
//     hikeTitle.innerHTML = trail.name
//     hikeLink.appendChild(hikeCard)
//     hikeCard.appendChild(hikeTitle)
//     document.querySelector('.hikecontainer').appendChild(hikeLink)
//   }
//   // document.querySelector('.hiketitle').innerHTML = response.trails[0].name
// }

  mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2VocmV0IiwiYSI6ImNqZWExcDdwNTAxYnEyeG1tZnQ4MTNsODkifQ.68r_UjBeRkubf5eUs4uw-g'
  var map = new mapboxgl.Map({
    container: 'mapall',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-98.29, 41.90],
    zoom: 3
  })
  map.on('load', function () {
    // getRoute()
  })

  document.getElementById('searchlocation').addEventListener('click', () => {
    console.log('searching location')
    var input = document.getElementById('locationvalue')
    console.log(input.value)
    var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.value}.json?access_token=pk.eyJ1Ijoic2FtZ2VocmV0IiwiYSI6ImNqZWExcDdwNTAxYnEyeG1tZnQ4MTNsODkifQ.68r_UjBeRkubf5eUs4uw-g&country=us&types=postcode`
    fetch(url)
      .then((res) => {
        return res.json()
      }).then((res) => {
        console.log(res.features[0].geometry.coordinates)
        getRoute(res.features[0].geometry.coordinates)
      })
  })

  function getRoute (coordinates) {
    localStorage.setItem('globalCoordinates', coordinates)
    var layers = map.getStyle().layers
    var myLayers = layers.filter(layer => layer.metadata === 'custom')
    for (let layer of myLayers) {
      map.removeLayer(layer.id)
    }
    // var map = new mapboxgl.Map({
    //   container: 'mapall',
    //   style: 'mapbox://styles/mapbox/streets-v10',
    //   center: coordinates,
    //   zoom: 7
    // })
    map.flyTo({center: coordinates, zoom: 6})
    var long = coordinates[0]
    var lat = coordinates[1]
    var url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=150&maxResults=200&key=200230209-ca9b0a0f9bb083f7f5ee4ddc59a95de1`
    fetch(url)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log('getting trails')
      allTrails = res.trails
      // doSomething(res)
      console.log(allTrails)
      printRoutes(res.trails)
    })
    .catch((err) => {
      console.log('something went wrong...', err)
    })
  }

  function printRoutes (response) {
    for (let trail of response) {
      console.log('adding icons to map')
      map.loadImage('../img/hikingicon.png', function (error, image) {
        index++
        uID = trail.name + index

        if (error) throw error
        map.addImage(uID, image)
        map.addLayer({
          'id': uID,
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
            'icon-image': uID,
            'icon-size': 0.2,
            'icon-allow-overlap': true
          }
        })
        map.on('click', uID, function (e) {
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
      })
    }
  }
  // module.exports = globalCoordinates
})
