const express = require('express')
const fs = require('fs')

const app = express()
const port = process.argv[2]
const file = process.argv[3]

app.get('/books', (req, res) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.log(err)
      return err
    }
    res.json(JSON.parse(data.toString()))
    res.end()
  })
})

app.listen(port)
