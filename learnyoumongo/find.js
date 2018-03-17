const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, (err, client) => {
  if (err) {
    console.log(err)
    return err
  }

  let db = client.db('learnyoumongo')

  db.collection('parrots').find({
    age: {
      $gt: parseInt(process.argv[2])
    }
  }).toArray((err, documents) => {
    if (err) {
      console.log(err)
      return err
    }
    console.log(documents)
  })
  client.close()
})
