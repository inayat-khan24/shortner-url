import { MongoClient } from "mongodb";

const client =  new MongoClient("mongodb://localhost:27017")

// 1) first connect server
await client.connect();


// 2) create data base
const db  = client.db("mangodb_nodejs_db")

// 3) now create collection
const userCollection = db.collection("user")

// 4) now insert data
// userCollection.insertOne({name:"web_devloper",age:"26"})



// 5) if we want to insert many data then we have to use instertmany
// userCollection.insertMany([
//     {name:"REACT JS",role:"UI",age:"26"},
//     {name:"NODE JS",role:"back-end",age:"26"},
//     {name:"MANGOGB series",role:"database",age:"26"}
// ])

///===========================================
//   Red method
//============================================


// const usersCursor = userCollection.find()
// console.log(usersCursor)

// // irrate data becoz that come in a cursor format

// for await(const user of usersCursor){
//     console.log(user)
// }


// now we convert obj in arry 

// const usersCursor = await userCollection.find().toArray()

// console.log(usersCursor)

// if we want to find only single data then use this method
// const user = await userCollection.findOne({name:"web_devloper"})
// console.log(user)
// // only if want to get id the use toHexString
// console.log(user._id.toHexString())

///===========================================
//   Update method
//============================================

// if we want to update data mean change value then use this method and which value we want to
// update that value give in {$set} set property
// await userCollection.updateOne({name:"MANGOGB series"},{$set:{age:"30"}})


///===========================================
//   DELETE method
//============================================

// 1) if we want to delete data.

// await userCollection.deleteOne({name:"node js series"})

//2)  if we want to delete all data then use this method

const result = await userCollection.deleteMany({role:"make web site"})
// if we want to check how many data deleted 
console.log(`${result.deletedCount} document deleted`)







