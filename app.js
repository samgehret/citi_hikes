const express = require('express')
const app = express()
const hbs = require('hbs')
const hikesController = require('./controllers/hikes')
const Hike = require('./models/Hikes')


app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send('helo world')
})

console.log('this is in app.js')

app.use('/hikes', hikesController)

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
