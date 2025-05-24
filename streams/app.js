import {createReadStream,createWriteStream} from "fs"
import path from "path"


const inputFilePath = path.join(import.meta.dirname,"input.txt")
const outFilePath = path.join(import.meta.dirname,"output.txt")


const readableStream = createReadStream(inputFilePath,{
encoding:"utf-8",
// How many chunks do we need to process? This belongs to heighwaterMark
highWaterMark:16

})

const writableStream = createWriteStream(outFilePath)

// for creating output file
readableStream.pipe(writableStream)

readableStream("error",(error)=>console.error("error",error))
writableStream("error",(error)=>console.error("error",error))
