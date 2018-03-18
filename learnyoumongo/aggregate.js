const mongoClient = require('mongodb').MongoClient
const collection = 'prices'
const database = 'learnyoumongo'
const size = process.argv[2]

const url = `mongodb://localhost:27017/${database}`

mongoClient.connect(url, (err, client) => {
  if (err) throw err
  let db = client.db(database)

  let match = { $match: { size } }
  let group = {
    $group: {
      _id: 'average',
      average: { $avg: '$price' }
    }
  }

  db.collection(collection).aggregate([match, group]).toArray((err, results) => {
    if (err) throw err
    console.log(results[0].average.toFixed(2))
  })
  client.close()
})
