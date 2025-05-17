import express from "express"
import { readFile, writeFile } from "fs/promises"
import path from "path"




const app = express()
const PORT = 3003



app.get("/",(req,res)=>{
try {
    const file = path.join(import.meta.dirname,"public","index.html")
    console.log(file)
    res.sendFile(file)

} catch (error) {
    
}

})



app.listen(PORT,()=>{

    console.log(`server is running at ${PORT}`)
})