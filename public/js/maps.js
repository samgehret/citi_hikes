
const url = 'https://www.hikingproject.com/data/get-trails?lat=38.89&lon=-77.15&maxDistance=150&key=200230209-ca9b0a0f9bb083f7f5ee4ddc59a95de1'
var trailResponse = ''
// const url ='https://pokeapi.co/api/v2/pokemon/7'
// fetch takes a url, and an object with a few optional parameters.
// Ex: {method: 'POST', headers: {'Content-Type': 'application/json'}}
// The default method of fetch is a GET request
// For now all we have to pass fetch is the url

function doSomething (response) {
  console.log(response.trails)
  for (let trail of response.trails) {
    console.log(trail.name)
    var hikeCard = document.createElement('div')
    hikeCard.className = 'hikecard'
    var hikeTitle = document.createElement('p')
    var hikeLink = document.createElement('a')
    hikeLink.href = `/hikes/${trail.id}`
    hikeTitle.innerHTML = trail.name
    hikeLink.appendChild(hikeCard)
    hikeCard.appendChild(hikeTitle)
    document.querySelector('.hikecontainer').appendChild(hikeLink)
  }
  // document.querySelector('.hiketitle').innerHTML = response.trails[0].name
}

fetch(url)
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    // console.log('success!', res)
    doSomething(res)
  })
  .catch((err) => {
    console.log('something went wrong...', err)
  })

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2VocmV0IiwiYSI6ImNqZWExcDdwNTAxYnEyeG1tZnQ4MTNsODkifQ.68r_UjBeRkubf5eUs4uw-g'
// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/streets-v10',
//   center: [-84.524, 39.118],
//   zoom: 12
// })
// map.on('load', function () {
//   getRoute()
// })

// function getRoute () {
//   var start = [-84.518641, 39.134270]
//   var end = [-84.512023, 39.102779]
//   var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?geometries=geojson&access_token=' + 'pk.eyJ1Ijoic2FtZ2VocmV0IiwiYSI6ImNqZWExcDdwNTAxYnEyeG1tZnQ4MTNsODkifQ.68r_UjBeRkubf5eUs4uw-g'
//   $.ajax({
//     method: 'GET',
//     url: directionsRequest
//   }).done(function (data) {
//     var route = data.routes[0].geometry
//     map.addLayer({
//       id: 'route',
//       type: 'line',
//       source: {
//         type: 'geojson',
//         data: {
//           type: 'Feature',
//           geometry: route
//         }
//       },
//       paint: {
//         'line-width': 2
//       }
//     })
//             // this is where the code from the next step will go
//   })
// }
