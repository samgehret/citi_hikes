const express = require('express')
const app = express()
const hbs = require('hbs')
var path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const config = require('./config/config')
const morgan = require('morgan')

const hikesController = require('./controllers/hikes')
const Hike = require('./models/Hikes')

app.use(morgan('combined'))

app.use(bodyParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
  Hike.find({})
  .then(hikes => {
    res.render('hikes/list', {hikes})
  })
})

app.use(session({secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS'}))
app.use(flash())
require('./controllers/router')(app)

app.use('/hikes', hikesController)

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})

require('./controllers/router')(app)

module.exports = app
