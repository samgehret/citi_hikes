
const url = 'https://www.hikingproject.com/data/get-trails?lat=38.89&lon=-77.15&maxDistance=150&key=200230209-ca9b0a0f9bb083f7f5ee4ddc59a95de1'
var trailResponse = ''
// const url ='https://pokeapi.co/api/v2/pokemon/7'
// fetch takes a url, and an object with a few optional parameters.
// Ex: {method: 'POST', headers: {'Content-Type': 'application/json'}}
// The default method of fetch is a GET request
// For now all we have to pass fetch is the url

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
    map.addLayer({
      id: trail.name,
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [trail.longitude, trail.latitude]
          }
        }
      }
    })
              // this is where the code from the next step will go
  }
}
