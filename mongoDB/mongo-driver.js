import { MongoClient } from "mongodb";

const client =  new MongoClient("mongodb://localhost:27017")

// 1) first connect server
await client.connect();


// 2) create data base
const db  = client.db("mangodb_nodejs_db")

// 3) now create collection
const userCollection = db.collection("user")

// 4) now insert data
// userCollection.insertOne({name:"node js series",age:"26"})



// 5) if we want to insert many data then we have to use instertmany
// userCollection.insertMany([
//     {name:"REACT JS",role:"UI",age:"26"},
//     {name:"NODE JS",role:"back-end",age:"26"},
//     {name:"MANGOGB series",role:"database",age:"26"}
// ])

/// read method
