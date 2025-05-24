// import { readFile, writeFile } from "fs/promises"
// import path from "path"


// // path of JSON sile
// const DATA_file = path.join("data","links.json")

// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_file, "utf-8");
//          return JSON.parse(data)
//         } catch (error) {
//       if(error.code === "ENOENT"){
//             await writeFile(DATA_FILE,`${JSON.stringify({})}`)
//             return {}
//              }

//              throw error
//   }
// };

// export const saveLinks = async(links)=>{
// await writeFile(DATA_file,JSON.stringify(links))
// }

import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";

// 1) now we create data base 
const db = dbClient.db(env.MONGODB_DATABASE_NAME)

// 2) now we create collection
const shortenerCollection = db.collection('shorteners')

// 3 now we creat loadlinks
export const loadLinks = async()=>{
  // 4) now we get data from mongodb and we convert objet into arry with 
  // the help of toArray method
return shortenerCollection.find().toArray()
}
// 5) now saveLinks mean we add user data to mangodb
export const saveLinks = async(link)=>{
await shortenerCollection.insertOne(link)
}

// now we are checking that those param are coming is avalible or not.

export const getLinkByshortCode = async (shortCode)=>{
 return await shortenerCollection.findOne({shortCode:shortCode})
}



