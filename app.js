import express from "express"
import { link } from "fs"
import { readFile, writeFile } from "fs/promises"
import path from "path"




const app = express()
const PORT = 3003
// path of JSON sile
const DATA_file = path.join("data","links.json")

app.use(express.static("public"))

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_file, "utf-8");
         return JSON.parse(data)
        

         
           
  } catch (err) {
    console.error("Error reading file:", err);
  }
};






app.get("/",async(req,res)=>{
try {
   const file = path.join(import.meta.dirname,"public","index.html")
   const links = await loadLinks()
   const content = file.toString().replaceAll("{{shorten_urls}}","hello")
   
  await res.sendFile(file)
} catch (error) {
    
}

})



app.listen(PORT,()=>{

    console.log(`server is running at http://localhost:${PORT}`)
})

