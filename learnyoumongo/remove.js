const mongoClient = require('mongodb').MongoClient
const database = process.argv[2]
const collection = process.argv[3]
const _id = process.argv[4]

const url = `mongodb://localhost:27017/${database}`

mongoClient.connect(url, (err, client) => {
  if (err) throw err
  let db = client.db(database)

  db.collection(collection).deleteOne({_id}, (err, result) => {
    if (err) throw err
    console.log(result)
    client.close()
  })
})
