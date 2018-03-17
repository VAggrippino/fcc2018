const express = require('express')
const path = require('path')
const app = express()

let port = process.argv[2]
let folder = process.argv[3]

console.log(folder)

app.use(require('stylus').middleware(folder))
app.use(express.static(folder))

app.listen(port)
