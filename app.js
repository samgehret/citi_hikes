const express = require('express')
const app = express()

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send('helo world')
})

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
