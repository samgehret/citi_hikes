const express = require('express')
const app = express()
const hbs = require('hbs')
var path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const hikesController = require('./controllers/hikes')
const Hike = require('./models/Hikes')

app.use(bodyParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  Hike.find({})
  .then(hikes => {
    res.render('hikes/list', {hikes})
  })
})

app.use(session({secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS'}))
app.use(flash())

app.use('/hikes', hikesController)

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
