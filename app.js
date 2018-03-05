const express = require('express')
const app = express()
const hbs = require('hbs')
var path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hikesController = require('./controllers/hikes')
const Hike = require('./models/Hikes')

app.use(bodyParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/hikes', hikesController)

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
