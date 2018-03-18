// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.param('date', (req, res, next, date) => {
  if (date) {
    console.log(date)
    let unixtime = date.match(/^\d+$/)
    let natural = date.match(/^(\w+) (\d\d?), (\d{4})$/)
    let year, month, day, dateObj
    
    let d
    if (unixtime) {
      d = new Date(+date * 1000)
      year = d.getFullYear()
      month = months[d.getMonth()]
      day = d.getDate()

      dateObj = {
        "unix": d.getTime() / 1000,
        "natural": `${month} ${day}, ${year}`
      }
    } else if (natural) {
      d = new Date(natural[3], months.indexOf(natural[1]), natural[2])
      year = d.getFullYear()
      month = months[d.getMonth()]
      day = d.getDate()

      dateObj = {
        "unix": d.getTime() / 1000,
        "natural": `${month} ${day}, ${year}`
      }
    } else {
      dateObj = { "unix": null, "natural": null }
    }
    

    req.date = JSON.stringify(dateObj)

    next()
  }
})
  
app.get('/:date', (req, res) => {
  res.send(req.date)
})

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

app.get("/dreams", (request, response) => {
  response.send(dreams)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
