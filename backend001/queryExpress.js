const express = require('express')

const port = process.argv[2]
const app = express()

app.get('/search', (req, res) => {
  res.end(JSON.stringify(req.query))
})

app.listen(port)
